function add1(x) {
  console.log('add1');
  return x + 1;
}

function add2(x) {
  console.log('add2');
  return x + 2;
}

function add3(x) {
  console.log('add3');
  return x + 3;
}

function my_compose(...funs) {
  if (funs.length === 0)
    return arg => arg
  if (funs.length === 1)
    return funs[0]

  // return funs.reduce((pre, cur) => (...args) => pre(cur(...args)))
  return funs.reduce((pre, cur) => {
    return (...args) => {
      return pre(cur(...args))
    } // 第一个把第二个包裹起来，然后接着包裹下一个函数
  })
}

// ==TEST==
console.log(add3(add2(add1(1)))) // 7
let result = my_compose(add1, add2, add3);
console.log(result(2)) // 8




