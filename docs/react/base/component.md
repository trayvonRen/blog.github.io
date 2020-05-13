## React 组件
React组件负责调用 `React.createElement()`，返回 React 元素，供 React 内部将其渲染成最终的页面 DOM。
React 中有三种构建组件的方式。React.createClass()、ES6 class和无状态函数。   
### 函数组件
**无状态组件**用一个纯函数创建，它传入 props 和 context 两个参数，**它没有 state，除了 render()，没有其它生命周期方法**。  
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### class 组件
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React 组件的复用，本质上是为了复用这个组件返回的 React 元素。  

