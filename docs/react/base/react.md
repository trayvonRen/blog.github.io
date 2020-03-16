---
title: react 入门
comments: true
date: 2020-3-13
math: true
categories: 
- react
tags:
- react
---

在前段时间，跟着网上的教学视频学了一下 react 全家桶的用法。
课程学完之后，还是感觉云里雾里，最近又看了一遍文档, 感觉豁然开朗了很多。
不得不承认，react 文档确实很优秀。
<!---more-->
## react & react-dom
创建一个 react 项目时，依赖中会出现两个包：react react-dom  
react 包是 React 无关平台的核心逻辑。例如组件实现、更新调度等。
react-dom 包则是 React 在 web 平台上负责操作 dom 的逻辑。例如 ReactDOM.render() 和 ReactDOM.findDOMNode()。  
例如，如果在 mobile 端，你可能需要 react-native。
[React v0.14 Upgrade Guide](https://reactjs.org/blog/2015/10/07/react-v0.14.html)

## 元素 & 组件
### React 元素
元素是构成 React 应用的最小砖块
>与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。  

可以使用 `React.createElement()` `React.cloneElement()` 来创建 React 元素。 
`JSX` 也会被编译成 `React.createElement()`, 也就是说，所有的 `JSX` 都是 React 元素。

#### DOM元素
```js
const element = <h1>Hello, world</h1>;
```
等价于
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
#### 组件元素
```js
const element = (
  <MyButton color="blue" shadowSize={2}>
    Click Me
  </MyButton>
)
```
等价于
```js
const element = React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

### React 组件
React组件负责调用 `React.createElement()`，返回 React 元素，供 React 内部将其渲染成最终的页面 DOM。
React 中有三种构建组件的方式。React.createClass()、ES6 class和无状态函数。   
#### 函数组件
无状态组件用一个纯函数创建，它传入 props 和 context 两个参数，它没有 state，除了 render()，没有其它生命周期方法。  
```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### class 组件
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React 组件的复用，本质上是为了复用这个组件返回的 React 元素。  

## React 组件详解
### Props  
一个组件接收一些参数，我们把这些参数叫做 props（“props” 是 “properties” 简写）。  

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
### State
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。  
state 和 props 之间最重要的区别是：props 由父组件传入，而 state 由组件本身管理。组件不能修改 props，但它可以修改 state。
关于 setState() 你应该了解三件事  
- **不要直接修改 State**  

例如，此代码不会重新渲染组件：
```js
// Wrong
this.state.comment = 'Hello';
```
```js
// Correct
this.setState({comment: 'Hello'});
```

- **State 的更新可能是异步的**  

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：
```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

- **State 的更新会被合并**  

当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。

