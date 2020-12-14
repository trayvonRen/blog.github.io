module.exports = [
  {
    title: 'Webpack', // 必要的
    path: '/engineering/webpack/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/engineering/webpack/loaders.md', 'Loader'],
      ['/engineering/webpack/plugins.md', 'Plugin'],
      ['/engineering/webpack/devServer.md', 'DevServer'],
      ['/engineering/webpack/devtool.md', 'Source Map'],
      ['/engineering/webpack/hmr.md', 'Hot Module Replacement'],
      ['/engineering/webpack/defaultconfig.md', '默认配置'],
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
]
