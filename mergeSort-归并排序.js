// 归并排序:“递归”+“合并”,递归的排序好每一部分，最后合并
function mergeSort(arr) {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const leftArr = mergeSort(arr.slice(0, mid))
  const rightArr = mergeSort(arr.slice(mid, -1))
  return _merge(leftArr, rightArr)
}

// 核心：合并两个有序数组
function merge(left, right) {
  let leftIndex = 0, rightIndex = 0, res = []
  while (leftIndex < left.length && rightIndex < right.length) {
    left[leftIndex] <= right[rightIndex] //  "两权相较取其轻"
      ? res.push(left[leftIndex++])
      : res.push(right[rightIndex++])
  }
  leftIndex < left.length // 将剩余的数组都加入res数组
    ? res.push(...left.slice(leftIndex))
    : res.push(...right.slice(rightIndex))
  return res;
}

// 89 https://leetcode-cn.com/problems/merge-sorted-array/
function _merge(left, right, m = left.length, n = right.length) {
  let last = n + m
  while (n > 0) {
    if (right[n - 1] >= left[m - 1] || m === 0)
      left[--last] = right[--n]
    else
      left[--last] = left[--m]
  }
  return left
}

// 插入排序:有序序列的尾部开始，向前找到第一个出现比他小的值，腾个空间给他，后面比他大的值都要后移
function insertionSort(arr) {
  let val, j
  for (let i = 1; i < arr.length; i++) {
    val = arr[(j = i)] // 记录值，防止被覆盖
    while (j > 0 && arr[j - 1] > val) {
      arr[j] = arr[--j] // 把j-1的位置往后挪动，然后j - 1
    }
    arr[j] = val
  }
  return arr
}

const swap = (arr, i, j) => ([arr[j], arr[i]] = [arr[i], arr[j]])

// 选择排序：每次循环找到最小元素的下标，与目标位置交换
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j
    }
    if (minIndex !== i) swap(arr, i, minIndex)
  }
  return arr
}

// 冒泡排序: 循环每次凉凉比较，把大的往后放，第一次一次循环最大的就冒泡到了后面
function bubbleSort(arr) {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
    }
  }
  return arr
}

// ==TEST==
const { randomArray } = require('./utils')
const arr1 = randomArray()
console.log(mergeSort(arr1))
const arr2 = randomArray()
console.log(insertionSort(arr2))
