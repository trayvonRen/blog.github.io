useState 可以在函数组件中像 class 组件一样使用 state

## useState

```js
const [state, setState] = useState(initialState)
```

## 函数式更新

如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。

```js
<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
```

## 跳过更新

React 使用 Object.is 比较算法 来比较 state。如果两次更新值相同，React 会跳过更新。
