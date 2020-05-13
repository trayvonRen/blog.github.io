## koa-router
在 koa 中使用的路由中间件

## 安装
```
npm install koa-router
```

## 使用
```js
var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

## 使用方法
### router.get|put|post|patch|delete|del ⇒ Router
使用 `router.verb()` 进行路由方法的匹配，路由方法可以是所有合法的 `http` 请求方法  
`router.all()` 可以匹配所有的方法
```js
router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', (ctx, next) => {
    // ...
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
```

### URL parameters
可以使用 `ctx.params` 捕获 `URL parameters`
```js
router.get('/:category/:title', (ctx, next) => {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});
``` 

### Nested routers(嵌套路由)
```js
var forums = new Router();
var posts = new Router();

posts.get('/', (ctx, next) => {...});
posts.get('/:pid', (ctx, next) => {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

### Router prefixes(路由前缀)
可以根据需要生成路由前缀  
```js
var router = new Router({
  prefix: '/users'
});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

### Multiple middleware(多中间件)
```js
router.get(
  '/users/:id',
  (ctx, next) => {
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      next();
    });
  },
  ctx => {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

### router.allowedMethods([options]) ⇒ function
- 响应 `OPTIONS` 请求，在响应头 `Allow` 添加相应的方法 
- 返回 `405 Method Not Allowed` 和 `501 Not Implemented`
```js
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());
```



## 参考资料
[Github: koa-router](https://github.com/ZijianHe/koa-router)