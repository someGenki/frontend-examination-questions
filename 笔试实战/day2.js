let input = 'XXVIIIV'
const map = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]])
/**
 通常情况下，罗马数字中小的数字在大的数字的右边。
 但也存在特例，例如 4 不写做 IIII，而是 IV。
 数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。
 同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
 I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
 X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
 C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
 给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
 */
// console.log(map)
const len = input.length;
let result = 0;
if (len === 1) {
  console.log(map.get(input[0]))
  // print(map.get(input[0]))
} else {
  for (let i = 0; i < len - 1; i++) {
    let a = map.get(input[i]), b = map.get(input[i + 1])
    if (a < b) {
      result += b - a
      i++;
    } else {
      result += a;
      if (i === len - 2) result += b;
    }
  }
  console.log(result)
  // print(result)
}


