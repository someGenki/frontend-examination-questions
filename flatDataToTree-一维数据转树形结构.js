// 题目: 将扁平的一维数组转成树形结构
// 参考: 面试了十几个高级前端，竟然连（扁平数据结构转Tree）都写不出来 - https://juejin.cn/post/6983904373508145189
const { println, clone } = require('./utils')
// ==Data==
const input = [
  { name: '文本1', id: 1, parent: null },
  { name: '文本2', id: 2, parent: 1 },
  { name: '文本3', id: 3, parent: 2 },
]
const result = [
  {
    name: '文本1',
    id: 1,
    children: [
      {
        name: '文本2', id: 2,
        children: [{ name: '文本3', id: 3 }],
      },
    ],
  },
];

// ==递归,每次递归寻找子节点都要重新遍历数组==
function arr2Tree(arr, parentId) {
  function getChild(pid) {
    let childs = []
    arr.forEach(item => {
      if (item['parent'] === pid) {
        item.children = getChild(item.id)
        childs.push(item)
      }
    })
    return childs
  }

  return getChild(parentId)
}

// ==Map+两次循环，O(n)复杂度!==
function flatDataToTree(arr) {
  const map = new Map();
  let result = [], p;
  arr.forEach((item) => map.set(item.id, item));
  arr.forEach((item) => {
    if (item.parent && (p = map.get(item.parent))) {
      Array.isArray(p.children) ?
        p.children.push(item) :
        (p.children = [item])
    } else {
      result.push(item);
    }
    delete item.parent; // 可选，删除无用属性
  });
  return result;
}

// ==TEST==
println(arr2Tree(clone(input), null), true)
println(flatDataToTree(clone(input)))
