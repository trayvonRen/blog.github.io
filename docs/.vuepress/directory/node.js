module.exports = [{
   title: 'npm', // 必要的
   path: '/node/npm/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/node/npm/npmcli.md', '常用命令'],
      ['/node/npm/package.md', 'package.json']
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}]