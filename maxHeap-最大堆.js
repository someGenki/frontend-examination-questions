// https://juejin.cn/post/7032568424832663583

class Heap {
  constructor(arr = []) {
    this.heap = [] // 用数组表示堆结构
    arr.forEach(item => this.add(item))
  }

  add(value) { // O(logK) 插入节点值: 放入数组末尾并上浮到合适位置
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1)
  }

  pop() { // O(logK) 提取最大值/堆顶: 提取 heap[0] 并用 heap[-1] 进行代替，然后从顶部开始下沉
    const max = this.heap[0]
    this.swap(0, this.size() - 1)
    this.heap.pop()
    this.shiftDown(0);
    return max;
  }

  peek() { // 获取最值/堆顶
    return this.heap[0];
  }

  size() { // 获取当前堆大小
    return this.heap.length;
  }


  swap(index1, index2) { // 交换节点位置
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  parentIndex(index) { // 获取父节点的位置 (index - 1) / 2 向下取整
    return (index - 1) >> 1;
  }

  leftChildIndex(index) { // 获取左子节点
    return index * 2 + 1;
  }

  rightChildIndex(index) { // 获取右子节点
    return index * 2 + 2;
  }
}

class MaxHeap extends Heap {
  constructor(arr = []) {
    super(arr);
  }

  shiftUp(index) { // 上浮节点，当前值小于父节点值时停止，使当前堆保持最大堆的性质
    let parentIndex = this.parentIndex(index)
    while (index > 0 && this.heap[parentIndex] < this.heap[index]) {
      this.swap(index, parentIndex)
      parentIndex = this.parentIndex(index = parentIndex)
    }
  }

  shiftDown(index) { // 下沉节点，当前值大于子节点值时停止，使当前堆保持最大堆的性质
    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);
    //  先比较左子节点值，当前值小于左子节点，则交换,并递归进行下沉
    if (this.heap[index] < this.heap[leftIndex]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[index] < this.heap[rightIndex]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
}

class MinHeap extends Heap {
  constructor(arr) {
    super(arr);
  }

  shiftUp(index) { // 上浮节点，当前值小于父节点值时停止，使当前堆保持最大堆的性质
    let parentIndex = this.parentIndex(index)
    while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex)
      parentIndex = this.parentIndex(index = parentIndex)
    }
  }

  shiftDown(index) { // 下沉节点，当前值大于子节点值时停止，使当前堆保持最大堆的性质
    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);
    //  先比较左子节点值，当前值小于左子节点，则交换,并递归进行下沉
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
}

// ==TEST==

const mh1 = new MinHeap([2, 3, 5])
console.log(mh1.pop())
console.log(mh1.pop())
console.log(mh1.pop())
console.log(mh1.pop())

var findKthLargest = function (nums, k) {
  const h = new MinHeap(); // heap中存放着前k个元素
  nums.forEach(n => {
    h.add(n);
    if (h.size() > k) h.pop();
  });
  return h.peek();
};
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))


