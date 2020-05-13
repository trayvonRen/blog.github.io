`koa` 的参数验证中间件

## 安装
```shell
npm install koa-parameter --save
```

## 使用
```js
const Koa = require('koa');
const parameter = require('koa-parameter');
 
const app = new Koa();

app.use(parameter(app));  // also add a middleware to catch the error.

app.use(async function (ctx) {
  ctx.verifyParams({
    name: {type: 'string', require: true}
  });
});
```
对于不正确的参数，会直接抛出异常
```json
{
    "message": "Validation Failed",
    "errors": [
        {
            "message": "required",
            "field": "name",
            "code": "missing_field"
        }
    ],
    "params": {
        "id": "5e82e69756941a2d28ad2ce3"
    }
}
```