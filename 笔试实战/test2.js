// 美团笔试第三题 括号匹配+
const str = '(()())()'
const stack = []
let result = 1
let tmpResult = 1;
for (let i = 0; i < str.length; i++) {
  let t = str[i]
  if (t === '(') {
    stack.push('(')
    continue;
  }
  // ')' 需要出栈的情况 并进行计算
  stack.pop();
  if (stack.length === 0) {
    result *= (tmpResult + 1)
    tmpResult = 1;
  } else {
    tmpResult *= 2;
  }
}

console.log(result % 1000000007)
