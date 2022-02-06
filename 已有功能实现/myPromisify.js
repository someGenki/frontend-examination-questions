// node中的一个工具类 将回调函数的用法变成promise形式的函数，原函数的callback用于resolve()
function promisify(fn) {
  return function (...args) {
    return new Promise((res, rej) => {
      fn && fn.call(this, ...args, (err, data) => !err ? res(data) : rej(err))
    })
  }
}

// ==TEST==
const add = (a, b, callback) => {
  let result = a + b;
  if (typeof result === 'number') {
    callback(null, result)
  } else {
    callback("请输入正确数字")
  }
}
const addCall = promisify(add);
addCall(1, 2).then((res) => console.log(res))
