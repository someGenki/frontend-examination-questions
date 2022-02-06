var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === p || root === q)
    return root;    // 遍历到null时或找到p | q返回该root节点
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null)
    return root;  // 都不为null，则该root的左右字数都找到p,q
  else    // 如果一个为null，则p和q在另一个子树中
    return left === null ? right : left;
};
// 直接看题解的。。。
