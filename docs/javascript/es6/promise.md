## Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

![](/img/javascript/promises.png)

## Promise 特点

（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

## 语法

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```js
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
)
```

then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。

## API

### Promise.prototype.then()

Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

```js
getJSON('/posts.json')
  .then(function(json) {
    return json.post
  })
  .then(function(post) {
    // ...
  })
```

### Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

```js
const jsPromise = Promise.resolve($.ajax('/whatever.json'))
```

### Promise.prototype.catch()

Promise.prototype.catch 方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

### Promise.prototype.finally()

finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

### Promise.all

接收一个可迭代对象，返回一个新 Promise。

当对象里的所有 Promise 都 resolve 时，返回的 Promise 也会 resolve。

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 1000)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 1500)
})

let P = Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
  console.log(P)
})
```

当有一个 reject 时，返回的 Promise 会立刻 reject

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 1000)
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3')
  }, 1500)
})

let P = Promise.all([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(res => {
    console.log(res)
  })
```

### Promise.race

Promise 接受一个可迭代对象，里面的 Promise 是竞争关系，谁先 resolve 或者 reject 立刻会被当做返回值返回到外部。其他会 settled 的 Promise 会继续执行但不会再影响结果。

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 500)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p2')
  }, 1000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('p3')
    resolve('p3')
  }, 1500)
})

let P = Promise.race([p1, p2, p3])
  .then(res => {
    console.log(res)
  })
  .catch(res => {
    console.log(res)
  })
```
