## 创建静态资源服务器
```js
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
   // 解析请求路径
   var pathname = __dirname + decodeURI(request.url)

   // 跳转默认页面
   if (pathname === __dirname + '/') {
      pathname = __dirname + "/index.html";
   }
   fs.exists(pathname, exists => {
      if (exists) {
         readFileBySuffixName(pathname, fs, request, response);
      } else {
         console.log(pathname + "文件不存在！");
         response.writeHead(404, {
            "Content-Type": "text/plain;charset=utf-8"
         });
         response.end(path.basename(pathname) + "\n文件不存在！");
      }
   });
}).listen(80);

console.log('web服务已运行！');

const readFileBySuffixName = (pathname, fs, request, response) => {

   //取得后缀名
   var ext = path.extname(pathname);
   switch (ext) {
      //根据后缀名读取相应的文件，设置响应头，并发送到客户端
      //jpg、gif、png、jpeg后缀的图片
      case ".jpg":
      case ".gif":
      case ".png":
      case ".jpeg":
         //二进制读取文件
         fs.readFile(pathname, 'binary', (err, data) => {
            if (err) console.error(err.stack);
            response.writeHead(200, {
               "Content-Type": {
                  ".jpg": "image/jpeg",
                  ".gif": "image/gif",
                  ".png": "image/png",
                  ".jpeg": "image/jpeg",
               } [ext]
            });

            response.on('error', err => {
               console.error(err.stack);
            });

            //发送二进制数据
            response.write(data, 'binary');
            response.end();
         });
         break;
      case ".html":
         fs.readFile(pathname, 'utf-8', (err, data) => {
            if (err) console.error(err.stack);;
            response.writeHead(200, {
               "Content-Type": "text/html"
            });

            response.on('error', err => {
               console.error(err.stack);
            });

            response.write(data);
            response.end();
         });
         break;
      case ".css":
         fs.readFile(pathname, 'utf-8', (err, data) => {
            if (err) console.error(err.stack);;
            response.writeHead(200, {
               "Content-Type": "text/css"
            });

            response.on('error', err => {
               console.error(err.stack);
            });

            response.write(data);
            response.end();
         });
         break;
      default:
         fs.readFile(pathname, 'utf-8', (err, data) => {
            if (err) console.error(err.stack);;
            response.writeHead(200, {
               "Content-Type": "text/html"
            });

            response.on('error', err => {
               console.error(err.stack);
            });

            response.write(data);
            response.end();
         });
   }
}
```

### 使用 MiME 模块简化代码
```js
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require("mime");

http.createServer((request, response) => {
   // 解析请求路径
   var pathname = __dirname + decodeURI(request.url)
   // 跳转默认页面
   if (pathname === __dirname + '/') {
      pathname = __dirname + "/index.html";
   }

   fs.exists(pathname, exists => {
      // 如何资源存在，返回请求的资源
      if (exists) {
         fs.readFile(pathname, (err, data) => {
            if (err) console.error(err.stack);
            response.writeHead(200, {
               "Content-Type": mime.getType(pathname)
            });

            response.on('error', err => {
               console.error(err.stack);
            });

            response.write(data);
            response.end();
         });
         // 如何资源不存在，返回 404
      } else {
         response.writeHead(404, {
            "Content-Type": "text/plain;charset=utf-8"
         });
         response.end(path.basename(pathname) + "\n文件不存在！");
      }
   });
}).listen(80);

console.log('server is listening on 80 port!');
```