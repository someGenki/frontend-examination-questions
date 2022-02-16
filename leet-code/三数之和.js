/**
 * 排序 去重  双指针
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const len = nums.length, ans = []
  if (len < 3) return ans
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len - 2; ++i) {
    let val = nums[i], target = -val
    if (val > 0) break;     // 第一个数都大于0，后面数都比他大，和肯定不为0了，所以直接结束
    if (i > 0 && val === nums[i - 1]) continue; // 跳过重复值
    let left = i + 1, right = len - 1; // 定义双指针，分别指向 i+1 和 len-1 在这范围找“两数和”
    while (left < right) {
      const twoSum = nums[left] + nums[right]
      if (twoSum === target) {
        ans.push([val, nums[left++], nums[right--]])
        // 避免重复结果出现 如111333
        while (nums[left] === nums[left - 1]) ++left;
        while (nums[right] === nums[right + 1]) --right;
      } else if (twoSum < target) {
        left++; // 和小于target，说明nums[left]太小，该向右移动
      } else {
        right--; // 反之和大于target，说明nums[right]太大，该向左移动
      }
    }
  }
  return ans
};
