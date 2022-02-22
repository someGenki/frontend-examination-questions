var addTwoNumbers = function(l1, l2) {
  let head = new ListNode(), cur = head, carry = 0, sum = 0;
  while (l1 || l2 || carry) {
    if (l1 !== null && l2 !== null) {
      sum = (l1.val + l2.val) + carry
      l1 = l1.next
      l2 = l2.next
    } else if (l1 !== null) {
      sum = l1.val + carry
      l1 = l1.next
    } else if (l2 !== null) {
      sum = l2.val + carry
      l2 = l2.next
    } else if (carry !== 0) {
      sum = carry
    }
    carry = Math.floor(sum / 10)
    cur = (cur.next = new ListNode(sum % 10))
  }
  return head.next
};
