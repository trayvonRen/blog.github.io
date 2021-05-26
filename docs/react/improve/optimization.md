# TODO

## React.PureComponent

React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

:::warning
React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。你也可以考虑使用 immutable 对象加速嵌套数据的比较。

此外，React.PureComponent 中的 shouldComponentUpdate() 将跳过所有子组件树的 prop 更新。因此，请确保所有子组件也都是“纯”的组件。
:::

```jsx
import React from 'react';
import './App.css';

class Child extends React.PureComponent {
  componentDidUpdate() {
    console.log('child update');
  }
  render() {
    return <>{this.props.message}</>;
  }
}

class App extends React.Component {
  state = {
    childMessage: 'this is child',
    name: 12312,
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ name: this.state.name + 1 });
    }, 1000);
  }
  render() {
    return (
      <>
        <div>{this.state.name}</div>
        <Child message={this.state.childMessage}></Child>
      </>
    );
  }
}

export default App;
```

## React.memo

React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。

React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

```js
import React from 'react';
import './App.css';

const Child = React.memo((props) => {
  console.log('child update');
  return <>{props.message}</>;
});

class App extends React.Component {
  state = {
    childMessage: 'this is child',
    name: 12312,
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ name: this.state.name + 1 });
    }, 1000);
  }
  render() {
    return (
      <>
        <div>{this.state.name}</div>
        <Child message={this.state.childMessage}></Child>
      </>
    );
  }
}

export default App;
```

## shouldComponentUpdate()

根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。

我们不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

```js
import React from 'react';
import './App.css';

class Child extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.message === this.props.message) {
      return false;
    }

    return true;
  }
  componentDidUpdate() {
    console.log('child update');
  }
  render() {
    return <>{this.props.message}</>;
  }
}

class App extends React.Component {
  state = {
    childMessage: 'this is child',
    name: 12312,
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ name: this.state.name + 1 });
    }, 1000);
  }
  render() {
    return (
      <>
        <div>{this.state.name}</div>
        <Child message={this.state.childMessage}></Child>
      </>
    );
  }
}

export default App;
```

## 参考资料

[Optimizing Performance](https://zh-hans.reactjs.org/docs/optimizing-performance.html)
