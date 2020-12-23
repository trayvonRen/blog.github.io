module.exports = [
  {
    title: 'GIT', // 必要的
    path: '/engineering/git/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/engineering/git/base.md', 'Git 基础操作'],
      ['/engineering/git/core.md', 'Git 核心概念'],
      ['/engineering/git/commitGuide.md', 'commit 提交规范'],
      ['/engineering/git/ignore.md', 'gitignore'],
    ],
  },
  {
    title: 'Webpack', // 必要的
    path: '/engineering/webpack/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/engineering/webpack/commonjs.md', 'CommonJs / ES Module'],
      ['/engineering/webpack/loaders.md', 'Loader'],
      ['/engineering/webpack/plugins.md', 'Plugin'],
      ['/engineering/webpack/devServer.md', 'DevServer'],
      ['/engineering/webpack/devtool.md', 'Source Map'],
      ['/engineering/webpack/hmr.md', 'Hot Module Replacement'],
      ['/engineering/webpack/defaultconfig.md', '默认配置'],
      ['/engineering/webpack/resolve.md', '解析策略 resolve'],
      ['/engineering/webpack/webpackMerge.md', 'WebpackMerge'],
      ['/engineering/webpack/treeShaking.md', 'Tree shaking'],
      ['/engineering/webpack/codeSplitting.md', 'Code Splitting'],
      ['/engineering/webpack/csssplit.md', 'CSS Code Splitting'],
      ['/engineering/webpack/lazy.md', '懒加载'],
      ['/engineering/webpack/prefetch.md', 'prefetch preload'],
      ['/engineering/webpack/shimming.md', 'Shimming'],
      ['/engineering/webpack/performance.md', 'Webpack 打包性能优化'],
      ['/engineering/webpack/working.md', 'Webpack 打包速度优化'],
      ['/engineering/webpack/example.md', 'Webpack 打包实例'],
      ['/engineering/webpack/makeloader.md', '编写 Loader / Plugin'],
    ],
  },
  {
    title: '前端自动化测试', // 必要的
    path: '/engineering/test/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/engineering/test/jest.md', 'JEST'],
      ['/engineering/test/tdd.md', 'TDD'],
    ],
  },
  {
    title: 'Nginx', // 必要的
    path: '/engineering/nginx/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/engineering/nginx/proxy.md', '反向代理 / 正向代理'],
      ['/engineering/nginx/nginx.md', 'Nginx 简单配置'],
      ['/engineering/nginx/cors.md', 'Nginx 配置反向代理'],
    ],
  },
  // {
  //   title: '部署', // 必要的
  //   path: '/engineering/deploy/', // 可选的, 应该是一个绝对路径
  //   collapsable: true, // 可选的, 默认值是 true,
  //   sidebarDepth: 2, // 可选的, 默认值是 1
  //   children: [['/engineering/deploy/nginx.md', 'Nginx']],
  // },
]
