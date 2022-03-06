const hasCircle = (originObj) => {
  let map = new WeakMap(),rs = false
  const isLoop = (obj) => {
    Object.values(obj).forEach(val => {
      if (val!==null && typeof val === 'object')
        map.has(val) ? (rs = true) : (map.set(val, true) && isLoop(val))
    })
  }
  isLoop(originObj)
  return rs
}

// ==TEST==

let obj = {a: 'a', b: 'b'}
obj.c = obj
console.log(hasCircle(obj)) // true
console.log(hasCircle({a: 'a'})) // false
