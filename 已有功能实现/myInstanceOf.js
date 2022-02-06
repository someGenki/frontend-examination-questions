function _instanceOf(left/* 实例 */, right/* 类型 */) {
  while (true) {
    if (left === null)
      return false;
    if (Object.getPrototypeOf(left) === right.prototype)
      return true;
    left = left.__proto__;
  }
}

// ==TEST==
console.log(_instanceOf([], Array))  // true
console.log(_instanceOf([], Number)) // false
console.log(_instanceOf([], Object)) // true
console.log(_instanceOf(1, String))  // false
