**严格的单向数据流是 Redux 架构的设计核心。**  
Redux 应用中数据的生命周期遵循下面 4 个步骤
![](/img/react/reduxFlow.png)

## 调用 store.dispatch(action)。
要想更新 state 中的数据，你需要发起一个 action。  
Action 就是一个普通 JavaScript 对象。
```js
const action = { type: 'LIKE_ARTICLE', articleId: 42 };
store.dispatch(action);
```
如果想要在 dispatch 时传递参数，可以使用 ActionCreators 来返回 action
```js
export const getDataAction = value => ({
   type: CHANGE_DATA,
   value
})

store.dispatch(getDataAction(Math.ceil(Math.random()*10)));
```
你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。
## reducer 处理 action
Store 会把两个参数传入 reducer： 当前的 state 树和 将要处理的 action。
```js
import {
   CHANGE_DATA
} from './actionTypes'

const defaultState = {
   data: 'this is data'
}

export default (state = defaultState, action) => {
   switch (action.type) {
      case CHANGE_DATA:
         return Object.assign({}, state, {
            data: action.value
         })
      default:
         return state
   }
}
```
注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

## 合并 reducer 
根 reducer 的结构完全由你决定。Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。
```js
 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
```

## 更新 state
reducer 处理完 action 之后，就会交给 store 来更新 state。  
state 更新完毕之后，所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state。  
一般而言，会使用 store.subscribe(listener) 获取新的 state 数据  
```js
 constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);

    this.state = store.getState();
    store.subscribe(this.handleStateChange);
  }

  handleStateChange() {
    this.setState(
      store.getState()
    )
  }
```
## 参考资料
[Data Flow](https://redux.js.org/basics/data-flow)