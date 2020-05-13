## Store
Store 就是把 reducers 和 action 联系到一起的对象。Store 有以下职责：  
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。  

Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。  

## 创建 Store
根据已有的 reducer 来创建 store 是非常容易的。  
```js
import {
   createStore
} from 'redux';
import reducer from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
```
```js
import {
   createStore
} from 'redux';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
   applyMiddleware(ReduxThunk)
));
export default store;
```

## getState
返回应用当前的 state 树。
它与 store 的最后一个 reducer 返回值相同。  
```js
this.state = store.getState();
```

## dispatch(action)
分发 action。这是触发 state 变化的惟一途径。
```js
store.dispatch(createData('new data'));

export const createData = value => ({
   type: CHANGE_DATA,
   value
})
```

## subscribe(listener)
添加一个变化监听器。每当 dispatch action 的时候就会执行，state 树中的一部分可能已经变化。你可以在回调函数里调用 getState() 来拿到当前 state。 

```js
store.subscribe(this.handleStateChange);  

handleStateChange() {
   this.setState(
   store.getState()
   )
}
```
## 参考资料
[Store](https://redux.js.org/basics/store)