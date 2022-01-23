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

  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;     // 保存失败原因
    this.rejectQueue.forEach(fn => fn()) // 清空队列
  }

  // Promise链式调用的核心
  then(onFulfilled, onRejected) {
    const realOnFulfilled = (typeof onFulfilled === 'function')
      ? onFulfilled : value => value;
    const realOnRejected = (typeof onRejected === 'function')
      ? onRejected : (reason => {
        throw  reason
      }); // ↑ 入参的必须都是函数，如果不是就造个函数
    // then每次都会返回一个新的Promise对象
    const newPromise = new MyPromise((resolve, reject) => {
      // 返回一个函数，该函数作用是将不同的任务推入微任务队列，根据state，执行不同回调函数
      const createFnPushTaskToMicrotask = (state) => () => {
        queueMicrotask(() => {
          try {
            const x = (state === FULFILLED)
              ? realOnFulfilled(this.value)
              : realOnRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === PENDING) {
        this.resolveQueue.push(createFnPushTaskToMicrotask(FULFILLED));
        this.rejectQueue.push(createFnPushTaskToMicrotask(REJECTED));
      } else {
        // 当前Promise(then的this)状态已经改变则直接执行，将对应的回调函数推入微任务队列
        createFnPushTaskToMicrotask(this.status)()
      }
    })
    return newPromise;
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
  }
  // finally的回调不接受任何参数，自身会返回原来的 Promise 对象值
  finally(fn) {
    return this.then(
      (value) => MyPromise.resolve(fn()).then(() => value),
      (error) => MyPromise.resolve(fn()).then(() => {throw error })
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

MyPromise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let result = [], count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        result[index] = res
        if (++count === promises.length)
          resolve(result) // 都完成了才resolve！
      }, err => reject(err))
    })
  })
}
MyPromise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
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

MyPromise.race = function (promises) {
  return new Promise(((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(res => resolve(res), err => reject(err))
    })
  }))
}

MyPromise.any = function (promises) {
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

// https://github.com/T-Roc/my-promise/blob/3ebd422d5080698bc7b2539607f932be75ea08a8/my-promise.js#L233
function resolvePromise(promise, x, resolve, reject) {
  // 避免 promise === x 而造成死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }
  // 非对象类型且非函数类型 直接调用resolve()改变 promise 状态
  if (!(x !== null && typeof x === 'object') && !(typeof x === 'function')) {
    resolve(x);
  } else {
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
      // 将 x 作为函数的作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      // 名字重名了，我直接用匿名函数了
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
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
}

MyPromise.deferred = function () {
  const result = {};
  result.promise = new MyPromise(function (resolve, reject) {
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
