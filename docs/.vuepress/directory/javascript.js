module.exports = [
  {
    title: 'js 基础', // 必要的
    path: '/javascript/base/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/javascript/base/handleError.md', '错误处理'],
      ['/javascript/base/operator.md', '按位运算符'],
      ['/javascript/base/array_method.md', '数组方法'],
      ['/javascript/base/scope.md', '词法作用域'],
      ['/javascript/base/create.md', '对象的创建'],
      ['/javascript/base/proto.md', '原型/原型链'],
      ['/javascript/base/inhert.md', '继承'],

      ['/javascript/base/function.md', '深入理解 JavaScript 函数'],
      ['/javascript/base/object.md', '深入理解 JavaScript 对象'],
      ['/javascript/base/Iteration.md', 'JavaScript 遍历'],
      ['/javascript/base/dataS.md', 'JavaScript 数据结构'],
      ['/javascript/base/data_structures.md', 'JavaScript 数据类型'],
      ['/javascript/base/data_type.md', 'JavaScript 类型检测'],
    ],
  },
  {
    title: 'js 进阶', // 必要的
    path: '/javascript/improve/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/javascript/improve/eventLoop.md', '事件循环'],

      ['/javascript/improve/JIT.md', 'JavaScript 编译原理'],
      ['/javascript/improve/this.md', 'this'],
      ['/javascript/improve/scope.md', '执行期上下文，作用域链，闭包'],
    ],
  },
  {
    title: 'ES 6', // 必要的
    path: '/javascript/es6/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/javascript/es6/as.md', '异步编程'],
      ['/javascript/es6/promise.md', 'promise'],
      ['/javascript/es6/promiseA.md', 'promise 实现'],

      ['/javascript/es6/generator.md', 'generator'],
      // ['/javascript/es6/async.md', 'async/await'],
    ],
  },
  {
    title: 'ajax', // 必要的
    path: '/javascript/ajax/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/javascript/ajax/xhr.md', 'XHR'],
      ['/javascript/ajax/axios.md', 'axios'],
    ],
  },
  {
    title: 'WEB API', // 必要的
    path: '/javascript/web/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/javascript/web/history.md', 'History Api']],
  },
  {
    title: 'DOM', // 必要的
    path: '/javascript/dom/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/javascript/dom/base.md', 'DOM 基础'],
      ['/javascript/dom/operation.md', 'DOM 操作'],
      ['/javascript/dom/event.md', '事件'],
    ],
  },
]
