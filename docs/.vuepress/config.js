let sidebar = require('./directory/index')

module.exports = {
  description: 'rcw',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/icon/logo.png',
      },
    ],
  ],
  base: '/',
  title: '主页',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    },
  },
  themeConfig: {
    // lastUpdated: '最后编辑时间', // string | boolean
    smoothScroll: true,

    // Git 仓库和编辑链接
    repo: 'https://github.com/trayvonRen/bolg.github.io/',
    docsDir: 'docs',
    repoLabel: 'Github', // 导航栏上的文本
    editLinks: true,
    editLinkText: '编辑此页面',

    // 顶部导航
    nav: [
      {
        text: 'Css',
        link: '/css/base/how.md',
      },
      {
        text: 'Javascript',
        link: '/javascript/',
      },

      {
        text: 'React',
        link: '/react/',
      },
      {
        text: '前端工程化',
        link: '/engineering/',
      },
      // {
      //   text: '后端',
      //   link: '/operator/',
      // },
      {
        text: '数据结构与算法',
        link: '/leetcode/',
      },
      {
        text: '其他',
        link: '/other/',
      },
      {
        text: '面试题',
        link: '/question/JavaScript/others',
      },
    ],

    // 侧边栏
    sidebar,
  },
  sidebarDepth: 2, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
  displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
  activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
}
