/**
 * 参考1：[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节] https://juejin.cn/post/6945319439772434469
 * 参考2：[V8 Promise源码全面解读，其实你对Promise一无所知] https://juejin.cn/post/7055202073511460895
 * 参考3：[promise.then 中 return Promise.resolve 后，发生了什么？] https://www.zhihu.com/question/453677175
 * 参考4：https://github.com/T-Roc/my-promise/blob/main/my-promise.js
 * queueMicrotask: 接受一个函数，将其加入微任务队列。来自谷歌的提案，现以成为标准(2018)
 * queueMicrotask(fn) 等价于代码 Promise.resolve().then(fn)
 */

const PENDING = 'pending';      // 待定
const FULFILLED = 'fulfilled';  // 成功
const REJECTED = 'rejected';    // 失败

class MyPromise {
  status = PENDING;   // 初始状态
  value = null;       // 成功的返回值
  resolveQueue = [];  // 成功后的回调函数队列
  reason = null;      // 失败的原因
  rejectQueue = [];   // 失败后的回调函数队列

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 使用箭头函数，避免用户调用时，this丢失。
  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;     // 保存结果值
    this.resolveQueue.forEach(fn => fn()) // 清空队列
  }

  // 同上面的resolve，改变自身状态并清空队列。
  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;     // 保存失败原因
    this.rejectQueue.forEach(fn => fn()) // 清空队列
  }

  // Promise链式调用的核心
  then(onFulfilled, onRejected) {
    // 入参的必须都是函数，如果不是就造个函数
    const realOnFulfilled = (typeof onFulfilled === 'function')
      ? onFulfilled : value => value;
    const realOnRejected = (typeof onRejected === 'function')
      ? onRejected : reason => {throw  reason };

    // ★then每次都会返回一个新的Promise对象
    const newPromise = new MyPromise((resolve, reject) => {
      // ★返回一个函数，该函数作用是将不同的任务推入微任务队列，其根据state，执行不同回调函数
      const createFnPushTaskToMicrotask = (state) => () => {
        queueMicrotask(() => {
          try {
            const x = (state === FULFILLED)
              ? realOnFulfilled(this.value)
              : realOnRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject); // 对于x是非thenable，可以直接调用resolve(x)
          } catch (error) {
            reject(error)
          }
        })
      }
      // 如果当前promise“pending"则创建一个函数，用于把任务加入微任务队列。将该函数加入回调队列中
      // 否则如果状态以改变，跳过加入回调队列的步骤，直接创建任务，将其推入微任务队列。
      if (this.status === PENDING) {
        this.resolveQueue.push(createFnPushTaskToMicrotask(FULFILLED));
        this.rejectQueue.push(createFnPushTaskToMicrotask(REJECTED));
      } else {
        createFnPushTaskToMicrotask(this.status)()
      }
    })

    return newPromise;
  }

  // then的简易调用
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // finally的回调不接受任何参数，自身会返回原来的 Promise 对象值
  finally(fn) {
    return this.then(
      (value) => MyPromise.resolve(fn()).then(() => value),
      (error) => MyPromise.resolve(fn()).then(() => {throw error}),
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value; // 传入Promise则直接返回
    return new MyPromise(res => res(value))
  }

  static reject(reason) {
    return new MyPromise((res, rej) => rej(reason))
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // https://github.com/T-Roc/my-promise/blob/3ebd422d5080698bc7b2539607f932be75ea08a8/my-promise.js#L233
  // 避免 promise === x 而造成死循环
  if (promise === x) {
    return reject(
      new TypeError('The promise and the return value are the same'));
  }
  // 非对象类型且非函数类型 直接调用resolve()改变 promise 状态
  if (!(x !== null && typeof x === 'object') && !(typeof x === 'function')) {
    return resolve(x);
  }
  // thenable的处理  浏览器中对于返回promise，会额外产生一次微任务
  let then;
  try {
    // 把 x.then 赋值给 then
    then = x.then;
  } catch (error) {
    // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise (不加会32个case失败)
    return reject(error);
  }

  // 如果 then 是函数
  if (typeof then === 'function') {
    let called = false;
    try {
      then.call(
        x, // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y) ?
        y => {
          // 如果 resolvePromise 和 rejectPromise 均被调用，
          // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
          // 实现这条需要前面加一个变量called
          if (called) return;
          called = true;
          resolvePromise(promise, y, resolve, reject);
        },
        // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
        r => {
          if (called) return;
          called = true;
          reject(r);
        });
    } catch (error) {
      if (called) return;   // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
      reject(error);    // 否则以 e 为据因拒绝 promise
    }
  } else {
    resolve(x);  // 如果 then 不是函数，以 x 为参数执行 promise
  }

}

// then注册回调，count为length时resolve() ,err直接reject
MyPromise.all = function all(promises) {
  return new Promise((resolve, reject) => {
    let result = [], count = 0;
    if(promises.length===0) return resolve(result)
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        result[index] = res
        if (++count === promises.length)
          resolve(result) // 都完成了才resolve！
      }, err => reject(err))
    })
  })
}
// 都注册回调，count为length时resolve()
MyPromise.allSettled = function allSettled(promises) {
  return new Promise((resolve) => {
    let result = [/* {status: ,value: } */], count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then((res) => {
        result[index] = {status: 'fulfilled', value: res}
        ++count === promises.length && resolve(result)
      }, (reason) => {
        result[index] = {status: 'rejected', reason}
        ++count === promises.length && resolve(result)
      })
    })
  })
}
// 状态改变后就resolve()
MyPromise.race = function race(promises) {
  return new Promise(((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(res => resolve(res), err => reject(err))
    })
  }))
}
// 状态变为 fulfilled 时resolve(),都是失败了就reject一个异常
MyPromise.any = function(promises) {
  let count = 0;
  return new Promise(((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(res => resolve(res), err => {
        if (++count === promises.length)
          reject(new Error('All promises were rejected'))
      })
    })
  }))
}

// ==Promise串行执行==
/**
 *
 * @param {Array} argArr  promiseCreator需要的参数数组
 * @param {(...args)=>Promise} promiseCreator Promise一旦被创建就开始执行，所以要一个创建Promise的函数
 */
MyPromise.serial = function(argArr, promiseCreator) {
  argArr.reduce((prev, arg) => {
    // 创建每个promise，当then传入的回调所返回的Promise FULFILLED时，下一个promise的回调才执行
    return prev.then(() => promiseCreator(arg))
  }, Promise.resolve())
}

MyPromise.serial1 = async function(argArr, promiseCreator) {
  for (const arg of argArr) {
    await promiseCreator(arg)
  }
}

// ==TEST== https://juejin.cn/post/6844903801296519182
MyPromise.serial([2, 3, 4], function createPromise(time) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      console.log('execute after delay:', time)
      resolve()
    }, time * 1000)
  }))
})

// 用于 Promise A+ 测试
MyPromise.deferred = function() {
  const result = {};
  result.promise = new MyPromise(function(resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

module.exports = MyPromise;

/*
let mp1 = new MyPromise((res, rej) => res('mp1!'))
let mp12 = mp1.then(console.warn)
console.log('mp1 start [sync]')
*/
