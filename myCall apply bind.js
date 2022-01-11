// 可参考 https://juejin.cn/post/7004638318843412493#heading-20
Function.prototype.myBind = function (ctx, ...args) {
  const self = this // this   must be a Function
  function bind(){
    //  当调用 new 时，this是bind函数实例，所以_this要用 new 内部的this
    const _this = this instanceof self ? this : ctx
    return self.apply(_this, [...args, ...arguments])
  }
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  // result.prototype = Object.create(this.prototype);
  // 继承原型
  bind.prototype = this.prototype
  return bind
}

// TODO
