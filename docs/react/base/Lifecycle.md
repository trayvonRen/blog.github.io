## 组件的生命周期
每个组件都包含“生命周期方法”，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。
![](/img/react/lifecycle.png)

## 挂载
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()  
- static getDerivedStateFromProps()  
- render()  
- componentDidMount()  

## 更新
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：  

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()  

## 卸载
当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()

## 错误处理
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- static getDerivedStateFromError()
- componentDidCatch()
