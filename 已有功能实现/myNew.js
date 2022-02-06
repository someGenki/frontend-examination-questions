function _new(constructor, ...args) {
  let obj = {}      // 创建空对象

  obj.__proto__ = constructor.prototype  // 链接到原型 可以和上一步简化成Object Object.create(constructor)

  const result = constructor.call(obj, ...args)  // 绑定this执行构造函数

  return (typeof result === 'object') ? result : obj  // 确保 new 出来的是个对象
}

// ==TEST==
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.shout = function() {
  console.log(this.age, this.name + ' shout!')
}

const dio = _new(Person, 'dio', 18)
console.log(dio, dio.__proto__ === Person.prototype) // true
dio.shout()


