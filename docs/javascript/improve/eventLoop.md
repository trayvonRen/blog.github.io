![](/img/javascript/eventLoop)

从上图我们可以看出，js 主线程它是有一个执行栈的，所有的 js 代码都会在执行栈里运行。  
在执行代码过程中，如果遇到一些异步代码(比如 setTimeout,ajax,promise.then 以及用户点击等操作),那么浏览器就会将这些代码放到一个线程(在这里我们叫做幕后线程)中去等待，不阻塞主线程的执行，主线程继续执行栈中剩余的代码，当幕后线程（background thread）里的代码准备好了(比如 setTimeout 时间到了，ajax 请求得到响应),该线程就会将它的回调函数放到任务队列中等待执行。  
而当主线程执行完栈中的所有代码后，它就会检查任务队列是否有任务要执行，如果有任务要执行的话，那么就将该任务放到执行栈中执行。如果当前任务队列为空的话，它就会一直循环等待任务到来。  
因此，这叫做事件循环。

## Macrotask vs Microtask

### Task Queue(Macrotask Queue)

主要是进行一些比较大型的工作，常见的有从头执行一段 script 程序、setTimeout、setInterval
、用户交互事件回调

在以下时机，任务会被添加到宏任务队列：

- 一段新程序或子程序被直接执行时（比如从一个控制台，或在一个 `<script>` 元素中运行代码）。
- 触发了一个事件，将其回调函数添加到任务队列时。
- 执行到一个由 setTimeout() 或 setInterval() 创建的 timeout 或 interval，以致相应的回调函数被添加到任务队列时。

### Microtask Queue

主要是进行一些比较小型的工作，常见的有 Promise,process.nextTick(nodejs)、Promise.then、queueMicrotask()、MutationObserver

Microtask 和 Macrotask 的区别很简单，但却很重要：

- 当执行来自任务队列中的任务时，在每一次新的事件循环开始迭代的时候运行时都会执行队列中的每个任务。在每次迭代开始之后加入到队列中的任务需要在下一次迭代开始之后才会被执行.
- 每次当一个任务退出且执行上下文为空的时候，微任务队列中的每一个微任务会依次被执行。不同的是它会等到微任务队列为空才会停止执行——即使中途有微任务加入。换句话说，微任务可以添加新的微任务到队列中，并在下一个任务开始执行之前且当前事件循环结束之前执行完所有的微任务。

:::warning
因为微任务自身可以入列更多的微任务，且事件循环会持续处理微任务直至队列为空，那么就存在一种使得事件循环无尽处理微任务的真实风险。如何处理递归增加微任务是要谨慎而行的。
:::

## 事件循环

一次事件循环的过程

- 1、检查 Macrotask 队列是否为空,若不为空，则进行下一步，若为空，则跳到 3
- 2、从 Macrotask 队列中取队首(在队列时间最长)的任务进去执行栈中执行(仅仅一个)，执行完后进入下一步
- 3、检查 Microtask 队列是否为空，若不为空，则进入下一步，否则，跳到 1（开始新的事件循环）
- 4、从 Microtask 队列中取队首(在队列时间最长)的任务进去事件队列执行,执行完后，跳到 3

其中，在执行代码过程中新增的 microtask 任务会在当前事件循环周期内执行，而新增的 macrotask 任务只能等到下一个事件循环才能执行了(一个事件循环只执行一个 macrotask)

## 参考资料

[MDN: 深入微任务与 Javascript 运行时环境](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)  
[在 JavaScript 中通过 queueMicrotask() 使用微任务](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)
