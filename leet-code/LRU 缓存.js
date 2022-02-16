class LRUCache {
  constructor(capacity) {
    this.cache = new Map() // 核心就是利用map存放数据是有序的，但面试这样是不行的
    this.capacity = capacity
  }

  get(key) {
    if (this.cache.has(key)) { // 如果key存在则更新并返回
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
      return value
    } else {
      return -1
    }
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
      this.cache.set(key, value)
    } else {
      this.cache.set(key, value)
      if (this.cache.size > this.capacity)
        this.cache.delete(this.cache.keys().next().value) // 逐出最久未使用的key
    }
  }
}

LRUCache.prototype.cacheInfo = function() {
  return `CacheInfo:${Array.from(
    this.cache.entries())}, capacity=${this.capacity}, \t current size=${this.cache.size})`
}
let lru = new LRUCache(2);
lru.get(2)    // null
lru.put(2, 6)
lru.get(1)    // null
lru.put(1, 5)
console.log(lru.cacheInfo())
lru.put(1, 2)
console.log(lru.cacheInfo())
lru.get(1)  //
lru.get(2)
console.log(lru.cacheInfo())
