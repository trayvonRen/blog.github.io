## axios 封装

 一般我会在项目的 src 目录中，新建一个 utils 文件夹，然后在里面新建一个 http 文件夹，里面有 index.js 用来统一封装 axios，config.js 用来设置 axios 默认配置。

**index.js:**

```js
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
// import router from '../../router'
// import store from '../../store'
import config from './config'
import { Message } from 'element-ui'

/**
 * 提示函数
 */
const tip = msg => {
  Message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}

/**
 * 请求失败后的错误统一处理
 * 根据业务需求决定具体的处理方式
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 401:
      tip('请求的401')
      break
    case 403:
      tip('请求的403')
      break
    case 404:
      tip('请求的404')
      break
    default:
      tip('????')
  }
}

// 创建axios实例
var instance = axios.create(config)

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  // 请求失败
  error => {
    const {
      response
    } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        tip('当前断网，请检查网络环境或者 DNS 解析是否存在问题！')
      } else {
        return Promise.reject(error)
      }
    }
  })

export default instance

```

**config.js**

```js
/**
 * 默认的 axios 设置
 */
export default {
  // 请求头信息
  headers: {
    'Content-Type': 'application/json ;charset=UTF-8'
  },
  // 设置超时时间
  timeout: 10 * 1000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}

```



## 模块化统一管理 api 接口

在项目的 src 目录中，新建一个 api 文件夹，里面 index.js 用来导出所有的接口，base.js 用来管理域名列表， 其他 js 则用来管理各个模块的接口，下面有一个 main 模块管理接口的示例

**index.js**

```js
/**
 * api接口的统一出口
 */

import main from '@/api/main'
// 其他模块的接口……

// 导出接口
export default {
  main
}
```

**base.js**

```js
/**
 * 接口域名的管理
 */
const base = {
  main: 'http://39.107.142.107:3000/mock/25'
}

export default base
```

**main.js**

```js
/**
 * main 模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/utils/http' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块

const main = {
  // 示例
  getData: () => axios.get(`${base.main}/getText`),
  postData: data => axios.post(`${base.main}/testPost`, data)
}

export default main
```



##  使用示例

```js
import api from './api'	
Vue.prototype.$api = api



    this.$api.main.getData().then(res => {
      console.log(res)
    })
    this.$api.main
      .postData({
        name: '任崇伟',
        id: 123123
      })
      .then(res => {
        console.log(res)
      })
```

## 总结 

-  模块化管理多个域名之下的接口，可以防止多人开发的命名冲突
- 统一封装 axios ，可以进行请求和响应的拦截，也可以统一处理断网等其他错误情况

## 参考资料
[vue 中 Axios 的封装和 API 接口的管理](https://juejin.im/post/5b55c118f265da0f6f1aa354#heading-10)  
[axios 中文网](http://www.axios-js.com/)