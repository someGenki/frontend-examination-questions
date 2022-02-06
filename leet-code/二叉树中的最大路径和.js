/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

var maxPathSum = function(root, max = -1001) {
  // 获取节点最大贡献值
  const maxGain = (node) => {
    if (node === null) return 0;
    // 取左右节点的路径和，大于0才选取
    let leftValue = Math.max(maxGain(node.left), 0)
    let rightValue = Math.max(maxGain(node.right), 0)
    // 节点的最大路径和取决于该节点的值与该节点的左右子节点的最大贡献值
    let pathValue = node.val + leftValue + rightValue;
    // 更新记录的最大值
    max = Math.max(pathValue, max)
    // 节点最大贡献值等于 节点值 与其子节点中的 最大的贡献值 之和
    return node.val + Math.max(leftValue, rightValue)
  }
  maxGain(root)
  return max
};
