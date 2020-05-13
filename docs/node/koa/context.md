## Context 
Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。  
**通过加工这个对象，就可以控制返回给用户的内容。**

## Api
### ctx.req
Node 的 request 对象.
### ctx.res
Node 的 response 对象.
::: danger 注意
绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：
- res.statusCode
- res.writeHead()
- res.write()
- res.end()
:::