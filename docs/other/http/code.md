## 1xx

信息响应

## 2xx

请求成功

### 200 OK

请求成功。

### 204 No Content

服务器成功处理了请求，但不需要返回任何实体内容。

## 3xx

重定向

### 301 Moved Permanently

被请求的资源已永久移动到新位置。

在使用 nginx 反向代理的时候，会把 http 的请求全部代理为 https  
这时候就会返回 `301 Moved Permanently`

### 304 Not Modified

文档的内容（自上次访问以来或者根据请求的条件）并没有改变。

## 4xx

客户端错误

### 400 Bad Request

- 1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。
- 2、请求参数有误。

### 401 Unauthorized

当前请求需要用户验证。

### 403 Forbidden

服务器已经理解请求，但是拒绝执行它。

### 404 Not Found

请求失败，请求所希望得到的资源未被在服务器上发现。

### 405 Method Not Allowed

请求行中指定的请求方法不能被用于请求相应的资源。

## 5xx

服务器端错误

### 500 Internal Server Error

服务器遇到了不知道如何处理的情况。

## 参考资料

[MDN: HTTP 响应代码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
