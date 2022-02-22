const map = new Map([
  ['2', 'abc'],
  ['3', 'def'],
  ['4', 'ghi'],
  ['5', 'jkl'],
  ['6', 'mno'],
  ['7', 'pqrs'],
  ['8', 'tuv'],
  ['9', 'wxyz'],
])
/**
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  const res = [], len = digits.length
  if (len === 0) return res
  const dfs = (start, path) => {
    if (start >= len) return res.push(path)
    const str = map.get(digits[start])
    console.log(str)
    for (let i = 0; i < str.length; i++) {
      dfs(start + 1, path + str[i])
    }
  }
  dfs(0, '')
  return res
};

console.log(letterCombinations('8'))
