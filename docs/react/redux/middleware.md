## 中间件
![](/img/react/dataFlow.png)  
在 React 中，中间件就是一个函数，对 `store.dispatch` 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。  
一般而言，使用 React 中间件是用来处理副作用，最常见的就是 ajax 请求。  

## applyMiddleware(...middleware)  
使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。Middleware 可以让你包装 store 的 dispatch 方法来达到你想要的目的。  
```js
import {
   createStore,
   applyMiddleware,
   compose
} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
   applyMiddleware(ReduxThunk)
));
export default store;
```

## 参考资料
[applyMiddleware(...middleware)](https://redux.js.org/api/applymiddleware)