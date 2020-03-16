module.exports = [{
   title: 'css 基础', // 必要的
   path: '/css/base/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/css/base/select.md', '选择器'],
      ['/css/base/box.md', '盒模型'],
      ['/css/base/position.md', '定位'],
      ['/css/base/length.md', 'css 长度单位'],
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
},{
   title: 'css 属性', // 必要的
   path: '/css/atr/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/css/atr/width.md', 'width & height'],
      ['/css/atr/font-family.md', 'font-family'],

      // ['/algorithm/base/series.md', '递归类算法'],
   ]
},{
   title: '其他', // 必要的
   path: '/css/other/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/css/other/resect-css.md', 'resect-css'],

      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}]