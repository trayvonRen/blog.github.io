module.exports = [{
   title: 'Linux', // 必要的
   path: '/operator/linux/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/operator/linux/commond.md', 'centos 常用命令'],
   ]
}, {
   title: '搭建 web 服务器', // 必要的
   path: '/operator/web/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/operator/web/web1.md', '登录 centos'],
      ['/operator/web/web2.md', '安装配置 ftp 服务'],
      ['/operator/web/web3.md', '安装配置 nginx'],
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}, {
   title: 'MongoDB', // 必要的
   path: '/operator/mongodb/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/operator/mongodb/install-on-centos.md', '安装和配置'],
      ['/operator/mongodb/mongoose.md', 'mongoose 入门'],
   ]
},]