<!-- ## 受控组件 & 非受控组件

[参考资料](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

### 受控组件

通过事件绑定 setState，使视图与数据同步

```js
class Form extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
      </div>
    )
  }
}
```

### 非受控组件

通过 ref 获取 dom，需要使用数据的时候再获取数据

```js
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value
    // do something with `name`
  }

  render() {
    return (
      <div>
        <input type="text" ref={input => (this._name = input)} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    )
  }
}
```

### 总结

二者的使用场景

| feature                                   | uncontrolled                 | controlled |
| ----------------------------------------- | ---------------------------- | ---------- |
| one-time value retrieval (e.g. on submit) | ✅                           | ✅         |
| validating                                | on submit                    | ✅         | ✅ |
| instant                                   | field validation             | ❌         | ✅ |
| conditionally                             | disabling submit button      | ❌         | ✅ |
| enforcing                                 | input format                 | ❌         | ✅ |
| several                                   | inputs for one piece of data | ❌         | ✅ |
| dynamic                                   | inputs                       | ❌         | ✅ |

非受控组件更方便快捷，代码量小，但是控制能力比较弱。受控组件的控制能力强，但是代码量会比较多，在开发中应该权衡需求，进度进行相应的选择。

## HOOK

> Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。
> Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

### HOOK 的优势

- 使用自定义 HOOK 可以在无需修改组件结构的情况下复用状态逻辑
- 相比 class component， HOOK 更加简单
  - class component 生命周期函数混杂
  - class component 状态复杂
- class 相比 function 更加复杂
- 副作用容易实现关注点分离

### HOOK 规则

#### 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

#### 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

✅ 在 React 的函数组件中调用 Hook
✅ 在自定义 Hook 中调用其他 Hook

### HOOK API

- State Hook
- Effect Hook
  > 可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
  - useEffect 可以在组件渲染后实现各种不同的副作用。有些副作用可能需要清除，所以需要返回一个函数。effect 在每次渲染的时候都会执行，这就是为什么 React 会在**执行当前 effect 之前对上一个 effect 进行清除**
  - 可以使用多个 effect。这会将不相关逻辑分离到不同的 effect 中，实现关注点分离
  - 可以传入第二个可选参数，跳过 effect 调用进行性能优化
  - 传给 useEffect 的函数会延迟调用
- useMemo
  > 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。
- useCallback
  > useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

:::warning
useCallback, useMemo 只能作为性能优化的手段, react 并不能保证使用之后一定符合预期，他们本质上是为了解决子组件传值时过度重新渲染的问题。
::: -->
