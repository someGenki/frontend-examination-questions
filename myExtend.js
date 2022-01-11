function Animal() {
  this.type = "动物"
  this.arr = [1, 2, 3]
}

console.log("==原型链继承==");

!function 原型链继承() {  // 无法实现多继承，无法向父类传参，多个子类共用父类属性
  function Dog(name) {
    this.name = name
  }

  Dog.prototype = new Animal();

  let dog1 = new Dog('one')
  console.log(dog1.type, dog1.arr, dog1.name); // → 动物 [ 1, 2, 3 ] one
  // 赋值属性时，会自动屏蔽对象原型链上的同名属性（不影响原型上的值,原型上任何类型的属性值都不会被实例重写）
  dog1.type = "animal"
  // 引用类型则的修改就会影响到原型的属性 (引用类型的属性值会受到实例的影响而修改)
  dog1.arr.push(4)
  console.log(dog1.type, dog1.arr); // → animal [ 1, 2, 3, 4 ]

  let dog2 = new Dog('two')
  console.log(dog2.type, dog2.arr);  // → 动物 [ 1, 2, 3, 4 ]
}();

console.log("==构造函数继承==");

!function 构造函数继承() {  // 2. 借用构造函数继承，利用call()把子类的this给父类的构造函数用，相当于复制了一边父类的属性和方法
  function Dog(name) {
    this.name = name
    Animal.call(this);
  }

  let dog1 = new Dog('one')

  console.log(dog1.type, dog1.arr); // → 动物 [ 1, 2, 3 ]

  dog1.type = "animal"
  dog1.arr.push(4)

  console.log(dog1.type, dog1.arr); // → animal [ 1, 2, 3, 4 ]

  let dog2 = new Dog('two')
  console.log(dog2.type, dog2.arr);  // → 动物 [ 1, 2, 3 ]
}();
// 但是这样缺点就是浪费内存，不能实现函数复用。且父类更改时，已创建好的实例不能更新方法
// 且只能继承父类的实例属性和方法，不能继承父类原型上的属性/方法

console.log("==组合继承==");

!function 组合继承() {  // 内存消耗还是大,调用了2次父类构造方法!且在父类实例上产生了无用废弃的属性
  // 基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.
  function Dog(name) {
    Animal.call(this)
    this.name = name
  }

  Dog.prototype = new Animal();
  Dog.prototype.constructor = Dog
  let dog1 = new Dog('one')
  console.log(dog1 instanceof Dog, dog1 instanceof Animal);
}();

console.log("==寄生组合式继承 推荐==");

!function 寄生组合式继承_推荐() {
  // 基本思路：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
  // 优点：只调用一次方法构造方法，子类可以用到父类原型链上的属性和方法，能够正常使用 instance of
  function Dog(name) {
    Animal.call(this)
    this.name = name
  }

  // 创建的一个空的对象，继承了Animal原型的属性
  Dog.prototype = Object.create(Animal.prototype)
  Dog.prototype.constructor = Dog
  let dog1 = new Dog('one')

  console.log(dog1 instanceof Dog, dog1 instanceof Animal);
}();

console.log("==class实现继承==");

!function class实现继承() {
  class Dog extends Animal {
    constructor(name) {
      super()
      this.name = name
    }
  }

  let dog1 = new Dog('one')
  console.log(dog1 instanceof Dog, dog1 instanceof Animal);
}();
