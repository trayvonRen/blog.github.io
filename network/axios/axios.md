## 核心功能
利用 Promise 特性，发送 ajax 请求
- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求

使用方法
- 直接传递 config 
```js
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

- 传递 url + config
```js
axios(
    url: '/user/12345', {
        method: 'post',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }
    });
```

- 使用方法别名
```js
axios.get('url')
        .then(res => {
            console.log(res)
        })

```
**[关于核心功能的源码分析](./core.md)**