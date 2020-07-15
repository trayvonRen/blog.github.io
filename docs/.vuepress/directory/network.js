module.exports = [
  {
    title: '浏览器', // 必要的
    path: '/network/browser/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/browser/service.md', 'Service Worker'],
      ['/network/browser/cache.md', '浏览器文件缓存'],
      ['/network/browser/storage.md', 'Web Storage & Cookie'],
      // ['/algorithm/base/series.md', '递归类算法'],
    ],
  },
  {
    title: 'http', // 必要的
    path: '/network/http/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/http/Evolution_of_HTTP.md', 'http 发展'],
      ['/network/http/url.md', 'URI & URL & URN'],
      ['/network/http/mime.md', 'MIME 类型'],
      ['/network/http/message.md', 'http 报文'],
      ['/network/http/header.md', 'http 请求头'],
      ['/network/http/method.md', 'http 请求方法'],
      ['/network/http/code.md', 'http 状态码'],
      ['/network/http/cors.md', 'HTTP访问控制（CORS）'],
    ],
  },
  {
    title: 'websocket', // 必要的
    path: '/network/websocket/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/websocket/client.md', '客户端'],
      ['/network/websocket/ws.md', 'node: ws'],
    ],
  },
  {
    title: 'REST', // 必要的
    path: '/network/REST/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/REST/api.md', 'RESTful API'],
      // ['/network/REST/res.md', 'RESTful API 响应模板']
    ],
  },
  {
    title: 'web 安全', // 必要的
    path: '/network/security/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/security/cryptography.md', 'HTTPS 加密原理'],
      ['/network/security/session.md', 'Session'],
      ['/network/security/token.md', 'Token'],
      ['/network/security/xsrf.md', 'xsrf'],

      // ['/algorithm/base/series.md', '递归类算法'],
    ],
  },
  {
    title: '前端跨域', // 必要的
    path: '/network/cors/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/network/cors/cors.md', 'CORS'],
      // ['/algorithm/base/series.md', '递归类算法'],
    ],
  },
]
