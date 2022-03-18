function indexOf(str, val) {
  var strLen = str.length, valLen = val.length
  for (var i = 0; i < strLen; i++) {
    var matchLen = i + valLen
    var matchStr = str.slice(i, matchLen)
    if (matchLen > strLen) {
      return -1
    }
    if (matchStr === val) {
      return i
    }
  }
  return -1
}
