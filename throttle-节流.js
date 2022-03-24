// 使用场景: input输入 页面滚动 窗口缩放 按键长按 联想搜索 滚动加载更多
// ==定时器版节流，立即执行==
function throttle(fn, interval = 1000) {
  let timer = null
  return function(...args) {
    if (timer === null) {
      fn(...args)
      // timer为null时，有空可执行。并设置timer，interval之后再置为null
      timer = setTimeout(() => timer = null, interval);
    }
  }
}

function _throttle(fn, delay = 200) {
  let last = null
  let timer = null
  return function (...args) {
    let now = Date.now()
    // 在时间间隔内，不触发，而且是取消定时器。当函数出发后要记录触发时间
    if (last && now < last + delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        last = now
      }, delay)
    } else {
      fn.apply(this, args)
      last = now
    }
  }
}

// ==TEST==
const throttlerLog = throttle(console.log, 200);
throttlerLog(1) // 1
setTimeout(() => throttlerLog(2), 100)
throttlerLog(3)
setTimeout(() => throttlerLog(4), 200) // 4
