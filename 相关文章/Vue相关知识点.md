# Vue.js面试学习

## Vue3源码

### 目录剖析

````
├── packages
│ ★ ├── compiler-core # 所有平台的编译器
│ ★ ├── compiler-dom  # 针对浏览器而写的编译器
│   ├── compiler-sfc  # 针对单文件SFC编译
│   ├── compiler-ssr  # 针对服务端渲染编译
│ ★ ├── reactivity 			  # 数据响应式系统
│   ├── reactivity-transform  #  
│ ★ ├── runtime-core # 虚拟 DOM 渲染器 ，Vue 组件和 Vue 的各种API
│ ★ ├── runtime-dom  # 针对浏览器的 runtime。其功能包括处理原生 DOM API、DOM 事件和 DOM 属性等。
│   ├── runtime-test # 专门为测试写的runtime
│   ├── server-renderer   # 用于SSR
│   ├── shared      # 包之间共享的帮助方法，工具库
│   ├── size-check  #  测试代码体积
│   ├── template-explorer #  编译文件浏览工具
│   └── vue #  构建vue runtime + compiler 主文件入口
// refer: https://juejin.cn/post/6972350540210503693
````

### 阅读调试

1. `pnpm install` 先安装好依赖
2. ` pnpm run dev` 编译生成**vue.global.js**文件，html文件中可作为js引入 
3. `pnpm run seve`  开启一个服务器供访问本地文件，默认端口**3000**
4. `start http://localhost:3000/packages/vue/examples/composition`  [Ctrl+👆](http://localhost:3000/packages/vue/examples/composition)

5. 打开一个自带的测试页面，并F12打开控制台可以添加断点
6. 使用IDEA系进行调试，可在**运行/调试配置**出添加JavaScript调试，并填好要打开的URL，并点击虫子启动
7. 然后在IDEA内对应的代码处添加断点即可



## Vue渲染流程

★从Vue.createApp()，传入根组件`rootComponent`，调用`mount()`开始。

1. 创建渲染器、创建appContext、app实例、重写mount方法

   启动入口：createApp() 位于 `packages/runtime-dom/src/index.ts`下，该方法首先调用`ensureRenderer()`创建属于DOM的渲染器后，调用渲染器返回的`createApp()`来创建app实例 

   > `const app = ensureRenderer().createApp(...args)`
   >
   > ensureRenderer 核心调用方法是`createRenderer()`！patch mount  update 等都在此方法内被定义。最后调用`createAppAPI()`创建**createApp**方法并返回它

2. 当调用app.mount()进行挂载时，先初始化容器，然后使用根组件创建**vnode**，最后调用**patch**()将 **vnode** **挂载**(patch方法在渲染器renderer创建`createRenderer()`时被定义)。

3. 挂载组件的工作: 从mountComponent方法开始，先**创建组件实例**(`createComponentInstance`)，**初始化实例**(`setupComponent(instance)`)，和**初始化渲染副作用**执行(`setupRenderEffect`)
   1. 创建实例: 创建appContext和instance 然后返回instance
   1. 初始化实例: 初始化props和slots以及调用**setup()**和**render**方法的挂载(`finishComponentSetup`)
   2. 渲染副作用执行: 创建组件更新函数(`componentUpdateFn`),并用Effect包裹用于收集依赖，该函数在挂载阶段(mount)将调用相关生命周期钩子，并通过执行`renderComponentRoot()`调用**render**方法获取基于当前实例的VNode Tree，并将VNode Tree进行patch到容器中。

----

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/jQmwTIFl1V3BjjMicfn5AM4QszJqibx4fbjECJAanEOryWJUJ84icTxdLoNSk3MSXtp16UFj8RJdGlwUXRrJJ58pQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



## Vue更新流程

当数据修改触发trigger时，会把`componentUpdateFn`（用于执行生命周期钩子以及rerender并**patch**的effect函数）选择合适的位置并加入任务队列中，并在微任务中清空任务队列，这也就是批量更新 (`packages/runtime-core/src/scheduler.ts`)。

componentUpdateFn - update: 以compA为例，A中的数据变化触发trigger

1. 调用comA实例上的render方法生成新vnode tree
2. 组件类型调用createVNode一般不传children(?)，所以在patch时，不比较children，其实例上的subTree(chilren)由mount时调用render创建并挂载。所以当子组件的状态(state&prop)变化时才调用子组件的render进行patch。prop会在patch时重写赋值(patch props 待定...)
3. 新旧VNode Tree进行patch

TODO https://blog.csdn.net/newway007/article/details/115867148



## Vue生命周期

vue实例从创建到销毁的过程成为vue的**生命周期**。期间经历vue实例的**创建、初始化数据、编译模板、挂载DOM、更新、卸载**等一些列阶段，在这些阶段会调用特定生命周期钩子。大体可以分为四个主要阶段，分别是**创建组件实例**阶段：先在组件实例创建前调用beforeCreate钩子、这时候数据都未初始化，当创建好实例后，会调用created钩子，此时组件实例相关属性可以被访问到（vue3新出setup方法和模板的编译是在这俩钩子调用前先执行，然后通过setupRenderEffect方法调用后续钩子），然后是**创建DOM**阶段，先调用beforeMount钩子，然后处理子树，等子树挂载完成后再调用mount钩子。这时候可以操作DOM节点。当**数据更新**，render被重新调用时，会先调用beforeUpdate钩子，然后再调用updated。当销毁实例时，会先调用beforeDestory钩子，这时可以移除监听、事件、定时器等首尾工作。销毁后会执行destory钩子。使用keep-alive缓存组件，还有actived钩子。





## Vue3新变化

- 新增`Composition API`,可以更好的逻辑复用和代码组织，避免代码分散、vue2中的mixin中带来的属性名冲突、代码来源不清楚等问题，导致出错后难以排除。
- 使用Proxy重构响应式系统，可以监听更多变化，比如删除、添加属性、has、数组下标变化等、懒代理对象。defineProperty是劫持对象属性，Proxy是代理整个对象。
- DIFF算法使用最长递增子序列优化对比流程，优化diff时间
- 还有编译时优化、如下
- 不支持IE11



## Vue3编译优化

函数缓存: 对事件侦听器缓存起来复用

patchFlag: 生成AST后，通过打**优化标记**，减少VNode属性的全量比较

静态提升: 对静态节点，会提升他们，打上标记 -1，只会创建一次，后面直接复用



## vue scoped 是怎么实现的

SFC文件中，style上特有的属性，使得当前css用于当前vue组件，避免样式污染。是利用postcss对css进行处理

## Vue的插槽的实现原理

1. 父组件调用render创建vnode时，在children属性中传入名为插槽名的函数，默认"default"

   ````js
   <ChildComp>slot content</ChildComp> // template
   _createBlock(ChildComp,props,{
     default: _withCtx(() => ["slot content"]),
   })
   ````

2. 当轮到子组件时执行render时，调用renderSlot，执行插槽方法，生成vnode

   ````js
   <h1><slot></slot><h1>  // slot
   _createElementBlock("h1", props, [
     _renderSlot($slots, "default") // 执行1中的default方法，生成vnode
   ])
   ````

3. 作用域插槽就是在renderSlot方法添加第三个参数



## 指令

1. 在render函数中，会先调用`resolveDirective()`用指令名获取对应指令属性（ 会自动把指令名驼峰化）
2. 调用`_withDirectives`方法，用于把指令属性添加到 `VNode` 对象上
3. 在组件的生命周期会调用`invokeDirectiveHook()`方法来调用指令上已注册的钩子
4. 对于 `v-if` 指令，在编译后会的render方法里通过 `?:` 三目运算符来实现动态创建节点的功能。
5. 对于`v-show`指令，则是内部指令，涉及4个钩子：`beforeMount`、`mounted`、`updated` 和 `beforeUnmount`






## V-Model

1. 对象型指令(函数型就视mounted和update为一种)，包含created，mounted，beforeUpdate三个钩子函数
2. 在有用指令的render函数中，使用**withDirectives**方法将指令添加到vnode上(`dirs`属性)
3. 在**created**钩子中，为元素注册事件，根据修饰符选择事件类型(lazy)，数字转换，trim之类
4. 利用`compositionstart/end`事件优化输入法组合输入的体验，当输入完在手动触发`input`事件
5. mounted钩子则只做给el元素赋值`   el.value = value == null ? '' : value`
6. 对于下拉单选多选等表单元素，则是有对应的`vModelRadio`等指令实现
7. 对于自定义组件使用`modelModifiers`属性获取自定义修饰符

此外，`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

1. text 和 textarea 元素使用 `value` property 和 `input` 事件；

2. checkbox 和 radio 元素使用 `check` property 和 `change` 事件；

3. select 元素将 `value` 作为 prop 并将 `change` 作为事件。



````js
// 父组件使用v-model="val时，实际是 :modelValue='val' @update:modelValue="$event => (val = $event)"
// 所以子组件定义v-model是，可以使用computed实现set时通知父组件修改
const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
````





## 事件

1. 在创建组件实例时，创建emit属性` instance.emit = emit.bind(null, instance)`
2. emit方法源码中，会先将事件名(emit的参数)**驼峰化**，然后从props对象上获取handler。
   - props的hander是声明组件时由`v-on:xxx`=>`onXxx`添加到props中
3. 内部最终调用`callWithErrorHandling`方法，配合try catch语句调用fn
4. 通过`v-on:`绑定的事件都会变成`onXxx`形式，并被emit函数内部进行转换
   1.  render方法中，v-on:jojo => onJojo (被添加到props中)
   2.  emit方法中，event = 'jojo',  toHandlerKey(camelize(event)) => onJojo
5. 对于修饰符`.once`,`.stop`之类的本质/原理是编译时被转换
   1. `v-on:jojo.once` => `onJojoOnce`
   2. `v-on:jojo.self.once` => `onJojoSelfOnce`
   3. emit方法源码中，会尝试拼接`'Once'`字符串到handler名后面，判断组件实例是否有修饰符(以**once**举例)
      1. handlerName是通过`$emit('jojo')`，参数'jojo'解析而来的，此时值为`onJojo`
      2. 当添加了`once`修饰符中，组件的props会有`onJojoOnce`属性的handler
      3. `const onceHandler = props[handlerName + 'Once']`进行尝试获取
6. 添加多个事件处理器
   1. `<div @click="foo(), bar()"/>`
   2. `h(Foo, { onFoo: [onFoo, onBar] }`
7. Vue 2中$emit方法是 `Vue.prototype` 对象上的属性



**修饰符**

事件修饰符：stop、prevent、capture、self、once、passive

按键修饰符：enter、tab、delete、esc、space、down、up、left、right、exact

鼠标修饰符：left、right、middle、sync

表单修饰符：lazy、number、trim



## Vue nextTick

就是把nextTick作为微任务 ，加到DOM更新之后,可以用于获取更新后的DOM。

数据的更新会把Watcher加入队列，进行批量更新，避免一次数据修改就更新一次DOM。

vue nextTick其实就是将dom更新后的操作当成微任务加到dom更新微任务的后面，保证其执行的顺序，再不行就使用setTimeout宏任务代替，在下一轮事件循环中执行



## Component & VNode & Instance

**Component**： 描述一个组件长啥样，接收什么props，一个sfc文件就是一个组件，就像一个函数(其实就是render函数)，props就是接收的参数。执行后返回的就是VNode

**VVnode**： 是一个抽象节点，对真实DOM的一层抽象(一个树形结构)

**Instance**：保存着对应VNode说需要的数据(props，data等)和方法(emit，hooks)

````ts
// 内部属性
__v_isVNode: true // 标识是否为VNode
[ReactiveFlags.SKIP]: true // 标识VNode不是observable
type: VNodeTypes // VNode 类型
props: (VNodeProps & ExtraProps) | null // 属性信息
key: string | number | null // 特殊 attribute 主要用在 Vue 的虚拟 DOM 算法
ref: VNodeNormalizedRef | null // 被用来给元素或子组件注册引用信息。
scopeId: string | null // SFC only
children: VNodeNormalizedChildren // 保存子节点
component: ComponentInternalInstance | null // 指向VNode对应的组件实例
dirs: DirectiveBinding[] | null // 保存应用在VNode的指令信息
transition: TransitionHooks<HostElement> | null // 存储过渡效果信息
````



## 虚拟DOM

what is: 用js对象来描述真实DOM，React和Vue的共同特性，

why use: 

1. 解决视图和状态同步问题，让用户更关注数据逻辑
2. 虚拟DOM的变化可跟踪，比较新旧DOM来差异地更新真实DOM
3. 中间层带来的好处肯定少不了**跨平台**和SSR
4. 减少复杂视图的渲染开销，毕竟真实DOM属性多



## 简单的依赖注入

1. 默认情况下，组件实例会继承于来自它父组件实例的*provides* 对象。
2. 当组件主动调用`provide()`时，会将使用父组件的 provides 对象作为原型对象来创建属于它自己的 provides
   1. 源码利用`Object.create()`实现对父组件的继承：创建新对象&& 它的原型指向父组件的provides
   2. 利用继承机制，当父组件的provides对象查不到对应属性，会隐式的从原型链上找



## Vue3 patch

**ShapeFlag**: 通过形状标记可以快速知道组件实例的类型，比如`renderComponentRoot`中，判断是有状态组件，则直接调用组件实例的render方法，该方法最终返回一个VNode Tree

<img src="https://img-blog.csdnimg.cn/img_convert/e101effc098cb36b4aa3800377ab7631.png" alt="img" style="zoom:150%;" />

PatchFlag：由编译时生成，结合type用于处理不同情况(分而治之)



**pathElement**

1. 触发相应钩子(例如指令的`beforeUpdate`)
2. 根据patchFlag进行全量/按需比较，比如包含动态key就需要全量比较
3. 接下来就是重量级 **patchChildren**！
4. 根据patchFlag判断是否有key选择不同方式的patch (最重量级！)
5. 根据shapeFlag判断元素类型进行不同判断，比如新子节点是文本，旧子节点是数组 or 新旧都是数组等



----

对于**没key**的children，以最短的节点直接patch，判断是新节点数量变长还是变短进行**mount**还是**unmount**

对于有key的children，会用到diff算法，先采用let i对二者**顺序遍历**，遇到不同时停下来，采用e1 e2双指针从二者末尾**逆序遍历**，遇到不同时停止(相同的直接patch)。

```js
    /*  c1 老的vnode c2 新的vnode  */
    let i = 0              /* 索引,用于遍历	子节点 */
    const l2 = c2.length   /* 新子节点的数量 */
    let e1 = c1.length - 1 /* 旧子节点 末尾索引 */
    let e2 = l2 - 1        /* 新子节点 末尾索引 */
```

当i> e1或 i>e2时，mount新节点多出的节点或者umount掉老节点多出的节点。

1. 旧子节点都遍历完，但新子节点还有未被遍历的，则将剩下的新子节点挂载(i<e1)
2. 新子节点都遍历完，但旧子节点还有未被遍历的，则将剩下的旧子节点移除(i>e2)

当i<e1 && i<e2 **存在未知序列**，把没有比较过的新的vnode节点通过map保存(key->index),  获取最长递增序列，找出不需要移动的节点，原地复用，减少了移动DOM的开销

----

1. 从**前**开始找到有相同的节点**patch**，发现不同，结束遍历

2. 从**后**开始倒序找相同的节点**patch**，发现不同，结束遍历

3. 如果是单纯的新增节点，将剩下的节点**mount**

4. 如果是单纯的删除节点，将剩下的节点**unmount**

5. 否则如果对于不确定的元素(**未知序列**)

   1. 基于新节点建立Map(child.key->index)
   2. 开始遍历老节点中的剩余节点(未知序列)
   3. 寻找与老节点对应新节点的**index**

      - 如果**index**不存在(老节点的key不在map)中则**umount**


      - 如果**index**存在复用(patch)并判断节点是否发生移动(不是很懂)

   4. 如果新节点没有对应老节点`(newIndexToOldIndexMap[i] === 0)`，mount

6. ★遍历完老节点后，如果发生移动，计算最长递增序列(这个数组来自于遍历老节点是找到**index**时记录的)，找出不需要移动的节点，原地复用，减少了移动DOM的开销





**为什么要得到最长稳定序列**

A: 因为我们需要一个序列作为基础的参照序列，其他未在稳定序列的节点，进行移动。

or: 满足此子序列的元素不需要移动，没有满足此子序列的元素移动即可。对应的

> 1 2 3  <> 3 1 2    getSequence: [1,2]  将3移动前面

Vue2在DOM-Diff过程中，优先处理特殊场景的情况，即头头比对，头尾比对，尾头比对等。

而Vue3在VNode-Diff过程中，根据 newIndexToOldIndexMap 新老节点索引列表找到最长稳定序列，通过最长增长子序列的算法比对，找出新旧节点中不需要移动的节点，原地复用，仅对需要移动或已经patch的节点进行操作，最大限度地提升替换效率，相比于Vue2版本是质的提升！
————————————————
原文链接：https://blog.csdn.net/webyouxuan/article/details/108459889





## Vue2 Patch DIFF算法

**what is**: 对两棵Vnode树(虚拟DOM)进行比较

**why use:**通过对比结果找出差异进行按需更新，以此减少不必要开销，提升性能

**what to do:** 创建新增节点、移除废弃节点、移动或修改需要更新的节点

**2个Vnode之间如何比较**（patchVnode，判断属性的更改）？

(key和tag都相同情况下进行如下比较,有不相同就重新渲染渲染) 

1. 新Vnode有的，老Vnode没的，就对真DOM**添加**新Vnode有的
2. 新Vnode没的，老Vnode有的，就对真DOM**移除**老Vnode有的
3. 如果新老Vnode都有children属性，则调用另个方法比较两者的children(★)

**2组Vnode之间如何比较**（update**Children**）？

1. 4指针遍历(Vue 2)，如果找到对应节点(key和tag都相同)，则找到差异并更新
2. 新的遍历完后，把老的没有对应的删除
3. 老的遍历完后，把新的没有对应的添加

**何为四指针遍历**？在每轮循环中利用4个指针（新头，新尾，老头，老尾）找对应关系

1. 先判断新头、老头是否为同个节点，然后进行patchVnode
2. 后判断新尾、老尾是否为同个节点，然后进行patchVnode

3. 再判断新头、老尾是否为同个节点，然后将旧节点对应的dom位移到**后**面
4. 再判断老头、新尾是否为同个节点，然后将旧节点对应的dom位移到**前**面
5. 最后前面四个都不满足，则再旧节点找跟新头相同的节点，并移到dom前面，没有**则**直接插入dom前面
6. 上面5中判断是`if  ... else if ... else`的关系



没有key可能会导致渲染错误，浪费渲染性能。

1. key都是undefined，会调用patchVnode，发现文本不一样，然后更新DOM其内容。这并非本愿

2. 如果key是index，插入节点就是会导致内容和index不一样，触发**无用的更新** 或者错误复用

   比如原来(key = index =1)的节点，在之前插入一个节点，index变成2。然后diff该节点是会被认为是原来(key = index =2 )的节点，然后进行比较和更新内容，后面的节点也是如此。（其实调用插入节点，在开头位置即可，只需要操作一次可以）

   



另二个简化版的图

![diff算法.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e3c68d1b0884d9ca0f8ffc5ee64a28e~tplv-k3u1fbpfcp-watermark.awebp)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc6584989d934b57ba795f1904122ef1~tplv-k3u1fbpfcp-watermark.awebp)



> 从头遍历新节点和旧节点，如果有相同节点，更新节点，遇到第一个不一样的，结束循环
> 从尾遍历新节点和旧节点，如果有相同节点，更新节点，遇到第一个不一样的，结束循环
> 如果旧节点 比较完毕了，插入新节点
> 如果新节点 比较完毕了，删除旧节点
> 给新节点 建立一个 <key, index> 的 Map 对象
> 使用 老节点 的key 来查找，如果存在 相同节点，就 patch
> 如果不存在 相同节点，把老节点删除
> 最后再  移动和挂载新节点(这一块有点没看懂，以后再研究研究)
>
> 这里就总结一下  Vue 源码中 的 diff  和 vue3.0 的区别，以及部分 react 的 diff  的区别
>
> 首先 vue3.0 的 diff 很明显 向 react 的 diff 靠拢，取消了 vue2.0 中的 排头 和排尾 ，排尾 和排头的比较
> 比较 也是采用了 一个 循环遍历，遇到第一个不一样的就 退出循环
> 与 比较中 与 react 不同的，还多了一次 从后往前面的遍历，算是 vue2.0 的精华遗产了
> 然后 vue2.0 建立的 <key,index> 是一个 Object，而 react 和 vue3.0 中的是 Map ，所以现在 在 3.0 中使用 对象作为 key 也是可以的了(在 object 中 使用 对象作为 key 会自动变成 [object Object]，所有 的key 都会重复)
> 最后执行  移动和挂载新节点
>
> ————————————————
> 版权声明：本文为CSDN博主「dongceha」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/dongcehao/article/details/107428437



## Vue3Api

### provide

组件实例默认继承自父组件的`provides`，如果该组件自己使用provide注入值，则创建一个属于自己的provides对象`currentInstance.provides = Object.create(parentProvides)`

### inject

如果有父组件实例，就用父组件实例的provides对象获取值：`return provides[key]`。没有父组件则该组件是根实例，从app.contenxt.provides获取值。属性的查找过程会经历原型链

为什么inject只能在setup或者函数式组件中调用？因为调用inject时，需要使用到`currentInstance`这个全局变量，这个变量只有在创建并初始化时组件实例时指向该组件实例。



## Vu3响应式

### 全局变量

targetMap:  `new WeakMap<any, Map<any, Dep>>()` // 代理target -> (target[key] =>Set(/* effect */) )

activeEffect: 一个引用，指向当前的effectStack栈顶即正在执行的effect

### 依赖收集track

核心就是在访问响应式数据的时候，触发 `getter` 函数，进而执行 `track` 函数收集依赖，会将当前`activeEffect`加入`dep`里面。

“一个副作用函数对target[key]进行读取，对这个effect加入key对应的dep集合，target每个key都对应一个集合”

### 派发通知trigger

核心就是在修改响应式数据时，触发 `setter` 函数，进而执行 `trigger` 函数派发通知

“拿到target[key]的dep集合中的effects（每个effect函数都是由框架创建的wrapper函数）”

### 副作用函数effect

利用一个函数创建wrapper函数来包裹原始函数，wrapper函数(`reactiveEffect()`)大致主要做两件事：让全局的 `activeEffect` 引用指向它， 然后执行被包装的原始函数 `fn`。

同时还维护一个effect栈，确保activeEffect能指向正确的wrapper函数。在入栈前会清空wrapper函数对应的旧依赖(确保无用的依赖造成无用的effect被执行,**即总是收集最新的依赖**)。

```ts
effectStack.push( (activeEffect = this) ) // in ReactiveEffect.run
```

3.2版本中通过bit标记法进行判断是否删除effect，减少对**Set**的操作，主要对`ref`、`computed` 等 API 的优化

当标记位大于32时，还是走原来的cleanUp方法。	

### Reactive

利用proxy代理对象，handles中触发`track/trigger`

**proxy中handles的类型**

1. `baseHandlers`负责`Object`和`Array`
2. `collectionHandlers`负责`Map`,`Set`, `WeakMap`,`WeakSet`

### Ref

利用class的`getter/setter`触发`track/trigger`

### Computed

传参`Getter`是懒执行的，返回一个ComputedRefImpl实例，在调用返回的实例的get value()时和数据更变时才执行。内部利用`dirty=true`标记是否为第一次和数据已更变。当getter中的依赖触发trigger时，调用`scheduler`来改变dirty为true

````ts
// ComputedRefImpl的getter/setter，该类与RefImpl类似
get value() {
  const self = toRaw(this)
  trackRefValue(self)
  if (self._dirty) {
    self._dirty = false
    self._value = self.effect.run() // 执行传参的Getter
  }
  return self._value
}

set value(newValue: T) {
  this._setter(newValue)
}
````

### Watch

核心**doWatch**方法，该函数返回一个函数用于停止侦听。

内部先判断source类型来创建一个getter(用于收集依赖的副作用函数)，然后创建一个名为job的**调度器任务**。该函数先判断是否该effect是否被停用，然后根据是否有cb来区分watch和watchEffect，是watchEffect则直接执行副作用函数，否则先执行副作用(getter)获取最新的值，然后触发cb回调，然后更新oldValue。

```ts
const effect = new ReactiveEffect(getter, scheduler)
```

创建 effect 对象后判断是否要立即执行job还是执行副作用或者加入后置队列

(创建Effect时有scheduler，则在effect被触发时，执行schedule而不是原本的方法)

## Vue的性能优化

````
编码阶段
尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
v-if和v-for不能连用
如果需要使用v-for给每项元素绑定事件时使用事件代理
SPA 页面采用keep-alive缓存组件
在更多的情况下，使用v-if替代v-show
key保证唯一
使用路由懒加载、异步组件
防抖、节流
第三方模块按需导入
长列表滚动到可视区域动态加载
图片懒加载
SEO优化
预渲染
服务端渲染SSR
打包优化
压缩代码
Tree Shaking/Scope Hoisting
使用cdn加载第三方模块
多线程打包happypack
splitChunks抽离公共文件
sourceMap优化
用户体验
骨架屏
PWA
还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。
组件拆成小组将，数据更新视图变化的细粒度

作者：伊人a
链接：https://juejin.cn/post/6989422484722286600
````



## 参考

DIff算法看不懂就一起来砍我(带图) https://juejin.cn/post/7000266544181674014

Vue3 进阶 - https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI2MjcxNTQ0Nw==&action=getalbum&album_id=1742489947426652164&scene=173&from_msgid=2247489839&from_itemidx=1&count=3&nolastread=1#wechat_redirect
