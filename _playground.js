/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.toLocaleUpperCase()
  let set = new Set('ABCDEFGHIJKLMNOPQRSTVUWXZY0123456789'.split(''))
  let i = 0, e = s.length - 1
  while (i < e) {
    // console.log('=', s[i], s[e], '=')
    if (set.has(s[i]) && set.has(s[e])) {
      if (s[i] !== s[e]) return false
      else {
        i++;
        e--;
      }
    } else if (!set.has(s[i])) {
      i++;
    } else if (!set.has(s[e])) {
      e--;
    }
  }
  return true
};
console.log(isPalindrome('E A '))
