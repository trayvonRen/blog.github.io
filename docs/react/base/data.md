## Props  
一个组件接收一些参数，我们把这些参数叫做 props（“props” 是 “properties” 简写）。  
**父组件传入 Props**
```js
class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'this is data'
    }
  }

  render() {
    return <Children data={this.state.data}></Children>;
  }
}
```
**子组件接收并使用 Props**
```js
function Children(props){
  return <h1>{ props.data }</h1>;
}
```
```js
class Children extends React.Component{
  render() {
    return <h1>{ this.props.data }</h1>;
  }
}
```
:::danger
所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
:::

## State
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

## 单向数据流
不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：  
```js
class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'this is data'
    }
  }

  render() {
    return <Children data={this.state.data}></Children>;
  }
}

class Children extends React.Component{
  render() {
    return <h1>{ this.props.data }</h1>;
  }
}
```
这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

## 父子组件传值
父组件向子组件可以使用 Props 来传值，那么子组件如何向父组件传值呢？  
**绑定事件处理函数**：可以通过父组件给子组件传递一个函数，通过执行这个函数来修改父组件的 State。
```js
class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'this is data'
    }
  }
  changeData() {
    this.setState({
      data: 'this data is changed'
    })
  }

  render() {
    return <Children changeData={this.changeData.bind(this)} data={this.state.data}></Children>;
  }
}

class Children extends React.Component{
  render() {
    return <h1 onClick={this.props.changeData} >{ this.props.data }</h1>;
  }
}
```