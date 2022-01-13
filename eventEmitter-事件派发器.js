class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // 监听
  on(type, callback) {
    this.events.has(type)
      ? this.events.get(type).push(callback)
      : this.events.set(type, [callback])
  }

  // 删除
  off(type, callback) {
    if (this.events.has(type)) {
      let callbacks = this.events.get(type)
      this.events.set(type, callbacks.filter(i => i !== callback))
    }
  }

  // 只执行一次
  once(type, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(type, fn);
    }
    this.on(type, fn);
  }

  // 发送事件
  emit(type, ...args) {
    this.events.has(type) && this.events.get(type).forEach(fn => fn(...args))
  }
}

// ==TEST==
const event = new EventEmitter();

const handle = (...args) => console.log("handle", args);


const handle1 = (...args) => console.log("handle1", args);


event.on("click", handle);
event.on("click", handle1);

event.emit("click", 1, 2, 3, 4);
console.log('off-click')
event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", (a, b) => console.log("dbClick", a, b));
event.emit("dbClick", 1, 2);
event.emit("dbClick");

