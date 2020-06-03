module.exports = [
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
