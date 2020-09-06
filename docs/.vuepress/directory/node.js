module.exports = [
  {
    title: 'npm', // 必要的
    path: '/node/npm/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/node/npm/npmcli.md', '常用命令'],
      ['/node/npm/package.md', 'package.json'],
      // ['/algorithm/base/series.md', '递归类算法'],
    ],
  },
  {
    title: 'node 基础', // 必要的
    path: '/node/node/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/node/node/web.md', 'hello word'],
      ['/node/node/server.md', '搭建静态资源服务器'],
      ['/node/node/event.md', 'node 核心概念 事件'],
    ],
  },
  {
    title: 'node 核心模块', // 必要的
    path: '/node/module/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/node/module/http.md', 'http'],
      ['/node/module/fs.md', 'fs'],
      ['/node/module/url.md', 'url'],
      ['/node/module/path.md', 'path'],
    ],
  },
  {
    title: 'Koa', // 必要的
    path: '/node/koa/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/node/koa/hello.md', 'hello word'],
      ['/node/koa/context.md', 'koa 核心概念：上下文'],
      ['/node/koa/request.md', 'koa 核心概念：Request'],
      ['/node/koa/response.md', 'koa 核心概念：Response'],
      ['/node/koa/middleware.md', 'koa 核心概念：中间件'],
      ['/node/koa/router.md', '中间件: koa-router'],
      ['/node/koa/bodyparser.md', '中间件: koa-bodyparser'],
      ['/node/koa/cross-env.md', '中间件: cross-env'],
      ['/node/koa/koa-json-error.md', '中间件: koa-json-error'],
      ['/node/koa/koa-parameter.md', '中间件: koa-parameter'],
    ],
  },
]
