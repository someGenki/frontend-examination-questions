// noinspection DuplicatedCode

/**
 * 快速排序与归并排序一样运用了分治思想:
 * 取数据最后一个作为分割 中轴
 * 数组左边的都比中轴小，右边都比中轴大
 * 然后就是递归调用且是原址排序不需要合并
 * 个人参考算法第四版实现地址:
 * https://github.com/someGenki/Algorithms/blob/master/src/chapter7/quicksort.java
 */
const qsort = function qsort(nums, low, high) {
  if (low >= high) return;
  // swap(nums, high, Math.floor(random() * high + 1)) // 不取下标leet code效率低
  const mid = partition(nums, low, high);
  qsort(nums, low, mid - 1);
  qsort(nums, mid + 1, high);
}

const random = (start, end) => {
  let r1 = Math.random()    // [0,1)
  let r2 = r1 * (end - start)   // [0,end - start)
  return Math.round(r2 + start)     // floor:[start,end) ceil:(start,end] round:[start,end]
}

const swap = (arr, i, j) => {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function partition(arr, low, high) {
  // 取一个元素作为划分后的中轴。按照中轴来划分，小于中轴的放右边 (大到小排序)
  const pivot = arr[low]
  // low 向右移动，high 向左移动，直到 low 和 high 指向同一元素为止,中轴位置诞生
  while (low < high) {
    // 将high移动到其值比中轴值的大时，swap调整位置，让大值出现再中轴左侧(逆序)
    while (low < high && arr[high] <= pivot) high-- // 先high！
    if (low !== high) swap(arr, low, high)
    while (low < high && arr[low] >= pivot) low++
    if (low !== high) swap(arr, low, high)
  }
  return low
}

// ==利用ES6+新特性5行实现简易快排(小到大)，但不是原址排序!==
function quickSort(array) {
  if (array.length < 2) return array // 递归的终止条件
  let pivot = array.pop() // 取数据最后一个作为分割 中轴
  let left = array.filter(v => v <= pivot)
  let right = array.filter(v => v > pivot)
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// ==TEST==
const { randomArray } = require('./utils')
let arr1 = randomArray()
qsort(arr1, 0, arr1.length - 1)
console.log(arr1)

let arr2 = randomArray()
console.log(quickSort(arr2))
