function resolve1(str) {
  let set = new Set(['A', 'H', 'I', 'M', 'O', 'T', 'U', 'V', 'W', 'X', 'Y'])
  str.trim();
  if (str.length < 1) return false
  for (let i = 0; i < str.length; i++)
    if (!set.has(str[i])) return false

  return str.split('').reverse().join('') === str
}

/**
 * 1. 主 + 谓
 * 2. 谓语后面可能有宾语
 * 3. 谓语有且只有一个,主语、宾语可以任意个
 * 4. set1=主语表 set2=谓语表 set3= 宾语表
 * @example
 * set1 = i you he
 * set2 = am is are
 * set3 = yours his hers
 * str = [i am yours]
 */
let t1 = ['i', 'you', 'he'], t2 = ['am', 'is', 'are'],
  t3 = ['yours', 'his', 'hers']

let s1 = new Set(t1), s2 = new Set(t2), s3 = new Set(t3)
function resolve(str,s1,s2,s3) {
  str = Array.isArray(str) ? str : str.trim().split(' ')
  let c1 = 0, c2 = 0, c3 = 0
  for (let s of str) {
    if (s1.has(s)) {
      if (c2 === 0 && c3 === 0)  // 还未出现过谓语和宾语
        c1++;
      else return false
    } else if (s2.has(s)) {
      if (c1 > 0 && c2 === 0 && c3 === 0)  // 出现过主语但未出现过宾语和谓语
        c2 = 1;
      else return false
    } else if (s3.has(s)) {
      if (c1 > 0 && c2 === 1) // 出现过主语和一个宾语
        c3++;
      else return false;
    } else return false //  不属于主谓宾表中的单词
  }
  return (c1 > 0 && c2 === 1) // 确保主语至少有一个，谓语有且仅有一个
}

// console.log(resolve('i am yours',s1,s2,s3)?'YES':'NO')
// console.log(resolve('you is his',s1,s2,s3)?'YES':'NO')
// console.log(resolve('he are hers yours',s1,s2,s3)?'YES':'NO')
// console.log(resolve('i am am yours',s1,s2,s3)?'YES':'NO')
// console.log(resolve('is his',s1,s2,s3)?'YES':'NO')
console.log()
console.log(resolve('he he he he he his his his',s1,s2,s3)?'YES':'NO')
