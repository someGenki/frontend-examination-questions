function my_compose(...funcs) {
  if (funcs.length === 0)
    return arg => arg
  if (funcs.length === 1)
    return funcs[0]
  return funcs.reduce((pre, cur) => {
    //  前一个把当前函数包裹，返回一个新函数，然后接着包裹下一个函数
    return (...args) => pre(cur(...args))
  })
}

// ==TEST==
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

console.log(add3(add2(add1(1)))) // 7

console.log(my_compose(add1, add2, add3)(2)) // 8




