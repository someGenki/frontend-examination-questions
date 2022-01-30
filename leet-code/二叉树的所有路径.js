var binaryTreePaths = function (root, res = []) {
  const dfs = (node, path) => {
    if (node.left === null && node.right === null)
      res.push(path)
    if (node.left !== null)
      dfs(node.left, `${path}->${node.left.val}`)
    if (node.right != null)
      dfs(node.right, `${path}->${node.right.val}`)
  }
  dfs(root, root.val + "")
  return res;
};
