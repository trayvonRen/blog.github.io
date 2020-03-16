module.exports = [{
   title: 'web 安全', // 必要的
   path: '/network/security/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/network/security/xsrf.md', 'xsrf'],
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}, {
   title: '前端跨域', // 必要的
   path: '/network/cors/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/network/cors/cors.md', 'CORS'],
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}]