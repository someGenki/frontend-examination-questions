function reverseList(head) {
  let cur = head
  let pre = null // 往后遍历的过程需要有个指针来记录上一个节点，初值必须为null，代表结尾
  let tmp = null // 需要一个指针保存当前节点的下一个，以免丢失
  while (cur !== null) {
    tmp = cur.next
    cur.next = pre // 因为要翻转，所以把当前next指向上一个
    pre = cur // 当前节点变成上一个
    cur = tmp // 往后继续遍历
  }
  return pre
}

