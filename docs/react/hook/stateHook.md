useState 可以在函数组件中像 class 组件一样使用 state

## useState

```js
const [state, setState] = useState(initialState)
```

返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并。  
在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

:::warning 跳过 state 更新
调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 Object.is 比较算法 来比较 state。）
:::
