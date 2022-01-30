var longestConsecutive = function (nums) {
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
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  let length = nums.length
  if (length === 0 || length === 1) return length
  //
  let numSet = new Set(nums)
  //
  let maxLength = 0

  for (let num of numSet.values()) {
    if (numSet.has(num - 1)) continue

    let currentNum = num
    let currentLength = 0
    while (numSet.has(currentNum)) {
      currentNum++
      currentLength++
    }

    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
}

function longestConsecutive(nums) {
  let len = nums.length, max = 0;
  if (len < 2) return len
  let numSet = new Set(nums)
  for (let num of numSet) {
    // 从最左端找其
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
