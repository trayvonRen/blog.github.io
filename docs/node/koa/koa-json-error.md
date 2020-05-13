## koa 自带的错误处理
### 404 错误
对于一个没有定义的路由，会直接返回 `Not Found` 文本，并且响应状态码为 `404`

### 405 错误
如果使用了错误的请求方法，会直接返回 `Method Not Allowed` 文本，并且响应状态码为 `405`

### 500 错误
如果程序中出现一个没有捕获的语法错误，那么 koa 会自行捕获该错误，直接返回 `Internal Server Error`，并且把状态码设置为 `500`
### 使用 ctx.throw  
可以使用 ctx.throw 抛出错误，这样 koa 会根据传入的状态码做出适当的响应  
```js
ctx.throw(400);
// Bad Request
```
默认的响应文本
```js
100 "continue"
101 "switching protocols"
102 "processing"
200 "ok"
201 "created"
202 "accepted"
203 "non-authoritative information"
204 "no content"
205 "reset content"
206 "partial content"
207 "multi-status"
208 "already reported"
226 "im used"
300 "multiple choices"
301 "moved permanently"
302 "found"
303 "see other"
304 "not modified"
305 "use proxy"
307 "temporary redirect"
308 "permanent redirect"
400 "bad request"
401 "unauthorized"
402 "payment required"
403 "forbidden"
404 "not found"
405 "method not allowed"
406 "not acceptable"
407 "proxy authentication required"
408 "request timeout"
409 "conflict"
410 "gone"
411 "length required"
412 "precondition failed"
413 "payload too large"
414 "uri too long"
415 "unsupported media type"
416 "range not satisfiable"
417 "expectation failed"
418 "I'm a teapot"
422 "unprocessable entity"
423 "locked"
424 "failed dependency"
426 "upgrade required"
428 "precondition required"
429 "too many requests"
431 "request header fields too large"
500 "internal server error"
501 "not implemented"
502 "bad gateway"
503 "service unavailable"
504 "gateway timeout"
505 "http version not supported"
506 "variant also negotiates"
507 "insufficient storage"
508 "loop detected"
510 "not extended"
511 "network authentication required"
```
也可以自定义错误的响应文本
```js
ctx.throw(400, 'name required');
//name required
```

## koa-json-error
为 `koa` `json` 应用提供错误处理的中间件  
返回 `json` 格式的错误信息
### 安装
```shell
npm install --save koa-json-error
```
### 使用
```js
const koa = require('koa');
const error = require('koa-json-error')
 
let app = new Koa();
app.use(error())
```
在默认情况下，会返回如下的错误信息
```json
{
    "message": "Bad Request",  // 抛出的错误信息，默认为状态码信息
    "name": "BadRequestError", // 和错误状态码有关的错误名称
    "stack": "stack message",  // 错误的堆栈信息
    "status": 400             //  抛出的状态码
}
```

可以提供一个错误返回的格式
```js
function formatError(err) {
    return {
        // Copy some attributes from
        // the original error
        status: err.status,
        message: err.message,
 
        // ...or add some custom ones
        success: false,
        reason: 'Unexpected'
    }
}

app.use(error(formatError));
```
返回样例
```json
{
    "status": 400,
    "message": "message error",
    "success": false,
    "reason": "Unexpected"
}
```

## 参考资料
[npm: koa-json-error](https://www.npmjs.com/package/koa-json-error)