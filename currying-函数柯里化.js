/**
 * 所谓"柯里化"(部分求值)，就是把一个多参数的函数，转化为单参数函数。
 * 主要有3个作用： 参数复用、提前返回、延迟执行
 * 可以用函数.length属性判断接受到的参数是否满足执行条件
 * 参考：https://zhuanlan.zhihu.com/p/31271179
 * 参考：https://juejin.cn/post/6844904093467541517
 */

const curry = (fn, ...args) =>
  // 函数的形参个数可以直接通过函数的length属性来访问
  args.length >= fn.length
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    ? fn(...args)
    // 继续对当前函数进行柯里化，返回一个接受所有参数(当前参数和剩余参数)的函数
    : (..._args) => curry(fn, ...args, ..._args)

function currying(fn, ...args) {
  return function A() {
    if (arguments.length === 0) {
      return fn.apply(this, args) // 无参时执行
    } else {
      args.push(...arguments)
      return A // 返回函数A
    }
  }
}

function curryIt(fn, ...args) {
  return function A(arg) {
    args.push(arg)
    return args.length < fn.length ? A : fn.apply(null, args)
  }
}

// ==TEST==
const cost1 = (function() {
  let money = 0
  return function() {
    for (let i = 0; i < arguments.length; i++) {
      money += arguments[i]
    }
    return money
  }
})()

const cost = currying(cost1, 100)
cost(200) // 传入了参数，不真正求值
cost(300) // 传入了参数，不真正求值
console.log(cost()) // 求值并且输出600

// ==TEST==
const add = curry((x, y, z) => x + y + z)
console.log(add(1, 2, 3))
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1)(2, 3))
