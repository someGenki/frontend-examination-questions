/**
 * 动态规划：每根柱子能接到的水取决于两侧最高柱子中的最小值减去该柱子的高度 (即短板+高度差)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  if (height.length < 3) return 0;  // 至少要 3 根柱子才能构成‘凹’形接水
  const len = height.length;
  const maxLeft = []      // 存放第 i 根柱子左侧最高柱子高度的数组
  const maxRight = []     // 存放第 i 根柱子右侧最高柱子高度的数组

  maxLeft[0] = height[0]  // 第0根左侧最高为自身
  maxRight[len - 1] = height[len - 1] // 第-1根右侧最高为自身

  for (let i = 1; i < len; i++)  // 正向遍历获取左侧最高柱子高度
    maxLeft[i] = Math.max(maxLeft[i - 1], height[i])

  for (let i = len - 2; i >= 0; i--)  // 反向遍历获取右侧最高柱子高度
    maxRight[i] = Math.max(maxRight[i + 1], height[i])

  return height.reduce((sum, cur, i) => sum + Math.min(maxLeft[i], maxRight[i]) - cur, 0)
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
