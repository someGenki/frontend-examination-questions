/**
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const res = []
  // left、right为需要拼接括号的数量
  const dfs = (left, right, str) => {
    if (left === 0 && right === 0)
      return res.push(str)
    if (left > 0)
      dfs(left - 1, right, str + '(')
    if (right > left)
      dfs(left, right - 1, str + ')')
  }
  dfs(n, n, '');
  return res;
};
console.log(generateParenthesis(2))
