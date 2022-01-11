function my_flat(arr) {
  while (arr.some(i => Array.isArray(i))) {
    // 扩展运算符属于ES2018，会结构一层属性
    arr = [].concat(...arr)
  }
  return arr
}


// ==递归+reduce==
function my_flat1(arr) {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? my_flat1(cur) : cur), [/*initValue*/])
}

// ==TEST==
let test1 = [1, 2, 3, [1, 2, [3, 4]]]
console.log(my_flat(test1))
