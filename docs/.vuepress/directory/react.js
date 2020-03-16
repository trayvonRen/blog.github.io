module.exports = [{
   title: 'react 基础', // 必要的
   path: '/react/base/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/react/base/create-react-app.md', 'create react app'],
      ['/react/base/react.md', 'react 入门'],
      ['/react/base/JSX.md', '深入 JSX'],
   ]
}, {
   title: 'react 中的 css', // 必要的
   path: '/react/style/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/react/style/styled.md', 'styled-components'],
   ]
}, {
   title: '源码解析', // 必要的
   path: '/react/code/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/react/code/test.md', '测试'],
   ]
}]