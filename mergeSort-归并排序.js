// 归并排序:“递归”+“合并”,递归的排序好每一部分，最后合并
function mergeSort(arr) {
  if (arr.length < 2) return arr
  let mid = Math.floor(arr.length / 2)
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

// 核心：合并两个有序数组
function merge(left, right) {
  let i = 0, j = 0, res = []
  //  "两权相较取其轻"
  while (i < left.length && j < right.length) {
    left[i] <= right[j]
      ? res.push(left[i++])
      : res.push(right[j++])
  }
  // 将剩余的数组都加入res数组
  i < left.length
    ? res.push(...left.slice(i))
    : res.push(...right.slice(j))
  return res;
}

// ==TEST==
const {randomArray} = require('./utils')
const arr1 = randomArray()
console.log(mergeSort(arr1))
