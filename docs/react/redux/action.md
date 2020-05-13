## Action
Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。  
### 一个简单的 Action
```js
export const CHANGE_DATA = 'CHANGE_DATA';
{
   type: CHANGE_DATA,
   value
}
```

## ActionTypes
Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
```js
import { ADD_TODO, REMOVE_TODO } from '../actionTypes'
```

## ActionCreators
为了更便于维护，我们推荐使用 ActionCreators 统一地创建 Actions。
在 Redux 中的 ActionCreators 只是简单的返回一个 action:
```js
import {
   CHANGE_DATA
} from './actionTypes'

export const getDataAction = value => ({
   type: CHANGE_DATA,
   value
})
```
这样做将使 action 创建函数更容易被移植和测试。  

Redux 中只需把 ActionCreators 的结果传给 dispatch() 方法即可发起一次 dispatch 过程。
```js
store.dispatch(getDataAction(Math.ceil(Math.random()*10)));
```

## 参考资料
[Actions](https://redux.js.org/basics/actions)