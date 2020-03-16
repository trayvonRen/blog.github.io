let sidebar = require('./directory/index');

module.exports = {
  description: '博客',
  head: [
    ['link', {
      rel: 'icon',
      href: '/icon/logo.png'
    }]
  ],
  base: '/',
  title: 'RCW',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    }
  },
  themeConfig: {
    smoothScroll: true,
    // 顶部导航
    nav: [
      {
        text: 'Html',
        link: '/html/'
      },
      {
        text: 'Css',
        link: '/css/'
      },
      {
        text: 'Javascript',
        link: '/javascript/'
      },
      {
        text: 'React',
        link: '/react/'
      },
      {
        text: 'Node',
        link: '/node/'
      },
      {
        text: '计算机网络',
        link: '/network/'
      },
      {
        text: '运维',
        link: '/operator/'
      },
      {
        text: '算法',
        link: '/algorithm/'
      },{
        text: '数据结构',
        link: '/structure/'
      },{ 
        text: 'GitHub', 
        link: 'https://github.com/woyasuohen6?tab=repositories' 
      },
    ],

    // 侧边栏
    sidebar
  },
  sidebarDepth: 3, // 默认 1 提取到 h2，0 为禁用，2 为 h2，h3
  displayAllHeaders: false, // 默认值：false 侧边栏只会显示由当前活动页面的标题组成的链接
  activeHeaderLinks: true, // 默认值：true 滚动时通过 hash 高亮侧边栏标题

  // Git 仓库和编辑链接
  repo: 'https://github.com/woyasuohen6/algorithm', // 你的仓库
  repoLabel: 'Github', // 导航栏上的文本

  editLinks: true,
  // 默认为 "Edit this page"
  editLinkText: '编辑此页面',
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
  ]
}