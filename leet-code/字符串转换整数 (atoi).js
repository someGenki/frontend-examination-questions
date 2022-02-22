/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
  let flag = null, val = 0, i = 0, charCode;
  const strLen = s.length, BORDER = 2 ** 31;
  const ZERO = '0'.charCodeAt(0), NINE = '9'.charCodeAt(0)
  const ADD = '+'.charCodeAt(0), SUB = '-'.charCodeAt(0);

  // 1. 去除前导空格
  while (s[i] === ' ') i++;
  // 2. 判断正负号
  charCode = s.charCodeAt(i)
  if (charCode === ADD || charCode === SUB) {
    flag = charCode === ADD
    i++
  }
  // 3. 读取数字字符
  for (; i < strLen; i++) {
    charCode = s.charCodeAt(i)
    if (charCode < ZERO || charCode > NINE) break;
    val = val * 10 + (charCode - ZERO)
    if (val >= BORDER) break;
  }
  // 4. 正负号处理
  val = (flag === false ? -val : val)
  // 5. 边界处理
  if (val >= BORDER) val = BORDER - 1
  if (val <= -BORDER) val = -BORDER

  return val
};

console.log(myAtoi('2147483648'))
console.log(myAtoi('-2147483648'))
// console.log(myAtoi('21474836460'))
// console.log(myAtoi('-91283472332'))
// console.log(myAtoi('00000-42a1234'))
