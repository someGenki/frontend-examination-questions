const findKthLargest = function(nums, k) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = partition(nums, low, high);
    if (mid === k - 1) return nums[mid]
    // 如果中轴小于k-1，则说明需要在右侧元素中去切分(low=mid+1)
    mid < k - 1 ? low = mid + 1 : high = mid - 1
  }
}

function partition(arr, low, high) {
  // 取一个元素作为划分后的中轴。按照中轴来划分，小于中轴的放右边 (大到小排序)
  const pivot = arr[low]
  // low 向右移动，high 向左移动，直到 low 和 high 指向同一元素为止,中轴位置诞生
  while (low < high) {
    // 将high(数组索引<右侧>)移动到值比中轴值的大时，swap调整位置，让大值出现再中轴左侧
    while (low < high && arr[high] <= pivot) high--
    swap(arr, low, high)
    while (low < high && arr[low] >= pivot) low++
    swap(arr, low, high)
  }
  return low
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

// ==TEST==
console.log(findKthLargest([2, 1, 4, 3, 5], 3)) // 3
console.log(findKthLargest([3, 2, 5, 4, 6, 1, 77, 8, 9, 81, 0, 7, 22], 3)) // 22
