---
title: Vue.nextTick
comments: true
date: 2020-2-2
top_image: http://img.woyasuohen6.cn/JavaScript-Debugging.jpg
math: true
categories: 
- VUE 源码学习 
tags:
- VUE
---

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
<!---more-->
## JavaScript 事件循环
关于JavaScript 事件循环的知识可以看阮老师的 [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

知识回顾：
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。
![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)
## VUE 异步更新队列
可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际工作。

例如，当你设置 vm.someData = 'new value'，该组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新。多数情况我们不需要关心这个过程，但是如果你想基于更新后的 DOM 状态来做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员使用“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们必须要这么做。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

**简单来说， VUE 会把一系列相关的 dom 操作放在一个 `tick` 中，一起插入任务队列中并等待执行**
**必须要使用 Vue.nextTick(callback) 才能确保上一轮 `tick` 中 dom 更新完成**

**例如：**

```html
<div id="example">{{message}}</div>
```
```js
var vm = new Vue({
    el: '#example',
    data: {
        message: 'old message'
    }
})
vm.message = 'new message' // 更改数据
console.log(vm.$el.textContent) // old message
Vue.nextTick(function () {
  console.log(vm.$el.textContent) // new message
})
```

## vue nextTick 实现源码
在 vue 2.6 版本的源码中，所有的相关逻辑都在 next-tick.js 文件中
一开始声明了 `callbacks` 数组，里面装着一次 `tick` 需要执行的所有函数
```js
const callbacks = []
```
vue 通过 nextTick 把需要执行的异步操作 push 到 `callbacks` 中, 并且执行`timerFunc()`

### nextTick 实现
```js
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

### timerFunc 实现
>timerFunc() 就是根据浏览器的兼容性声明的异步函数
>Vue 在会尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

- 如果浏览器原生支持 Promise 
```js
const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
```
- 如果浏览器支持 MutationObserver
😜这个我不懂
```js
let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
```
- 如果浏览器支持 `setImmediate` 
```js
timerFunc = () => {
    setImmediate(flushCallbacks)
  }
```
- 如果浏览器什么都不支持，就调用最原始的计时器添加
```js
timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
```

可见 `timerFunc` 本质上就是把 `flushCallbacks` 加入异步队列中
而 `flushCallbacks` 就是 依次执行 `callbacks` 里的回调并清空该数组 

### flushCallbacks 实现
```js
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```
**到此，一轮 `tick` 就执行完成了**
## 总结
1、h5 规范中 event loop 中的任务分为(宏)任务: (marco) task 和 微任务: microtask
如果浏览器原生支持 Promise，基于 `timerFunc` 的实现，`tick` 中的任务属于 microtask。
2、Vue.js 提供了 2 种调用 nextTick 的方式，一种是全局 API Vue.nextTick，一种是实例上的方法 vm.$nextTick，无论我们使用哪一种，最后都是调用 next-tick.js 中实现的 nextTick 方法。
3、本质上 vue 中所有的 dom 渲染都是通过 nextTick 执行的，也就是说 vue 中所有的 dom 渲染都是异步执行
## 参考资料

[VUE 文档](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)