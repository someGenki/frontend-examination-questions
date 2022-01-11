let arr = [1, 2, 3, 4, 5]
let k = 0
// MIN_SAFE_INTEGER 9007199254740991
let max = Number.MIN_SAFE_INTEGER;

while (arr.length !== 0) {
  let tmp = arr.pop();
  arr.forEach(item => {
    let r = cal(tmp, item, k)
    max = r > max ? r : max
  })
}

function cal(x, y, k) {
  let l = (x ^ y) * k, r = (x * y)
  return BigInt(l + r)
}

console.log(max.asIntN())
