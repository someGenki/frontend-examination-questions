var longestCommonPrefix = function(strs) {
  let i = 0, j, flag = true, str1 = strs[0]
  const len = str1.length, slen = strs.length
  for (; i < len && flag; ++i) {
    for (j = 1; j < slen; ++j) {
      if (strs[j][i] !== str1[i]) {
        flag = false;
        i--;
        break;
      }
    }
  }
  return str1.substr(0, i)
};
let res1 = longestCommonPrefix(['flower', 'flow', 'flight'])
let res2 = longestCommonPrefix(['dog', 'racecar', 'car'])
let res = longestCommonPrefix(['12'])
console.log(res2)
