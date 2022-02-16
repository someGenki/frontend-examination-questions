/**
 * 前序遍历：[访问根结点]->遍历左子树->遍历右子树
 * 中序遍历：遍历左子树->[访问根结点]->遍历右子树
 * 后续遍历：遍历左子树->遍历右子树->[访问根结点]
 */
// q1: 二叉树的遍历，已知前序遍历12473568，中序遍历47215386，请问后序遍历

// 二叉树层次遍历 bfs 92ms https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
function levelOrder(root, res = []) {
  if (!root) return res;
  let depth = 0;
  const queue = [root];
  while (queue.length > 0) {
    res[depth] = [];
    const arr = queue.splice(0)
    arr.forEach(node => {
      res[depth].push(node.val)
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    })
    depth++
  }
  return res
}

// 采用前序遍历解法 dfs 72ms
function levelOrder2(root, res = []) {
  (function pre(root, depth) {
    if (!root) return;
    if (!res[depth]) res[depth] = []
    res[depth].push(root.val)
    pre(root.left, depth + 1)
    pre(root.right, depth + 1)
  })(root, 0)
  return res
}

// 二叉树中序遍历 DFS https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
function inOrder(root, res = []) {
  if (!root) return []
  inOrder(root.left, res)
  res.push(root.val)
  inOrder(root.right, res)
}

// 二叉树中序遍历非递归实现
function inOrder2(root) {
  const res = [], stack = []
  let node = root;
  while (stack.length > 0 || node) {
    if (node) { // 迭代左节点并依次入栈
      stack.push(node)
      node = node.left
    } else {    // 迭代到底后输出并迭代右节点
      node = stack.pop()
      res.push(node.val)
      node = node.right
    }
  }
  return res;
}
