const hasCircle = (originObj) => {
  let map = new WeakMap();
  let rs = false;
  const isLoop = (obj) => {
    Object.values(obj).forEach(val => {

      if (val && typeof val === 'object') {
        if (map.has(val)) {
          return rs = true
        } else {
          map.set(val, true);
          isLoop(val)
        }
      }

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
