/**
 * 千位分隔符 - 位置匹配
 * (?=p)和(?!p)分别代表p模式前面的位置和非前面的位置
 * ^是开头位置 $是结尾位置(从后面找) +是至少出现一次 \d是数字
 * 弄出后面第一个逗号 /(?=\d{3}$)/  => 123456,789
 * 弄出所有逗号   /(?=(\d{3})+$)/g =>  ,123,456,789
 * 去掉首位逗号   /(?!^)(?=(\d{3})+$)/g => 123,456,789
 * TODO 处理负号
 */
let r1 = '123456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',')
let r11 = '-123456789'.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
console.log(r1, r11)
let r1_Reg = /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/ // 判断是否符合 USD 格式

/**
 * 手机号分隔 - 位置匹配
 * “从后面位置开始，每4位前面加一个 ' - '
 */
let r2 = '15080316527'.replace(/(?=(\d{4})+$)/g, '-')
console.log(r2)
/**
 * url-search
 * URL只能用ASCII编码表示，可参考 https://www.w3school.com.cn/tags/html_ref_urlencode.asp
 * 量词 ? 表示出现0-1次 |  + 表示出现1-n次  |  * 表示出现0-n次
 * key0=0&key1=1&key2=&key3=3#top
 */
let urlSearchReg = /([^&?]+)=([^&#]*)/g
console.log('key0=0&key1=1&key2=&key3=3#top'.match(urlSearchReg))

// 转小驼峰
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}
