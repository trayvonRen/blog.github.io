module.exports = [
  {
    title: '浏览器', // 必要的
    path: '/other/browser/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      ['/other/browser/browserframework.md', '现代浏览器架构'],
      ['/other/browser/open.md', '浏览器的工作原理: 从输入 URL 到页面展示经历过什么'],
      ['/other/browser/reflow.md', '回流/重绘'],
      ['/other/browser/requestidlecallback.md', 'requestAnimationFrame / requestIdleCallback'],
      ['/other/browser/cache.md', '浏览器缓存'],
      ['/other/browser/priority.md', '浏览器资源加载优先级'],
    ],
  },
  {
    title: 'Web 性能优化', // 必要的
    path: '/other/optimization/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      ['/other/optimization/rail.md', 'RAIL 用户性能评价模型'],
      ['/other/optimization/quota.md', '性能优化的指标'],
      ['/other/optimization/api.md', 'Web 性能检测 API'],
      ['/other/optimization/Critical_rendering_path.md', '渲染优化理论基础：关键渲染路径'],
      ['/other/optimization/render.md', '渲染优化'],
      ['/other/optimization/resources.md', '资源优化'],
      ['/other/optimization/transport.md', '传输优化'],
      ['/other/optimization/lazy.md', '异步加载/预加载'],

      // ['/other/webpack/mode.md', 'mode'],
      // ['/other/webpack/entry.md', 'entry & output'],
      // ['/other/webpack/loader.md', 'loader'],
      // ['/other/webpack/loaders.md', 'loaders'],
      // ['/other/webpack/plugin.md', 'plugin'],
      // ['/other/webpack/plugins.md', 'plugins'],
      // ['/other/webpack/devtool.md', 'devtool'],
      // ['/other/webpack/devServer.md', 'devServer'],
      // ['/other/webpack/webpackMerge.md', 'webpackMerge 合并配置文件'],
    ],
  },

  {
    title: '计算机网络', // 必要的
    path: '/other/network/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      ['/other/network/transport.md', 'TCP/IP'],
      ['/other/network/tcp.md', 'TCP 链接建立与释放'],
      ['/other/network/reliable.md', 'TCP 可靠传输工作原理'],
      ['/other/network/flowControl.md', 'TCP 流量控制'],
      ['/other/network/congestion.md', 'TCP 拥塞控制'],
    ],
  },

  {
    title: 'HTTP', // 必要的
    path: '/other/http/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [['/other/http/code.md', 'http 状态码']],
  },
  {
    title: 'Web 安全', // 必要的
    path: '/other/security/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      ['/other/security/xss.md', 'XSS 攻击'],
      ['/other/security/xsrf.md', 'XSRF 攻击'],
    ],
  },
  {
    title: '设计模式', // 必要的
    path: '/other/design/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, // 可选的, 默认值是 1
    children: [
      ['/other/design/coupling.md', '耦合性'],
      ['/other/design/closed.md', '设计原则之开放-封闭原则'],
      ['/other/design/factory.md', '设计模式之工厂模式'],
      ['/other/design/observer.md', '设计模式之观察者模式/发布-订阅模式'],
    ],
  },

  // {
  //   title: 'Webpack 高级设置', // 必要的
  //   path: '/other/webpack2/', // 可选的, 应该是一个绝对路径
  //   collapsable: true, // 可选的, 默认值是 true,
  //   sidebarDepth: 2, // 可选的, 默认值是 1
  //   children: [
  //     ['/other/webpack2/hmr.md', 'hot module replacement'],
  //     ['/other/webpack2/treeShaking.md', 'tree shaking'],,
  //     ['/other/webpack2/codeSplitting.md', 'code splitting'],
  //     ['/other/webpack2/SplitChunksPlugin.md', 'SplitChunksPlugin'],
  //     ['/other/webpack2/MiniCssExtractPlugin.md', 'MiniCssExtractPlugin'],
  //     ['/other/webpack2/lazyLoading.md', 'LazyLoading'],
  //     ['/other/webpack2/prefetching.md', 'prefetch & preload'],
  //     ['/other/webpack2/shimming.md', 'shimming'],
  //   ],
  // },
  // {
  //   title: 'Typescript', // 必要的
  //   path: '/other/typescript/', // 可选的, 应该是一个绝对路径
  //   collapsable: true, // 可选的, 默认值是 true,
  //   sidebarDepth: 2, // 可选的, 默认值是 1
  //   // children: [['/other/git/commitGuide.md', 'commit 规范']],
  // },
  // {
  //   title: 'Git', // 必要的
  //   path: '/other/git/', // 可选的, 应该是一个绝对路径
  //   collapsable: true, // 可选的, 默认值是 true,
  //   sidebarDepth: 2, // 可选的, 默认值是 1
  //   children: [['/other/git/commitGuide.md', 'commit 规范']],
  // },
  // {
  //   title: 'VSCode', // 必要的
  //   path: '/other/vscode/', // 可选的, 应该是一个绝对路径
  //   collapsable: true, // 可选的, 默认值是 true,
  //   sidebarDepth: 2, // 可选的, 默认值是 1
  //   children: [['/other/vscode/settings.md', '配置文件']],
  // },
]
