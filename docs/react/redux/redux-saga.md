redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。  

可以想像为，一个 saga 就像是应用程序中一个单独的线程，它独自负责处理副作用。 redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。  

你可能已经用了 redux-thunk 来处理数据的读取。不同于 redux thunk，你不会再遇到回调地狱了，你可以很容易地测试异步流程并保持你的 action 是干净的。  

![](/img/react/saga.jpg)  

## Action  
使用 ActionCreator 创建 Action。dispatch 这个 Action 会发起异步请求。
```js
import {
   GET_DATA_REQUEST
} from './actionTypes';

export function fetchData() {
   return {
      type: GET_DATA_REQUEST,
   }
}
```  
## Sage  
我们将创建一个 Saga 来监听所有的 GET_DATA_REQUEST Action，并触发一个 API 调用获取用户数据。
```js
import {
   call,
   put,
   takeLatest,
   all
} from 'redux-saga/effects';

import {
   GET_DATA_REQUEST,
   GET_DATA_SUCCESS,
   GET_DATA_FAILURE
} from '../actions/actionTypes';

export function* title() {
   try {
      const data = yield call(url => fetch(url).then(response => response.json()), `http://39.107.142.107:3000/mock/102/api`);
      yield put({
         type: GET_DATA_SUCCESS,
         data
      });
   } catch (error) {
      yield put({
         type: GET_DATA_FAILURE,
      });
   }
}

export default function* root() {
   yield all([
      takeLatest(GET_DATA_REQUEST, title),
   ]);
}
```
- `takeLatest` 会监听最新一次的 `GET_DATA_REQUEST` Action，并执行 title 函数。
- 在 title 函数中，首先会发起 ajax 请求。请求成功时触发 `GET_DATA_SUCCESS` Action，请求失败时触发 `GET_DATA_FAILURE` Action, 进入正常的 Reducer 流程。

## Reducer
```js
import {
   GET_DATA_SUCCESS,
   GET_DATA_FAILURE
} from '../actions/actionTypes'

const defaultState = {
   isSuccess: false,
   title: 'this is title'
}

export default (state = defaultState, action) => {
   switch (action.type) {
      case GET_DATA_SUCCESS:
         return {...action.data,isSuccess: true};
      case GET_DATA_FAILURE:
         return {...state,isSuccess: false};
      default:
         return state
   }
}
```

## 参考资料
[redux-saga](https://redux-saga.js.org/)