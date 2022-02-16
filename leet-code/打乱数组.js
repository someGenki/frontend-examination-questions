class Solution {
  constructor(nums) {
    this.nums = nums
  }

  reset() {
    return this.nums
  }

  shuffle() {
    const res = Array.from(this.nums)
    for (let i = 0, len = res.length; i < len; i++)
      swap(res, i, rand(i, len))
    return res
  }
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function rand(start, end) {
  let r1 = Math.random()    // [0,1)
  let r2 = r1 * (end - start)   // [0,end - start)
  return Math.floor(r2) + start     // floor:[start,end) ceil:(start,end] round:[start,end]
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
var obj = new Solution([1, 2, 3])
var param_1 = obj.reset()
var param_2 = obj.shuffle()
console.log(param_2)
