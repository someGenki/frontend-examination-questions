function _reverseList(head) {
  let cur = head, prev = null, next = null
  while (cur !== null) {
    next = cur.next
    cur.next = prev // 因为要翻转，所以把当前next指向上一个
    prev = cur // 当前节点变成上一个
    cur = next // 往后继续遍历
  }
  return prev
}

function reverseList(head) {
  const reverse = (cur, prev) => {
    if (cur === null) return prev
    let next = cur.next     // 记录当前节点的next，以便递归反转
    cur.next = prev     // 反转：让当前next指向prev
    return reverse(next, cur)   // 让下一个节点指向当前节点
  }
  return reverse(head, null)
}

