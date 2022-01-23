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
const {randomArray} = require('./utils')
const arr1 = randomArray()
console.log(mergeSort(arr1))
const arr2 = randomArray()
console.log(insertionSort(arr2))
