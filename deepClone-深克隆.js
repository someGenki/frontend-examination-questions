/**
 * 用map是用来解决循环引用
 * WeakMap用是对对象的弱引用，避免大的克隆对象占据太多内存。
 * 这个版本无法克隆Symbol、Map、Set等
 */

function isObject(target) {
  return (typeof target === "object") && target !== null;
}

function deepClone(target, map = new WeakMap()) {
  if (!isObject(target)) return target

  if (map.get(target)) return target

  const cloneTarget = Array.isArray(target) ? [] : {}
  map.set(cloneTarget, true)
  // Object.keys()返回可枚举的属性,Reflect.ownKeys是所有的，通过Object.defineProperty可以设置是否可枚举
  Reflect.ownKeys(target).forEach(key => cloneTarget[key] = deepClone(target[key], map))

  return cloneTarget;
}

// ==TEST==
let obj = {
  name: 'jojo',
  addr: {
    country: 'UK',
    city: 'London'
  },
  s: Symbol(),
  arr: [1, 2, 3],
  date: new Date,
// 函数没必要克隆
  cry: () => console.log('cry')
}

let cloneObj = deepClone(obj);

console.log(obj === cloneObj) // false
console.log(obj.name === cloneObj.name) // true
console.log(obj.s === cloneObj.s) // true
console.log(obj.addr === cloneObj.addr) // false
console.log(obj.date === cloneObj.date) // false
console.log(obj.arr === cloneObj.arr) // false
console.log(obj.cry === cloneObj.cry)
