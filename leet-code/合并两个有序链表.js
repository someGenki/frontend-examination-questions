function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

const mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1
  let [min, max] = l1.val < l2.val ? [l1, l2] : [l2, l1]
  min.next = mergeTwoLists(min.next, max);
  return min
};
