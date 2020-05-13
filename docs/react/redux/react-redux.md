## React Redux
这里需要再强调一下：Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。  
Redux 官方提供的 React 绑定库， 简化了 redux 中的 Api，将 redux 更加灵活而高效的融合到 react 中。
## Provider
Provider 使组件层级中的 connect() 方法都能够获得 Redux store。正常情况下，你的根组件应该嵌套在 Provider 中才能使用 connect() 方法。
```js
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

## connect()
`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`  
连接 React 组件与 Redux store。  
连接操作不会改变原来的组件类。  
反而返回一个新的已与 Redux store 连接的组件类。  

#### mapStateToProps
如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。
```js
function mapStateToProps(state) {
  return { data: state.data }
}
```

#### mapDispatchToProps  
如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
```js
import { changeTitle, changeContent } from './redux/actionCreators';

const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    changeTitle: () => {
      dispatch(changeTitle('new title'));
    },
    changeContent: () => {
      dispatch(changeContent('new content'));
    }
  };
}
```
如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。
```js
import { changeTitle, changeContent } from './redux/actionCreators';

const mapDispatchToProps = {
  changeTitle: changeTitle,
  changeContent: changeContent
}
```
## 完整代码
```jsx
import React from 'react';
import { connect } from 'react-redux';
import { changeTitle, changeContent } from './redux/actionCreators';

class App extends React.Component {

  render() {
    return (
      <div>
        <h1 onClick={() => this.props.changeTitle('new title')}>{this.props.title}</h1>
        <div onClick={() => this.props.changeContent('new content')}>{this.props.content}</div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    content: state.content.content,
    title: state.title.title
  }
}

const mapDispatchToProps = {
  changeTitle: changeTitle,
  changeContent: changeContent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```