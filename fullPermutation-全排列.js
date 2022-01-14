// ↓可以分解为形式相同但规模更小的问题，且存在最简单的情形
// 如果能够解决n-1个元素的全排列，就可以解决n个元素的全排列
function perm(arr, start = 0) {
  if (start === arr.length - 1) {
    let str = arr.join('')
    !set.has(str) && set.add(str) // 利用set数据结构去重
  }
  for (let i = start; i <= arr.length - 1; i++) {
    swap(arr, i, start) // 遍历集合 让每个元素都有机会到start位置
    perm(arr, start + 1) // 更小规模 start位置被调换走了，所以后面不会出现
    swap(arr, i, start) // 要换回来/回溯
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j]
  arr[j] = temp
}

// 只适用于没有重复的值(需去重)
function permute(arr, res = []) {
  const backtrack = (path) => {
    // 回溯的终点，记录path并结束递归
    if (path.length >= arr.length) return res.push(path)
    // 当path包含记录过的值，中断递归(剪枝|回退)
    arr.forEach(v => (!path.includes(v)) && backtrack(path.concat(v)))
  }
  backtrack([])
  return res
}

// https://juejin.cn/post/6844904191379374087
function combine(chunks, res = []) {
  const helper = (start, path) => {
    const chunk = chunks[start]
    chunk.forEach(val => {
      const cur = path.concat(val)
      start === chunks.length - 1 ? res.push(cur) : helper(start + 1, cur)
    })
  }
  helper(0, [])
  return res
}

// https://leetcode-cn.com/problems/combinations/
function combineNK(n, k, res = []) {
  const helper = (start, path) => {
    if (path.length === k) return res.push(path) // 路径终点
    for (let i = start; i <= n; i++) {
      if (n - i + 1 < k - path.length) continue // 剪枝 452ms -> 104ms
      helper(i + 1, path.concat(i))
    }
  }
  helper(1, [])
  return res
}

// ==TEST==
const set = new Set();
perm('aabb'.split(''))
console.log(set) //  'aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa'

// ==TEST==
let res = permute([1, 2, 3])
console.log(res)

// ==TEST==
let names = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]
let res1 = combine([names, colors, storages])
console.log(res1)
/* [
    [ 1, 2, 3 ],
    [ 1, 3, 2 ],
    [ 2, 1, 3 ],
    [ 2, 3, 1 ],
    [ 3, 1, 2 ],
    [ 3, 2, 1 ]
   ] */
