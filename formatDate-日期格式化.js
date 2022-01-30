function formatDate(d, formatter = 'yyyy-MM-dd HH:mm:ss') {
  const matches = {
    'y+': d.getFullYear(),          // 年
    'M+': d.getMonth() + 1,         // 月
    'd+': d.getDate(),              // 日
    'H+': d.getHours(),             // 时 (24h制)
    'h+': d.getHours() % 12,        // 时 (12h制)
    'm+': d.getMinutes(),           // 分
    's+': d.getSeconds(),           // 秒
    'w': '日一二三四五六'[d.getDay()] // 周
  }
  for (let symbol in matches) {
    if (RegExp(`(${symbol})`).test(formatter)) {   // 拼接括号()用于创建捕获组
      const val = matches[symbol], len = RegExp.$1.length // RegExp.$1就是formatter中捕获到的yyyy MM dd
      let replace = len === 1 ? val : ('000' + val).slice(-len) // 补零
      formatter = formatter.replace(RegExp.$1, replace)
    }
  }
  return formatter;
}

// ==TEST==
let d1 = new Date();
console.log(formatDate(d1))
