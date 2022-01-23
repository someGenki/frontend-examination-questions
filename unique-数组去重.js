function distinct1(arr) {
  return [...new Set(arr)]
}

function distinct2(arr) {

  const result1 = arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur);
    return prev
  }, [/* initialValue,prev用 */])
  
  const result = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (result.indexOf(arr[i]) === -1) result.push(arr[i])
  }

  return result

}

// ==TEST==
const arr = [1, 1, 2, 3, 4, 4]
console.log(distinct1(arr))
