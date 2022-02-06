/**
 * <scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
 * @question https://www.nowcoder.com/practice/a3ded747e3884a3c86d09d88d1652e10
 * @param sUrl 要提取的URL
 * @param sKey 可选key
 * @returns {string[]|string}
 */
function getUrlParam(sUrl, sKey = undefined) {
  const params = sUrl.split('?')[1].split('#')[0].split('&'), res = {}

  for (const kv of params) {
    let [k, v] = kv.split('=')
    if (!(k in res)) res[k] = v;
    else if (Array.isArray(res[k])) res[k].push(v);
    else res[k] = [res[k], v];
  }

  return sKey === undefined ? res : (res[sKey] || '')
}

// ==TEST==
let a = getUrlParam(
  'https://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe', 'test');
let b = getUrlParam(
  'https://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe', 'key');
let c = getUrlParam(
  'https://www.nowcoder.com?key=1&key=2&key=3&key=4&test=4#hehe');
console.log(a)
console.log(b)
console.log(c)
