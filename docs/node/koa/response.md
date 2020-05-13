## Response
Koa Response 对象是在 node 的原生响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。  

## Api
### response.header
响应头对象。
### response.status
获取响应状态。默认情况下，response.status 设置为 404 而不是像 node 的 res.statusCode 那样默认为 200。  
### response.status=
通过数字代码设置响应状态
### response.message
获取响应的状态消息. 默认情况下, response.message 与 response.status 关联.  
### response.message=
将响应的状态消息设置为给定值。  
### response.body
获取响应主体。  
### response.body=
将响应体设置为以下之一：
- string 写入
- Buffer 写入
- Stream 管道
- Object || Array JSON-字符串化
- null 无内容响应

#### string
Content-Type 默认为 text/html 或 text/plain, 同时默认字符集是 utf-8。Content-Length 字段也是如此。  
#### Buffer
Content-Type 默认为 application/octet-stream, 并且 Content-Length 字段也是如此。
#### Stream
Content-Type 默认为 application/octet-stream。  
#### Object
Content-Type 默认为 application/json. 这包括普通的对象 { foo: 'bar' } 和数组 ['foo', 'bar']。