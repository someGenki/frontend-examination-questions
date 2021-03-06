function jsonp(url, params, cbName = null) {
  // 函数调用计数，每次调用该函数时自增，用于避免回调函数重名
  const cbCount = jsonp.cnt = (jsonp.cnt | 0) + 1
  const callbackName = cbName || ('cb_' + cbCount)

  // 拼接请求参数 先是判断是否已有查询参数，后添加回调函数名作为参数
  let querystring = (url.indexOf('?') > 0 ? '&' : '?') +
    (`callback=${callbackName}`)
  Object.entries(params || {}).
    forEach(([k, v]) => querystring += (`&${k}=${v}`))

  // 创建script标签，添加src属性并添加到body中
  const scriptTag = document.createElement('script')
  scriptTag.src = url + querystring
  document.appendChild(scriptTag)

  return new Promise((resolve) =>
    window[callbackName] = (data) => {
      resolve(data)
      scriptTag.remove()
      delete window[callbackName]
    },
  )
}

const xhr = new XMLHttpRequest();
xhr.open('post', 'http://localhost:8080/api/test');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({a: 1, b: 2}));
xhr.onreadystatechange = function() {
  if (xhr.status === 200 && xhr.readyState === 4) {
    const result = xhr.responseText;//获取到结果
    alert(result);
  }
}

// ==TEST==

jsonp('https://api.asilu.com/php/web-info.php?url=https://www.qq.com/&jojo=6').
  then(data => {
    console.log(data)
  })

jsonp('https://api.asilu.com/php/web-info.php', {
  url: 'https://v.douyin.com/',
}).then(data => {
  console.log(data)
})

jsonp('https://suggest.taobao.com/sug', {
  code: 'utf-8',
  q: '脆脆鲨',
}).then(data => console.log(data))
