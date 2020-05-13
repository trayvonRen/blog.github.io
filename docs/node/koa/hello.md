```js
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
   ctx.body = 'hello word'
})

app.listen(300)
```