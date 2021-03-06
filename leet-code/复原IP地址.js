var restoreIpAddresses = function(s) {
  const ans = [], segs = Array(4), len = s.length;
  const dfs = (count/* segs索引 */, start/* str起始索引 */) => {
    // 递归的结束条件，segs放满4位且遍历到字符串末尾时，加入结果集
    if (count === 4 || start === len) {
      if (count === 4 && start === len)
        ans.push(segs.join('.'));
      return;
    }
    // 遇到0 直接递归! (因为不能有前导0的数字 比如 255.01.1.1)
    if (s[start] === '0') {
      dfs(count + 1, start + 1, segs[count] = 0)
    }
    // 提取数字，遍历所有情况
    for (let i = start + 1; i <= len; ++i) {
      const num = parseInt(s.substring(start, i), 10)
      if (num < 1 || num > 255) break;
      else dfs(count + 1, i, segs[count] = num);
    }
  }

  dfs(0, 0)
  return ans
}

// ==TEST==
let res = restoreIpAddresses('010010')
console.log(res)
// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
