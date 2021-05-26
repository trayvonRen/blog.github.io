module.exports = [
  {
    title: 'node 基础',
    path: '/node/node/',
    collapsable: true,
    sidebarDepth: 2,
    children: [
      ['/node/node/web.md', 'hello word'],
      ['/node/node/server.md', '搭建静态资源服务器'],
      ['/node/node/event.md', 'node 核心概念 事件'],
    ],
  },
  {
    title: 'NestJs',
    path: '/node/nest/philosophy',
    collapsable: true,
    sidebarDepth: 2,
    children: [
      ['/node/nest/philosophy.md', '设计理念'],
      ['/node/nest/core.md', '核心概念'],
    ],
  },
  // {
  //   title: 'Koa',
  //   path: '/node/koa/',
  //   collapsable: true,
  //   sidebarDepth: 2,
  //   children: [
  //     ['/node/koa/hello.md', 'hello word'],
  //     ['/node/koa/context.md', 'koa 核心概念：上下文'],
  //     ['/node/koa/request.md', 'koa 核心概念：Request'],
  //     ['/node/koa/response.md', 'koa 核心概念：Response'],
  //     ['/node/koa/middleware.md', 'koa 核心概念：中间件'],
  //     ['/node/koa/router.md', '中间件: koa-router'],
  //     ['/node/koa/bodyparser.md', '中间件: koa-bodyparser'],
  //     ['/node/koa/cross-env.md', '中间件: cross-env'],
  //     ['/node/koa/koa-json-error.md', '中间件: koa-json-error'],
  //     ['/node/koa/koa-parameter.md', '中间件: koa-parameter'],
  //   ],
  // },
];
