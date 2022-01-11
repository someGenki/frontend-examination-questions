function simulateSetInterval(handler, timeout, ...args) {
  let timer = null
  // 最关键的就是每次运行计时器要在重新创建自身以循环
  const interval = () => {
    timer = setTimeout(() => {
      handler(args)
      interval()
    }, timeout)
  }
  interval()
  return () => clearTimeout(timer)
}

// ==TEST==
let cancelFunc = simulateSetInterval(() => console.log(1), 1000)
setTimeout(cancelFunc, 5000)
