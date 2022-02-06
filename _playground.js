/**
 * 排序 ＋ 贪心
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
const findContentChildren = function(g, s) {
  // 测试用例并非都是小到大的有序数组
  g = g.sort((a, b) => a - b); // 小孩所需要的胃口值
  s = s.sort((a, b) => a - b); // 饼干所提供的胃口值
  // 定义小孩胃口指针gg，饼干指针 ss，符合数量 count
  let gg = 0, ss = 0, count = 0;
  while (gg < g.length && ss < s.length) {
    if (s[ss] >= g[gg]) { // 饼干满足小孩时，指向下一个小孩，结果加一
      gg++;
      count++;
    }
    ss++;
  }
  return count;
};

const { dependencies, devDependencies, name, version } = pkg
