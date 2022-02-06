// 实现Obverse方法观察对象，实现watch方法监听对象属性变化
/*
  const data = ob({ count: 0, foo: 'test' });

  watch(() => {
      console.log('watch-count', data.count);
  });
  watch(() => {
      console.log('watch-foo', data.foo);
  });

  data.count += 1;
  console.log('showcount', data.count);
  delete data.count;
  data.foo = 'test2';

 */

// 参考：packages/reactivity包的内容
// 省略了依赖重新收集，防止重复调用,嵌套调用等重要细节
let activeEffect = null
const targetMap = new WeakMap()

function ob(target) {
  const isObject = (o) => (typeof o === 'object' && o !== null)
  // 另外还用weakMap判断重复代理
  const handler = {
    // 原生对象 | key |  newValue | 具体被set的对象
    set(target, key, value, receiver) {
      if (value === target[key]) return
      const res = Reflect.set(...arguments)
      trigger(target, 'set', key)
      return res;
    }, get(target, key, receiver) {
      const res = Reflect.get(...arguments);
      track(target, 'get', key) // 收集依赖
      return isObject(res) ? ob(res) : res;  // 懒代理：当取值时，对于访问嵌套的对象时进行一层代理
    }, deleteProperty(target, key) {
      const res = Reflect.deleteProperty(...arguments)
      trigger(target, 'del', key)  // 触发依赖 - 删除
      return res
    },
  }
  if (!isObject(target)) return target
  return new Proxy(target, handler)
}

function watch(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

function track(target, type, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap)
    targetMap.set(target, (depsMap = new Map()))
  let dep = depsMap.get(key)
  if (!dep)
    depsMap.set(key, (dep = new Set()))
  if (activeEffect)
    dep.add(activeEffect)
}

function trigger(target, type, key) {
  targetMap.get(target).get(key).forEach(ef => ef && ef())
}

// ==REFER==
// https://juejin.cn/post/6972350540210503693#heading-8

// ==TEST==
/*let jojo = {name: 'jojo', age: 18, pets: {dog: {name: 'dani'}}}
let _jojo = ob(jojo)
console.log(_jojo.name)
console.log(_jojo.pets.dog.name)
console.log('==============')
watch(() => {
  console.log('watch-dog', _jojo.pets.dog.name);
});
_jojo.pets.dog.name += '!'*/

console.log(
  '><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><')

const data = ob({count: 0, foo: 'test'});

watch(() => {
  console.log('watch-count', data.count);
});
watch(() => {
  console.log('watch-foo', data.foo);
});

data.count += 1;
console.log('showcount', data.count);
delete data.count;
data.foo = 'test2';
