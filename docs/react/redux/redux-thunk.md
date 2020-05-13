`Redux Thunk` 用于处理 React 中的异步操作。
## 同步 Action  
当调用异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻（也可能是超时）。

这两个时刻都可能会更改应用的 state；为此，你需要 dispatch 普通的同步 action。一般情况下，每个 API 请求都需要 dispatch 至少三种 action：
- 一种通知 reducer 请求开始的 action。  
```js
export function requestPosts(subreddit) {
   return {
      type: REQUEST_POSTS
   }
}
```
- 一种通知 reducer 请求成功的 action。
```js
export function receivePosts(json) {
   return {
      type: RECEIVE_POSTS,
      receivedAt: Date.now(),
      json
   }
}
```
- 一种通知 reducer 请求失败的 action。

## State 
除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。  
- isFetching表示是否在抓取数据
- didInvalidate表示数据是否过时
- lastUpdated表示上一次更新时间
```js
const defaultState = {
   isFetching: false,
   didInvalidate: false,
   lastUpdated: '',
   title: 'this is title'
}
```

## 异步 Action
现在，整个异步操作的思路就很清楚了。  
- 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
- 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染  

如何把之前定义的同步 `actionCreator` 和网络请求结合起来呢？标准的做法是使用 `Redux Thunk` 中间件，创建异步的 Action。

通过使用`Redux Thunk`，`actionCreator` 除了返回 action 对象外还可以返回函数。这时，这个 `actionCreator` 就成为了 thunk。  
当  `actionCreator` 返回函数时，这个函数会被 `Redux Thunk` middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。
```js
export function fetchPosts(subreddit) {
   return dispatch => {
      dispatch(requestPosts())
      return fetch(`http://39.107.142.107:3000/mock/102/api`)
         .then(response => response.json())
         .then(json => dispatch(receivePosts(json)))
   }
}
```
上面代码中，有几个地方需要注意。
- fetchPosts返回了一个函数。
- 返回的函数的参数是 `dispatch` 和 `getState` 这两个 Redux 方法。
- 在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。
- 异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。  

## Reducer
```js
import {
   REQUEST_POSTS,
   RECEIVE_POSTS
} from '../actionTypes'

const defaultState = {
   isFetching: false,
   didInvalidate: false,
   lastUpdated: '',
   title: 'this is title'
}

export default (state = defaultState, action) => {
   switch (action.type) {
      case REQUEST_POSTS:
         return Object.assign({}, state, {
            isFetching: true
         })
      case RECEIVE_POSTS:
         return Object.assign({}, state, {
            isFetching: false,
            lastUpdated: action.receivedAt,
            title: action.json.title
         })
      default:
         return state
   }
}
```
## 数据流
![](/img/react/dataFlow.png)  


## 参考资料
[Redux 入门教程（二）：中间件与异步操作](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)  
[Async Actions](https://redux.js.org/advanced/async-actions)