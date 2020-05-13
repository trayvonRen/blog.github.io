## Reducer
Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。  
**简而言之，Reducer 用于计算新的 State。**
## 初始 state
Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。  
```js
const defaultState = {
   data: 'this is data'
}
```

## 处理 Action
可以根据 actionType 来处理多个不同的 action。

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
      ...
      default:
         return state
   }
}
```
reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
**保持 reducer 纯净非常重要**，永远不要在 reducer 里做这些操作：
- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 Date.now() 或 Math.random()。

## 拆分 & 合并 Reducer
把不同的 reducers 拆分至多个文件, 并使用 combineReducers 来将 reducers 合并至同一个 state 树中。 
```js
import { combineReducers } from 'redux';
import content from './content';
import title from './title';

const rootReducer = combineReducers({
   content,
   title
})

export default rootReducer;
```

## 参考资料
[Reducers](https://redux.js.org/basics/reducers)