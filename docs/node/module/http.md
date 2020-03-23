## http.createServer()
**http.createServer([options][, requestListener])**  
任何网络服务应用程序总是要先创建一个服务对象。这在 Node.js 中通常通过 createServer 方法。

```js
const http = require('http');

const server = http.createServer((request, response) => {
  // magic happens here!
});
```

每当有 HTTP 请求到达服务器时，createServer 中传入的函数就被自动执行。所以这个函数也被称为是请求处理函数。实际上，由 createServer 构造函数返回的 Server 对象是一个 EventEmitter，我们在这里仅是对创建 server 和对它添加监听事件进行了简化处理。
```js
const server = http.createServer();
server.on('request', (request, response) => {
  // the same kind of magic happens here!
});
```
**两者等价**

当一个 HTTP 到达服务端，node 调用 request 处理程序，并产生一些唾手可得的对象用以处理传输，这些对象就是 request 和 response。  

实际上，为了处理请求，listen 方法需要在 server 对象上被显式调用。  
在大多数情况下，你只要把端口号作为参数传入 listen 方法中，作为监听端口即可。  
当然也有一些其它选项，具体可以参考 API 参考文档。
```js
http.createServer((request, response) => {
}).listen(8080);
```

## 方法、访问地址以及请求头

当处理一个请求时，第一件事你需要做的是看一下这个方法和其访问地址，以此决定你到底采取何种合理的行为。    
Node.js 通过把这些行为属性附加到 request 对象上，使得我们处理起来相对而言可以轻松一些。  
```js
const { method, url } = request;
```

请求头也不是很难得到，它们也在 request 对象里，称为 headers。
```js
const { headers } = request;
const userAgent = headers['user-agent'];
```

## 请求体
当接受到了一个 POST 或者 PUT 请求时，请求体对于你的应用程序非常重要。  
相对于访问请求 头而言，获取请求体有些麻烦。传入请求对象的 request 其实实现了 `ReadableStream` 接口， 这个信息流可以被监听，或者与其它流进行对接。  我们可以通过监听 'data' 和 'end' 事件从而把 数据给取出来。  
每次在 'data' 事件中触发抓获的数据块是一个 Buffer。  
如果你已知是一个字符串对象，那么 最好的方案就是把这些数据收集到一个数组中，然后在 'end' 事件中拼接并且把它转化为字符串。  
```js
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

## HTTP 状态码
返回客户端的默认状态码总是 200。  
当然，不是每个 HTTP 返回码必须都是 200，在某些情况下你一定希望返回一个不同的状态码，所以你应该设置 statusCode 属性。  
```js
response.statusCode = 404; // Tell the client that the resource wasn't found.
```

## 设置响应头
响应头通过一个 setHeader 的属性很方便的设置。
```js
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

## 发送返回体
既然 response 对象是一个 WritableStream，向客户端写入返回体只是一个普通的流方法的问题。
```js
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```
消息流上的 end 方法同时还可以带入一些可选数据作为流上最后需要发送的一些数据，所以我们可以简单地把以上的代码做如下形式的简化：
```js
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

