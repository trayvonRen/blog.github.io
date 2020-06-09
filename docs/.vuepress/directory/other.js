module.exports = [
  {
    title: 'Webpack 基本设置', // 必要的
    path: '/other/webpack/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/other/webpack/defaultconfig.md', '配置'],
      ['/other/webpack/mode.md', 'mode'],
      ['/other/webpack/entry.md', 'entry & output'],
      ['/other/webpack/loader.md', 'loader'],
      ['/other/webpack/loaders.md', 'loaders'],
      ['/other/webpack/plugin.md', 'plugin'],
      ['/other/webpack/plugins.md', 'plugins'],
      ['/other/webpack/devtool.md', 'devtool'],
      ['/other/webpack/devServer.md', 'devServer'],
      ['/other/webpack/webpackMerge.md', 'webpackMerge 合并配置文件'],
    ],
  },
  {
    title: 'Webpack 高级设置', // 必要的
    path: '/other/webpack2/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/other/webpack2/hmr.md', 'hot module replacement'],
      ['/other/webpack2/treeShaking.md', 'tree shaking'],
      ['/other/webpack2/codeSplitting.md', 'code splitting'],
      ['/other/webpack2/SplitChunksPlugin.md', 'SplitChunksPlugin'],
      ['/other/webpack2/MiniCssExtractPlugin.md', 'MiniCssExtractPlugin'],
      ['/other/webpack2/lazyLoading.md', 'LazyLoading'],
      ['/other/webpack2/prefetching.md', 'prefetch & preload'],
      ['/other/webpack2/shimming.md', 'shimming'],
    ],
  },
  {
    title: 'Git', // 必要的
    path: '/other/git/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/other/git/commitGuide.md', 'commit 规范']],
  },
  {
    title: 'VSCode', // 必要的
    path: '/other/vscode/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/other/vscode/settings.md', '配置文件']],
  },
]
