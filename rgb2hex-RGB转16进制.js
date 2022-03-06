function rgb2hex(sRGB) {
  const reg = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/  // 注意逗号,间的空格
  if (!reg.test(sRGB)) return sRGB;
  let rgb = [RegExp.$1, RegExp.$2, RegExp.$3], res = '#'
  for (const num of rgb) {
    let n = +num
    if (n < 0 || n > 255) return sRGB; // 边界
    res += ('0' + n.toString(16)).slice(-2) // 补零
  }
  return res;
}
