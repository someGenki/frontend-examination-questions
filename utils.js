module.exports = {
  // 显示将对象数据，变成json，方便node环境下控制台查看数据
  println(data) {
    console.log(`== Start ==`)
    console.log(JSON.stringify(data, null, ' '))
    console.log('==  End  ==')
  },
  // 简单深拷贝
  clone(data) {
    return JSON.parse(JSON.stringify(data))
  },
  // TODO运行时间测试
  // 产生随机长度，随机内容的数组
  randomArray(size, range = 50) {
    const randomNum = (range) => Math.floor(Math.random() * range)
    return Array.from(Array(size || randomNum(50)), _ => randomNum(range))
  },
}
