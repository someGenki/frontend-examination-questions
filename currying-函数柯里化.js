/**
 * 所谓"柯里化"(部分求值)，就是把一个多参数的函数，转化为单参数函数。
 * 可以用函数.length属性判断接受到的参数是否满足执行条件
 * 参考：https://zhuanlan.zhihu.com/p/31271179
 * TODO 参考：https://juejin.cn/post/6844904093467541517#heading-3
 */

function currying(fn, ...args) {
  return function A() {
    if (arguments.length === 0) {
      return fn.apply(this, args); // 无参时执行
    } else {
      args.push(...arguments)
      return A; // 返回函数A
    }
  }
}

// ==TEST==

var cost1 = (function () {
  var money = 0;
  return function () {
    for (var i = 0; i < arguments.length; i++) {
      money += arguments[i];
    }
    return money;
  }
})();


var cost = currying(cost1, 100);
cost(200); // 传入了参数，不真正求值
cost(300); // 传入了参数，不真正求值

console.log(cost()); // 求值并且输出600
