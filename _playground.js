var fib = function(n) {
  let dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2])% 1000000007
  }
  return dp[n]
};
let a = fib(44)
console.log(a)
