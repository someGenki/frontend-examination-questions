let n = 3 // 商品数量
let price = [4, 2, 6] // 对应价格
let purchase = [1, 2, 1] // 需求数量
let m = 2 // 套餐数量
let combine = [ // 具体方案
  [1, 2, 0, 6],
  [0, 2, 1, 7],
]
const allZero = arr => arr.every(item => item === 0)
const hadNegative = arr => arr.some(item => item < 0)

function minPrice(n, price, purchase, m, combine) {
  let min = Infinity, map = new Map();
  // purchase - combine
  const dfs = (need, money) => {
    if (hadNegative(need))  // 超出了购买数量  返回-1
      return -1;
    let temp = money;
    for (const plan of combine) {
      // 尝试购买套餐，获得新的需求数组，然后减去套餐价格
      const newMoney = money + plan[n]
      if (newMoney > min) continue; // 剪纸
      const newNeed = need.map((item, index) => item - plan[index])
      const res = dfs(newNeed, newMoney)
      if (res === -1) { // 如果该套餐不能用(买了就超了) 计算价格
        for (let i = 0; i < n; i++) {
          if (need[i] === 0) continue;
          temp += need[i] * price[i]
        }
        min = Math.min(min, temp)
      }
    }
  }
  dfs(purchase, 0)
  return min;
}

console.log(minPrice(n, price, purchase, m, combine));

(()=>{
  let n = 6
  let arr = [25, 34, 33, 46, 49, 31]
  let sorted = [25, 31, 33, 34, 46, 49]
  let res = 71

  function minMoney(n, arr, target) {
    let min = Infinity, len = arr.length

    const dfs = (index, res) => {
      for (let i = index; i < len; i++) {
        const val = res + arr[i]
        if (val >= target) min = Math.min(val, min)
        else dfs(i + 1, val)
      }
    }

    dfs(0, 0)
    return min;
  }

  console.log(minMoney(n, arr, res))
})()
