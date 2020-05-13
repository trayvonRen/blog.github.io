## RESTful API
符合 REST 设计风格的 Web API 称为 RESTful API。

#### 组成
- 对资源的操作：Web服务在该资源上所支持的一系列请求方法（比如：POST，GET，PUT或DELETE）。
- 直观简短的资源地址：URI，比如：http://example.com/resources。
- 传输的资源：Web服务接受与返回的互联网媒体类型，比如：JSON，XML，YAML等。
```
POST /repos/:owner/:repo/branches/:branch/protection/required_signatures
```
#### 路径设置的要求
- 资源名使用复数
- 资源名使用名词
- 路径内不带特殊字符
- 避免多级URL

#### 参数传递方式
- **query string parameter**   
在 url 中使用查询字符串  
一般用于 GET 请求，添加**额外的可选的**查询条件
```
GET /users?param1=1&param2=2
```

- **body**  
在请求体中，发送数据  
一般用于 POST, PATCH, PUT, and DELETE 请求。

- **URL parameters**  
使用 `path segment` 传递参数    
一般用于传递**必须的参数**，且该参数可以看成子路径的父级  
在生产中，可以使用这一特性生成或者重命名逻辑相关的 `URLS`  
```
PUT /repos/:owner/:repo/branches/:branch/protection/restrictions/teams
```

## 范例
以下范例均来自 [GitHub REST API v3](https://developer.github.com/v3/)
### GET
```
GET /users
GET /users/:username
GET /users/:username/hovercard
```
### POST
```
POST /repos/:owner/:repo/branches/:branch/protection/required_signatures
```

### PUT
```
PUT /repos/:owner/:repo/branches/:branch/protection/restrictions/teams
```

### DELETE
```
DELETE /repositories/:repository_id/comments/:comment_id/reactions/:reaction_id
```
<!-- 
## 响应设计规范   -->
