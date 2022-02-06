/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = partition(arr, left, right) // 按照left到right进行划分，并返回中轴位置
    if (mid + 1 === k) break; // mid是下标从0开始，所以加1
    mid + 1 > k ? right = mid - 1 : left = mid + 1 // 缩小排序范围
  }
  return arr.splice(0, k)
};

// 将arr按照left-right范围内，任取一个作为中轴，小的放左边，大的放右边，返回放置后中轴所处位置
function partition(arr, left, right) {
  const pivot = arr[left]
  while (left < right) {
    while (left < right && arr[right] >= pivot) right--
    swap(arr, left, right) // 把中轴右边小的放左边
    while (left < right && arr[left] <= pivot) left++
    swap(arr, left, right) // 把中轴左边大的放右边
  }
  return left
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
