## React 组件

React 组件负责调用 `React.createElement()`，返回 React 元素，供 React 内部将其渲染成最终的页面 DOM。
React 中有三种构建组件的方式。React.createClass()、ES6 class 和无状态函数。

### 函数组件

**无状态组件**用一个纯函数创建，它传入 props 和 context 两个参数，**它没有 state，除了 render()，没有其它生命周期方法**。

```js
function Welcome(props) {
  console.log(props)
  return <h1>Hello, {props.name}</h1>
}
```

### 特点

- 没有生命周期，也会被更新并挂载，但是没有生命周期函数
- 没有 this(组件实例）
- 没有内部状态（state）
- 轻量，如果你的组件没有涉及到内部状态，只是用来渲染数据，那么就用函数式组件，性能较好。

### class 组件

```js
class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'hello word',
    }
  }
  render() {
    const { text } = this.state
    return <h1>{text}</h1>
  }
  componentDidMount() {}
  componentDidUpdate() {}
}
```

React 组件的复用，本质上是为了复用这个组件返回的 React 元素。
