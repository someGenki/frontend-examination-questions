/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount < 1) return amount
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0;
  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i]
    for (let j = coin; j <= amount; j++) {
      // dp[j]取决于，当使用一个coin时，剩余金额(j-coin)需要的次数
      dp[j] = Math.min(dp[j - coin] + 1, dp[j])
    }
  }
  return dp[amount] < Infinity ? dp[amount] : -1
};
let a = coinChange([1, 2, 5], 11)
console.log(a)
