// ↓可以分解为形式相同但规模更小的问题，且存在最简单的情形
// 如果能够解决n-1个元素的全排列，就可以解决n个元素的全排列
function perm(arr, start = 0) {
  if (start === arr.length - 1) {
    let str = arr.join('')
    // 利用set数据结构去重
    !set.has(str) && set.add(str)
  }
  for (let i = start; i <= arr.length - 1; i++) {
    swap(arr, i, start) // 遍历集合 让每个元素都有机会到start位置
    perm(arr, start + 1) // 更小规模 start位置被调换走了，所以后面不会出现
    swap(arr, i, start) // 要换回来
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j]
  arr[j] = temp
}

// ==TEST==
const set = new Set();
perm('aabb'.split(''))
console.log(set)
