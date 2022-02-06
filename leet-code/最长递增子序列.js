var lengthOfLIS = function(nums) {
  let len = nums.length, max = 1, dp = Array(len).fill(1);
  for (let i = 1; i < len; ++i) {
    for (let j = 0; j < i; ++j) {
      if (nums[i] > nums[j] && (dp[j] + 1) > dp[i])
        dp[i] = dp[j] + 1 // 递增，且dp[j]+1大于当前dp[i]，则更新dp[i]
    }
    if (dp[i] > max)
      max = dp[i]
  }
  return max
};

let test1 = [10, 9, 2, 5, 3, 7, 101, 18] // 4

/**
 * 贪心+二分查找，利用arr存放尽可能长的数，所以arr中的每一位尽可能小
 * 以输入序列[0,8,4,12,2] 为例：
 * 第一步插入 0 d=[0]；
 * 第二步插入 8 d=[0,8]；
 * 第三步插入 4 d=[0,4]；
 * 第四步插入 12 d=[0,4,12]；
 * 第五步插入 2 d=[0,2,12]。
 */
function _lengthOfLIS(nums) {
  // arr[]表示长度为i的最长上升子序列的末尾元素的最小值，max记录目前上升子序列的长度
  let arr = [], max = 0;
  for (let num of nums) {
    let left = 0, right = max
    while (left < right) {
      const mid = (left + right) >> 1 // 二分查找，找到第一个比num小的数arr[k],并更新arr[k+1]=num
      arr[mid] < num ? (left = mid + 1) : (right = mid)
    }
    if (right === max) ++max //  num>arr中每个值！
    arr[left] = num  // [1,3,5] 要放入 4，left就是索引为2的位置  放入后 => [1,3,4]
  }
  console.log(arr) // [ 2, 3, 7, 18 ]
  return max;
}

console.log(_lengthOfLIS(test1))
console.log(_lengthOfLIS([0, 8, 4, 12, 2]))
