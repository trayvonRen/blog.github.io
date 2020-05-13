## koa-bodyparser
`koa` 的 `body` 解析器，支持 `json`、 `form`、 `text` 格式  
## 安装  
```shell
npm i koa-bodyparser -S
```
## 用法
```js
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
```
## 参考资料
[GitHub: koa-parser](https://github.com/koajs/bodyparser)