var addStrings = function (num1, num2) {
  let ans = [], len1 = num1.length - 1, len2 = num2.length - 1, carry = 0; //进位位；移位
  while (len1 !== -1 || len2 !== -1 || carry !== 0) {
    if (len1 !== -1) carry += num1.charCodeAt(len1--) - 48 /* ascii 0 = 48*/
    if (len2 !== -1) carry += num2.charCodeAt(len2--) - 48 /* ascii 0 = 48*/
    ans.push(carry % 10)
    carry = Math.floor(carry / 10)
  }
  return ans.reverse().join('')
};

let res = addStrings('11', '123')
console.log(res)
