## Refs and the DOM

> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

## 创建 Refs

Refs 是使用 React.createRef() 创建的，并通过 ref 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```jsx
class Father extends React.Component {
  constructor(props) {
    super(props)
    this.myRef1 = React.createRef()
    this.myRef2 = React.createRef()
    this.state = {
      data: 'this is data',
    }
  }

  componentDidMount() {
    console.log(this.myRef1.current)
    console.log(this.myRef2.current)
  }
  render() {
    return (
      <div>
        <h1 ref={this.myRef1}>title</h1>
        <Children ref={this.myRef2} data={this.state.data}></Children>
      </div>
    )
  }
}
```

## 访问 Refs

当 ref 被传递给 render 中的元素时，对该节点的引用可以在 ref 的 current 属性中被访问。

```jsx
componentDidMount() {
    console.log(this.myRef1.current);
    console.log(this.myRef2.current);
  }
```

ref 的值根据节点的类型而有所不同：

- 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
- 你不能在函数组件上使用 ref 属性，因为他们没有实例。

## 回调 Refs

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

```jsx
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = null
  }

  setTextInputRef = element => {
    this.textInput = element
  }

  focusTextInput = () => {
    if (this.textInput) this.textInput.focus()
  }

  render() {
    return (
      <>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </>
    )
  }
}
```

React 将在组件挂载时，会调用 ref 回调函数并传入 DOM 元素，当卸载时调用它并传入 null。在 componentDidMount 或 componentDidUpdate 触发前，React 会保证 refs 一定是最新的。
