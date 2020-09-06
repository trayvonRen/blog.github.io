module.exports = [
  {
    title: 'react', // 必要的
    path: '/react/base/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/react/base/JSX_base.md', 'JSX'],
      ['/react/base/element.md', '元素'],
      ['/react/base/component.md', '组件'],
      ['/react/base/Lifecycle.md', '生命周期'],
      ['/react/base/data.md', 'Props & State'],
      ['/react/base/proptypes.md', 'PropTypes'],
      ['/react/base/ref.md', 'Refs'],
      ['/react/base/context.md', 'Context'],
      ['/react/base/JSX.md', '深入 JSX'],
    ],
  },
  {
    title: 'Hook', // 必要的
    path: '/react/hook/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/react/hook/hookRules.md', 'hook 使用规则'],
      ['/react/hook/stateHook.md', 'useState'],
      ['/react/hook/effectHook.md', 'useEffect'],
      ['/react/hook/contextHook.md', 'useContext'],
      ['/react/hook/useCallback.md', 'useCallback'],
      ['/react/hook/useMemo.md', 'useMemo'],
      ['/react/hook/useRef.md', 'useRef'],
      ['/react/hook/customHook.md', '自定义 Hook'],
    ],
  },
  {
    title: 'react 进阶', // 必要的
    path: '/react/improve/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/react/improve/splitting.md', '代码分割'],
      ['/react/improve/optimization1.md', '性能优化：组件更新'],
    ],
  },
  {
    title: 'redux', // 必要的
    path: '/react/redux/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/react/redux/flow.md', '工作流程'],
      ['/react/redux/action.md', 'Action'],
      ['/react/redux/reducer.md', 'Reducer'],
      ['/react/redux/store.md', 'Store'],
      ['/react/redux/react-redux.md', 'react-redux'],
      ['/react/redux/middleware.md', '中间件'],
      ['/react/redux/redux-thunk.md', 'redux-thunk'],
      ['/react/redux/redux-saga.md', 'redux-saga'],
    ],
  },
  {
    title: 'react-router', // 必要的
    path: '/react/router/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/react/router/base.md', '基础用法'],
      ['/react/router/components.md', '组件'],
    ],
  },
  {
    title: 'react 中的 css', // 必要的
    path: '/react/style/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/react/style/styled.md', 'styled-components']],
  },
  {
    title: '源码解析', // 必要的
    path: '/react/code/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/react/code/test.md', '测试']],
  },
]
