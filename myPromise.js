/**
 * 参考1：https://juejin.cn/post/6844903665686282253
 * 参考2：https://q.shanyue.tech/fe/js/23.html
 * 参考3：https://juejin.cn/post/6940531182706622500
 */
class MyPromise {

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    else return new MyPromise(res => res(value))
  }

  static reject(reason) {
    if (reason instanceof MyPromise) return reason;
    return new MyPromise((res, rej) => rej(reason))
  }

  /**
   * 使用Promise需要接收一个执行器函数作为参数
   * 这个函数又包含两个参数（resolve和reject）
   */
  constructor(executor) {
    /**
     * Promise内部有三种状态,由Pending转换后状态不再改变
     * Pending (待定)
     * Fulfilled (成功)
     * Rejected (失败)
     */
    this.status = 'Pending';
    // 成功的结果
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    /**
     * 维护then方法传入的回调函数的队列(要考虑可能这个回调函数没做完)
     * 然后_resolve/_reject函数异步调用队列里的回调函数
     */
    this.resolveQueue = [];
    this.rejectQueue = [];

    /**
     * 用户调用，传进一个值。并更改当前Promise的状态
     */
    const _resolve = (v) => {
      if (this.status !== 'Pending') return;
      console.log("in _resolve: " + v);
      setTimeout(() => {
        this.status = 'Fulfilled';
        this.value = v;
        this.resolveQueue.forEach(cb => cb(this.value));
      }, 0);
    }

    const _reject = (e) => {
      if (!this.status === 'Pending') return;
      setTimeout(() => {
        this.status = 'Rejected';
        this.reason = e;
        this.rejectQueue.forEach(cb => cb(this.reason));
      });
    }

    /**
     * 执行执行器，并用try catch包裹保证有异常执行_reject
     * 然后用户传来的执行器需要使用_resolve/_reject来改变内部状态
     */
    try {
      executor(_resolve, _reject);
    } catch (error) {
      _reject(error);
    }

  }

  /**
   * 核心 promise.then()
   *
   // 如果函数的执行结果一个promise实例将当前两个待执行函数传入
   // 如果x是普通值/函数 则直接将结果传入下一个实例
   * @param {Function} onFulfilled   执行成功的回调函数,参数是上一个的res的值
   * @param {Function} onRejected    执行失败的回调函数
   */
  then(onFulfilled, onRejected) {
    // TODO 如果onFulfilled不是个函数则变成函数
    if (this.status === 'Fulfilled') {
      return MyPromise.resolve(onFulfilled(this.value));
    } else {
      // this.resolveQueue.push(()=>{  onFulfilled(this.value) })  // 合理的加入队列的写法
      let result = onFulfilled(this.value);
      // 用户的回调函数是否也返回Promise
      if (result instanceof MyPromise) return result;
      // 否则创建一个Promise，并用自身的队列来记录要调用的
      return new MyPromise((res, rej) => {
        this.resolveQueue.push(arg => {
          res(arg);
        });
        console.log("in then pending");
      })
    }
  }

  /**
   * 核心 promise.catch()
   */
  catch(onRejectedCB) {
    if (this.status === 'Rejected') {
      return MyPromise.reject(onRejectedCB(this.value));
    }
    if (this.status === 'Pending') {
      return new MyPromise((res, rej) => {
        this.rejectQueue.push(value => {
          res(onRejectedCB(value));
        });
      })
    }
  }
}


Promise.all = function (promises) {
  let result = [];
  let count = 0;
  return new Promise((resolve, reject) => {

    promises.forEach((p, index) => {
      Promise.resolve(p).then((res) => {
        result[index] = res;
        count++;
        if (count === promises.length) {
          resolve(result)
        }
      }).catch((err) => reject(err))
    })

  });
}

// ==TEST==
let prom = new MyPromise((res, rej) => {
  setTimeout(() => {
    console.log("first!");
    res(1);
  }, 1000);
});
let pro3 = prom.then(res1 => {
  console.log('res is ' + res1);
  return new MyPromise(
    (res, rej) => {
      setTimeout(() => {
        console.log("1000!");
        res(1000);
      }, 1000)
    })
})
console.log(pro3);
