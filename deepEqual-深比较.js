// 深比较
const isObject = (obj) => (obj !== null && typeof obj === 'object')

function deepEqual(o1, o2) {
  // 类型不全为Object则直接使用 === 比较
  if (!isObject(o1) || !isObject(o2)) return o1 === o2
  // 地址值一样则是同一个对象
  if (o1 === o2) return true
  // 获取对象的keys
  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);
  // keys长度不一致 提前返回 false
  if (keys1.length !== keys2.length) return false;
  // 递归比较2个 object 的key值
  return keys1.every((k1, idx) => deepEqual(o1[k1], o2[keys2[idx]]))
}

// ==TEST==
const obj1 = {
  name: 'jojo', age: 18, addr: {
    cite: 'London'
  }
}

const obj2 = {
  name: 'jojo', age: 18, addr: {
    cite: 'London'
  }
}

console.log(obj1 === obj1);                // true
console.log(obj1 === obj2);                // false
console.log(deepEqual(66, obj1));      // false
console.log(deepEqual(new Set([1, 2]), new Set([1, 2])));// true
// !Set/Map/Date/RegExp的比较要另外判断
console.log(deepEqual(new Set([1, 2]), new Set([1, 3])));// true
console.log(deepEqual(obj1, obj1));        // true
console.log(deepEqual(obj1, obj2));        // true


