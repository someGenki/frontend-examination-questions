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
  random(start, end) {
    let r1 = Math.random()    // [0,1)
    let r2 = r1 * (end - start)   // [0,end - start)
    return Math.round(r2 + start)     // floor:[start,end) ceil:(start,end] round:[start,end]
  },

  createTree(arr, index = 0) {
    if (index > arr.length - 1 || arr[index] === null) return;
    return new TreeNode(arr[index],
      this.createTree(arr, index * 2 + 1),
      this.createTree(arr, index * 2 + 2),
    )
  },
}
function TreeNode(val = 0, left = null, right = null) {
  this.val = val
  this.left = left
  this.right = right
  this.__proto__ = null
}

function createTree(arr, index = 0) {
  if (index > arr.length - 1 || arr[index] === null) return;
  return new TreeNode(arr[index],
    createTree(arr, index * 2 + 1),
    createTree(arr, index * 2 + 2))
}

function isLeaf(node) {
  return node !== null && node.left === null && node.right === null
}
