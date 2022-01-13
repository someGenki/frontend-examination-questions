// 使用场景: input输入 页面滚动 窗口缩放 按键长按
// ==定时器版节流，立即执行==
function throttle(fn, interval = 1000) {
  let timer = null
  return function (...args) {
    if (timer === null) {
      fn(...args)
      // timer为null时，有空可执行。并设置timer，interval之后再置为null
      timer = setTimeout(() => timer = null, interval);
    }
  }
}

// ==TEST==
const throttlerLog = throttle(console.log, 200);
throttlerLog(1) // 1
setTimeout(() => throttlerLog(2), 100)
throttlerLog(3)
setTimeout(() => throttlerLog(4), 200) // 4
