## 处理 http 请求
```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

以上代码会监听 3000 端口，并设置 
- 响应状态码`200` 
- 响应头 `Content-Type: text/plain` 
- 响应体 `Hello World` 

