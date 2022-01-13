function jsonp(url, params, callback = null) {
  // 函数调用计数，每次调用该函数时自增，用于避免回调函数重名
  const cb_count = ++jsonp.cnt || (jsonp.cnt = 1)
  const callbackName = callback || ('cb_' + cb_count)

  let querystring = (url.indexOf("?") > 0 ? '&' : '?') + (`callback=${callbackName}`)
  Object.entries(params || {}).forEach(([k, v]) => querystring += (`&${k}=${v}`))

  // 创建script标签，添加src属性并添加到body中
  const scriptTag = document.createElement('script')
  scriptTag.src = url + querystring
  document.body.appendChild(scriptTag)

  return new Promise((resolve, reject) => {
    window[callbackName] = (data) => {
      resolve(data)
      scriptTag.remove()
      delete window[callbackName]
    }
  })
}


// ==TEST==

jsonp('https://api.asilu.com/php/web-info.php?url=https://www.qq.com/&jojo=6').then(data => {
  console.log(data)
})

jsonp('https://api.asilu.com/php/web-info.php', {
  url: 'https://v.douyin.com/'
}).then(data => {
  console.log(data)
})

jsonp('https://suggest.taobao.com/sug', {
  code: 'utf-8',
  q: '脆脆鲨'
}).then(data => console.log(data))
