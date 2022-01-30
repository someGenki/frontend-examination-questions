function ListNode(val) {
  this.val = val;
  this.next = null;
}

var hasCycle = function (head) {
  let fast = head, slow = head;
  // 快慢指针，slow一次移动一步，fast一次移动两步，有环就一定会相遇
  while (fast?.next) {
    slow = slow.next
    fast = fast.next.next
    if (fast === slow)
      return true
  }
  return false
};
