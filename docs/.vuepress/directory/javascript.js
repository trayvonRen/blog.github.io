module.exports = [{
   title: 'js 基础', // 必要的
   path: '/javascript/base/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/javascript/base/handleError.md', '错误处理'],
      ['/javascript/base/operator.md', '按位运算符'],
   ]
}, {
   title: 'ES 6', // 必要的
   path: '/javascript/es6/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/javascript/es6/promise.md', 'promise']
   ]
},  {
   title: 'ajax', // 必要的
   path: '/javascript/ajax/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/javascript/ajax/xhr.md', 'XHR'],
      ['/javascript/ajax/axios.md', 'axios'],
   ]
}]