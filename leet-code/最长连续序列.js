var _longestConsecutive = function(nums) {
  let len = 0, max = 0, map = Object.create(null);
  for (let num of nums) {
    if (!(num in map)) {
      let left = map[num - 1] || 0
      let right = map[num + 1] || 0
      // 当前长度等于左右连续区间的长度 +1
      len = 1 + left + right;
      // 更新区间两端点的长度值
      map[num] = map[num - left] = map[num + right] = len
      // 更新最大值
      max = Math.max(len, max)
    }
  }
  return max;
};

longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])

/**
 输入：nums = [100,4,200,1,3,2]
 输出：4
 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */
function longestConsecutive(nums) {
  let len = nums.length, numSet = new Set(nums), max = 0;
  if (len < 2) return len
  for (let num of numSet) {
    // 当num-1不存在时，才开始递增记录长度，即该num是序列头
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentLen = 0
      while (numSet.has(currentNum)) {
        currentNum++
        currentLen++
      }
      max = Math.max(max, currentLen)
    }
  }
  return max
}
