function createListNode(
  arr = [], constructor = function ListNode(val = 0, next = null) {
    this.val = val
    this.next = next
  }) {
  return arr.reduceRight((prev, item) => {
    return new constructor(item, prev)
  }, null)
}

var removeNthFromEnd = function(head, n) {
  if (head.next === null) return null // 链表长为1 返回null
  let slow = head, fast = head;
  for (let i = 0; i < n; i++) fast = fast.next // 快指针先走n不
  if (fast === null) return head.next // 快指针走到末尾时，即要删除第一个直接返回head.next
  while (fast.next !== null) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return head
};

// let r1 = removeNthFromEnd(createListNode([1, 2, 3, 4, 5]), 2)
// console.log(removeNthFromEnd(createListNode([1]), 1))
console.log(removeNthFromEnd(createListNode([1, 2]), 1))
// console.log(r1)
