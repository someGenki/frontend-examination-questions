// 可参考 https://juejin.cn/post/7004638318843412493#heading-20

Function.prototype.myCall = function(ctx, ...args) {
  // ctx = ctx || window;
  let fn = Symbol();
  ctx[fn] = this
  const result = ctx.fn(...args)
  delete ctx[fn]
  return result
}

Function.prototype.myApply = function(ctx, args = []) {
  if (!Array.isArray(args))
    throw new TypeError('Need Array')
  let fn = Symbol();
  ctx[fn] = this
  const result = ctx.fn(...args)
  delete ctx[fn]
  return result;
}

// new.target: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target
Function.prototype.myBind = function(ctx, ...args) {
  const self = this // 记录调用bind 函数的引用

  function res() {
    // 当该函数被作为构造函数时使用，this指向 new 内部的 this
    return self.apply(new.target ? this : ctx, [...args, ...arguments])
  }

  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  res.prototype = this.prototype
  return res
}

// ==TEST==
// bind测试参考 https://blog.csdn.net/weixin_43911758/article/details/118467336
function say(res, res2) {
  this.num = res;
  console.log(this);
  console.log(this.hello);
  console.log(res);
  console.log(res2);
}

say.prototype.str = '内容'
let obj1 = {
  hello: 'hello',
}
const back = say.myBind(obj1, 1);
back(3);
// {hello: "hello", num: 1}
// hello
// 1
// 3

console.log('===========')

const b = new back(6);
console.log(b.str, 'b')
// backFn {num: 1}
// undefined
// 1
// 6
// 内容 b

console.log('===========')
