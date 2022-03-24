// 延时执行版防抖  使用场景：按钮点击、输入框验证
function debounce(fn, delay = 1000) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
let useRef,useCallback
// React Hooks结合debounce, https://codesandbox.io/s/react-hooks-with-debounce-cge7x?file=/src/App.js
function useDebounce(fn, delay = 1000, dep = []) {
  // useRef实现了React组件的缓存机制
  const { current } = useRef({fn, timer: null});
  return useCallback(function(...args) {
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => current.fn(...args));
  }, dep);
}

// ==TEST==
const debounceLog = debounce(console.log);
debounceLog('111');
debounceLog('222');
debounceLog('333'); // exec this

setTimeout(() => debounceLog('after 2s!'), 2000);
