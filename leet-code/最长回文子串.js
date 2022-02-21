// babad
const old = function longestPalindrome(s) {
  if (s.length < 2) return s
  let begin = 0, end = 0, len = s.length

  function centerExpand(left, right) {
    while (left >= 0 && right < len && s[left] === s[right]) {
      --left;
      ++right;
    }
    return right - left - 1 // 退出循环时，left,j所值的边界不是回文子串 所以长度是j-left+1-2(2就是两边位置)
  }

  for (let i = 0; i < len - 1; ++i) {

    // 要考虑子串长度是奇数和偶数的情况(i,i)表示奇数的扩展，(i,i+1)表示偶数的扩展
    let currentLen = Math.max(centerExpand(i, i), centerExpand(i, i + 1))
    if (currentLen > end - begin + 1) {
      begin = i - Math.floor((currentLen - 1) / 2)
      end = i + Math.floor(currentLen / 2)
    }
  }
  return s.substring(begin, end + 1)
}

function longestPalindrome(s) {
  if (s.length < 2) return s
  let begin = 0, max = 1, len = s.length

  function centerExpand(left, right) {
    while (left >= 0 && right < len && s[left] === s[right]) {
      if (right - left + 1 > max) {
        max = right - left + 1
        begin = left
      }
      --left;
      ++right;
    }
  }

  for (let i = 0; i < len; ++i) {
    centerExpand(i, i + 1); // 偶数情况: 1234 从 23 开始扩展
    centerExpand(i - 1, i + 1); // 奇数情况 123 从 1 3 开始扩展(直接跳过2)
  }

  return s.substring(begin, begin + max)
}

// babad
console.log(longestPalindrome('ac'))

