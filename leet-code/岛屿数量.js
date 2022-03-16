/**
 * @param {string[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let count = 0
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  const dfs = (row, col) => {
    if (row < 0 || col < 0 || row >= grid.length || col >= grid[row].length)
      return // 边界停止
    if (grid[row][col] === '0' || grid[row][col] === '2')
      return // 未被感染 或者 访问过 停止
    grid[row][col] = '2' // 访问标记
    dirs.forEach((dir) => dfs(row + dir[0], col + dir[1]))
  }
  for (let i = 0, len1 = grid.length; i < len1; i++) {
    for (let j = 0, len2 = grid[i].length; j < len2; j++) {
      if (grid[i][j] !== '1') continue
      count++
      dfs(i, j)
    }
  }
  return count;
};
