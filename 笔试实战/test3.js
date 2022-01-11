// 腾讯笔试题：树形数组变成树结构
let str1 = '[{"menuId":"menu11","menuPid":"menu1"},{"menuId":"menu12","menuPid":"menu1"},{"menuId":"menu121","menuPid":"menu12"},{"menuId":"menu21","menuPid":"menu2"}]'
let arr = JSON.parse(str1);
const pset = new Set(), nopset = new Set();
// 揪出所有的顶层父级节点
arr.forEach(item => nopset.add(item.menuId))
arr.forEach(item => !nopset.has(item.menuPid) && pset.add(item.menuPid))

function getChild(pid) {
  const carr = [];
  arr.forEach(item => {
    if (item.menuPid === pid) {
      carr.push(item)
      let t = getChild(item.menuId)
      if (t.length > 0) item.children = t
    }
  })
  return carr;
}

let result = []
pset.forEach(id => result.push({menuId: id, children: getChild(id)}))
console.log(result)
