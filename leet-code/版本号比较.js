// 版本号sort
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const a1 = version1.split('.'), a2 = version2.split('.')
  const maxLen = Math.max(a1.length, a2.length)
  for (let i = 0; i < maxLen; i++) {
    let v1 = Number(a1[i] || 0)
    let v2 = Number(a2[i] || 0)
    if (v1 !== v2) return v1 > v2 ? 1 : -1
  }
  return 0;
};
