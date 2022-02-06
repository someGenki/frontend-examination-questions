// 美团第一题：全排列
function timu1() {
  const result = []
  const set = new Set();

  function perm(arr, start = 0) {
    if (start === arr.length - 1) {
      let str = arr.join('')
      if (set.has(str) === false) {
        result.push([...arr])
        set.add(str)
      }
    }
    for (let i = start; i < arr.length; i++) {
      swap(arr, start, i)
      perm(arr, start + 1)
      swap(arr, start, i)
    }
  }

  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp;
  }

  perm([1])
  console.log(result)

}

timu1();
