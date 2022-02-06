let str = '01.110'
let str1 = str.split('.')
let str2 = str1[0]
let str3 = str1[1]
let len = str2.length
let result = ''
let cnt = 0

for (let i = len - 1; i >= 0; i--) {
  cnt++;
  if (cnt === 3 && i !== 0) {
    result = ',' + str2[i] + result
    cnt = 0
  } else {
    result = str2[i] + result
  }
}
if (str3)
  result += ('.') + str3
console.log(result)
