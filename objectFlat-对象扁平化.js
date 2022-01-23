function objectFlat(obj, result = {}) {
  function isObject(target) {
    return (target !== null && typeof target === 'object')
  }

  (function traverse(target, pkey = '') {
    if (isObject(target)) Object.entries(target).forEach(([k, v]) => {
      // 拼接key，数组的索引用 [] 替换 .
      let ckey = pkey + (Array.isArray(target) ? `[${k}]` : `${pkey && '.'}${k}`)
      // 是对象就继续递归处理，不是对象则作为result对象的属性
      isObject(v) ? traverse(v, ckey) : (result[ckey] = v)
    })
  })(obj)

  return result
}

// ==TEST==
let obj = {a: {b: {c: 1}}}
console.log(objectFlat(obj)) // { 'a.b.c': 1 }

obj = {
  a: 1,
  b: [1, 2, {c: true}],
  c: {e: 2, f: 3},
  g: null,
};

console.log(objectFlat(obj))
/*
{
  a: 1,
  'b[0]': 1,
  'b[1]': 2,
  'b[2].c': true,
  'c.e': 2,
  'c.f': 3,
  g: null
}
 */
