Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

## Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

## State Hook

```jsx
import React, { useState } from 'react'

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。

## Effect Hook

Effect Hook 可以让你在函数组件中执行副作用操作

如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。

```js
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

### 需要清除的 Effect

```js
import React, { useState, useEffect } from 'react'

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

**为什么要在 effect 中返回一个函数？** 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

**React 何时清除 effect？** React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。

### 通过跳过 Effect 进行性能优化

如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可：

```js
useEffect(() => {
  document.title = `You clicked ${count} times`
}, [count]) // 仅在 count 更改时更新
```

上面这个示例中，我们传入 [count] 作为第二个参数。这个参数是什么作用呢？如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，React 将对前一次渲染的 [5] 和后一次渲染的 [5] 进行比较。因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化。

:::warning
如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。参阅文档，了解更多关于如何处理函数以及数组频繁变化时的措施内容。

如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。

如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，但我们有更好的方式来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便。

我们推荐启用 eslint-plugin-react-hooks 中的 exhaustive-deps 规则。此规则会在添加错误依赖时发出警告并给出修复建议。
:::

## 自定义 Hook

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

```js
import { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```
