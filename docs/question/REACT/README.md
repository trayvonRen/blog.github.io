## React.lazy & Suspense 原理

编码过程中是使用了动态导入 import() 这个语法。  
但是 webpack 在做代码分割的时候是通过动态创建 `<script>` 的方式来进行异步加载。

## Context

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

### Context 原理

Todo

## Redux

### Redux 数据流

dispatch action -> reducer -> store

### Redux 中间件

在 React 中，中间件就是一个函数，对 store.dispatch 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
一般而言，使用 React 中间件是用来处理副作用，最常见的就是 ajax 请求。

- Redux Thunk  
  通过使用 Redux Thunk，actionCreator 除了返回 action 对象外还可以返回函数。这时，这个 actionCreator 就成为了 thunk。
  当 actionCreator 返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

- Redux Saga
  可以想像为，一个 saga 就像是应用程序中一个单独的线程，它独自负责处理副作用。 redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。

### Immutable.js
