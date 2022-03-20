const path = 'C:/Users/hejiyuan/Desktop/vue-admin/node_modules/@element-plus/icons/es/Rank.js'
const reg = /\/node_modules\/([^/]+)\//

console.log(reg.test(path))

function test(str) {
  if(reg.test(str)){
    console.log(`!${RegExp.$1}!`)
  }
}

test(path)
