/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // 使用start和end指针从数组中限定子树范围
  const build = (preStart, preEnd, inStart, inEnd) => {
    if (preStart > preEnd) return null; // 构建数组不存在时停止递归

    const rootVal = preorder[preStart] // 前序遍历序列的首位就是树根的值
    let index; // 在中序遍历序列中找到对应树根的位置,其左侧就是左子树，右侧就是右子树

    for (index = inStart; index <= inEnd; index++)
      if (inorder[index] === rootVal) break;

    const leftSize = index - inStart; // 计算出构建左子树所用到数组大小

    // 左子树用到 preorder 的[1,leftSize]和 inorder 的[0~index-1]
    return new TreeNode(rootVal,
      build(preStart + 1, preStart + leftSize, inStart, index - 1),
      build(preStart + leftSize + 1, preEnd, index + 1, inEnd))
  }
  return build(0, preorder.length - 1, 0, inorder.length - 1)
};
