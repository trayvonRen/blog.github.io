HTTP 消息头允许客户端和服务器通过 request和 response传递附加信息。  
一个请求头由名称（不区分大小写）后跟一个冒号“：”，冒号后跟具体的值（不带换行符）组成。该值前面的引导空白会被忽略。

## headers 分类
- General headers(通用首部字段)    
同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
- Request headers(请求首部字段)  
包含更多有关要获取的资源或客户端本身信息的消息头。  
- Response headers(响应首部字段)  
包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
- Entity headers(实体首部字段)  
包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。

## Request header
#### Accept 
用户代理期望的 MIME 类型列表  
#### Accept-Charset
列出用户代理支持的字符集  
#### Accept-Language
列出用户代理期望的页面语言
#### Accept-Encoding
列出用户代理支持的压缩方法    

**具体使用方法请查看：[MDN: 内容协商](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Content_negotiation)**

## Response headers
#### Access-Control-Allow-Origin
指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。
#### Access-Control-Allow-Credentials
表示是否请求可以使用credentials
#### Access-Control-Allow-Methods
用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。
#### Access-Control-Allow-Headers
其指明了实际请求中允许携带的首部字段。
#### Set-Cookie
用来由服务器端向客户端发送 cookie  



## Entity headers
#### Content-Type
Content-Type 实体头部用于指示资源的MIME类型 media type 。  
在请求中 (如POST 或 PUT)，客户端告诉服务器实际发送的数据类型。  
在响应中，Content-Type标头告诉客户端实际返回的内容的内容类型。  