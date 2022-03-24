/**
 * 用map是用来解决循环引用
 * WeakMap用是对对象的弱引用，避免大的克隆对象占据太多内存。
 *   if ([Date, RegExp, Set, Map].includes(target.constructor))
 *     return (new target.constructor(target)) // 特殊类型克隆
 *   const cloneTarget = Object.create(Object.getPrototypeOf(target)) // 继承原型
 *   map.set(cloneTarget, true)
 *   // Object.keys() 返回可枚举的属性,Reflect.ownKeys是所有的
 *
 */


function deepClone(target, map = new WeakMap()) {
  if (target === null || typeof target !== 'object') return target // 基本类型返回
  if ([Date, RegExp, Set, Map, Function].includes(target.constructor))
    return (new target.constructor(target)) // 特殊类型克隆
  if (map.get(target)) return map.get(target)
  const newTarget = Array.isArray(target) ? [] : {}
  map.set(target, newTarget)
  for (let prop in target) {
    if (target.hasOwnProperty(prop))
      newTarget[prop] = deepClone(target[prop], map)
  }
  return newTarget
}

// ==TEST==
let obj = {
  name: 'jojo',
  addr: {
    country: 'UK',
    city: 'London',
  },
  s: Symbol(),
  arr: [1, 2, 3],
  date: new Date,
// 函数没必要克隆，也可以用function.toString()配合eval克隆
  cry: () => console.log('cry'),
}

let cloneObj = deepClone(obj);

console.log(obj === cloneObj) // false
console.log(obj.name === cloneObj.name) // true
console.log(obj.s === cloneObj.s) // true
console.log(obj.addr === cloneObj.addr) // false
console.log(obj.date === cloneObj.date) // false
console.log(obj.arr === cloneObj.arr) // false
console.log(obj.cry === cloneObj.cry) // true

var _completeDeepClone = deepClone

function test() {
  const o1 = {
    name: 'g',
    age: 18,
    o: { name: 'o' },
    a: [1, 2],
    r: new RegExp(),
    d: new Date(),
  };
  o1.self = o1;
  const o2 = _completeDeepClone(o1);
  o1.name = 'z';
  o1.age = 1;
  return o1.name !== o2.name && o1.age !== o2.age && o1.o !== o2.o &&
    o1.a !== o2.a && o1.r !== o2.r && o1.d !== o2.d &&
    o1.self.self.self.self.self.self.self.self.self === o1.self && o1.self !==
    o2.self
}

console.log('!', test())
