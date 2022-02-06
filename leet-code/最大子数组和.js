/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0], sum = nums[0]; // 记录最大值和累加过的值即f(i)  转移方程：f(i)=max{f(i−1)+nums[i],nums[i]}
  for (let i = 1; i < nums.length; ++i) {
    sum = sum > 0 ? sum + nums[i] : nums[i]
    max = Math.max(max, sum)
  }
  return max
};

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
