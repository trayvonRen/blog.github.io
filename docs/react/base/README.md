## 专注视图层

React 不是完整的 MVC/MVVM 框架，它只提供 m -> v 的解决方案。他以 Minimal API Interface 为目标，只提供很少的 API。

### 函数式编程

### 组件化

React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。

```js
data = state + props
UI = fn(data)
```

## 单向数据流

### Immutable State

不能直接修改 state，否则会不会触发重新渲染，必须使用 setState。

### Props

组件可以选择把它的 state 作为 props 向下传递到它的子组件中，但是子组件不能修改 props。

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

## 虚拟 DOM

避免大量的数据操作，把真实的 Dom 对象还原成 Fiber Node，生成一颗 Fiber Tree。
每次数据更新后，重新计算 Fiber Tree，对发生变化的部分进行更新，最后再修改真实的 DOM。

## 参考资料

[React](https://zh-hans.reactjs.org/)
