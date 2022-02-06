# 前端笔试题记录

始于2022/1/11，完善中

主要分为js相关、css相关、正则相关，暂时不分文件夹

## 规范性

### 命名规范

1. 文件名可采用英文-中文.后缀: `qsort-快速排序.js`，中文可省略: `qsort.js`
2. js文件名中的英文采用小驼峰规则: `mergeSort.js`
3. 对于实现js原有功能，添加my前缀，且不需要带中文: `myBind.js`
4. 对于css相关的题目，英文可省略: `CSS实现正三角形.html`

### 测试规范

对于一些实现的功能，可以在代码下方添加分割线并写上相关测试案例并附上输出结果

````js
// in deepClone.js
function deepClone(...) {
...
}

// ==TEST==
const obj = {
  name: 'jojo',
  addr: {
    country: 'UK',
    city: 'London'
  },
  s: Symbol(),
  arr: [1, 2, 3],
  date: new Date,
  cry: () => console.log('cry') // 函数没必要克隆
}
const cloneObj = deepClone(obj);

console.log(obj === cloneObj)           // false
console.log(obj.name === cloneObj.name) // true
console.log(obj.s === cloneObj.s)       // true
console.log(obj.addr === cloneObj.addr) // false
console.log(obj.date === cloneObj.date) // false
console.log(obj.arr === cloneObj.arr)   // false

````

对于一种题目，有多种解法，也需要用分割线分隔

````js
// in flatDataToTree-一维数组转树形结构.js
// ==递归写法==
function arrToTree(...){
    ... // 递归写法的代码
}
    
// ==Map+两次循环==
function flatDataToTree(...){
    ... // Map+两次循环的代码
}

// ==TEST==
    ...测试用例
````

