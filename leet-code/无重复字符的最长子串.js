const lengthOfLongestSubstring1 = function lengthOfLongestSubstring(str) {
  if (str.length < 1) return 0
  let left = 0, right = 1, max = 0;
  // 每次扩张判断有是否重复字符，有就更新最大值，并更新左边界位置
  for (let len = str.length; right < len; ++right) {
    let index = str.indexOf(str[right], left) // 从left开始的子串找str[right]的字符位置
    if (index < right) { // 有重复字符出现，计算最大值并更新left指针
      max = Math.max(max, right - left)
      left = index + 1
    }
  }
  return Math.max(max, right - left)
}

function lengthOfLongestSubstring(s) {
  const len = s.length, map = Array(128).fill(-1);
  let max = 0, left = 0, right = 0, currentChar, currentCharIndex;
  for (; right < len; ++right) {
    currentChar = s.charCodeAt(right);
    currentCharIndex = map[currentChar]
    if (currentCharIndex >= left) {
      max = Math.max(right - left, max)
      left = currentCharIndex + 1;
    }
    map[currentChar] = right
  }
  return Math.max(max, right - left)
}

