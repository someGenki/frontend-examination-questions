var lengthOfLIS = function (nums) {
  let len = nums.length, res = 1, dp = (new Array(len)).fill(1);
  for (let i = 1; i < len; ++i) {
    for (let j = 0; j < i; ++j) {
      let cur = nums[i], prev = nums[j], len = dp[j] + 1;
      if (cur > prev && len > dp[i]) dp[i] = len
    }
    if (dp[i] > res) res = dp[i]
  }
  return res
};

let test1 = [10, 9, 2, 5, 3, 7, 101, 18] // 4
function _test(nums) {
  let arr = [], max = 0;
  for (const num of nums) {
    let left = 0, right = max;
    while (left < right) {
      let mid = (left + right) >> 1
      if (arr[mid] < num) left = mid + 1
      else right = mid
    }
    // num大于arr[max] 结果加一，相当于 if(arr[max]<num) arr[++max] = num;即num可直接加入arr，构成递增序列
    if (right === max) max++;
    //left为arr中比最大的比num小的值的位置 比如 [1,3,5] 4。left就是arr[2]的位置  => [1,3,4]
    arr[left] = num
  }

  return max;
}


console.log(_test(test1))
