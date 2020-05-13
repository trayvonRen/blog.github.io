## Request
Koa Request 对象是在 node 的 原生请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。  

## Api  
### request.header   
请求头对象。这与 node http.IncomingMessage 上的 headers 字段相同  
### request.header=
设置请求头对象。
### request.method
请求方法。
### request.method=
设置请求方法，对于实现诸如 methodOverride() 的中间件是有用的。 
### request.url
获取请求 URL.
### request.url=
设置请求 URL, 对 url 重写有用。 
### request.originalUrl
获取请求原始URL。  
### request.querystring
根据 ? 获取原始查询字符串.  
### request.querystring=
设置原始查询字符串。

