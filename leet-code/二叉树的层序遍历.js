var levelOrder = function levelOrder2(root, res) {

  const pre = (root, depth) => {
    if (root === null) return;
    (res[depth] || (res[depth] = [])).push(root.val)
    pre(root.left, depth + 1)
    pre(root.right, depth + 1)
  }

  pre(root, 0)

  return res
}
