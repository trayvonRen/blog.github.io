// module.exports = [
//   {
//     title: '面筋',
//     path: '/question/gluten/',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [['/question/gluten/zaoniao.md', '腾讯 PCG 早鸟计划']],
//   },
//   {
//     title: 'HTML / CSS 基础',
//     path: '/question/css/',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [],
//   },
//   {
//     title: 'JavaScript',
//     path: '/question/JavaScript/others',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [
//       ['/question/JavaScript/others.md', '小问题汇总'],
//       ['/question/JavaScript/filter.md', '实现 Array.prototype.filter()'],
//       ['/question/JavaScript/shuffle.md', '洗牌算法'],
//       ['/question/JavaScript/float0.1.md', '0.1 + 0.2 == 0.3'],
//       ['/question/JavaScript/emmit.md', '发布订阅模式-手写事件触发器'],
//       ['/question/JavaScript/debounce.md', '手写 防抖/节流'],
//       ['/question/JavaScript/writecall.md', '手写 call/apply'],
//       ['/question/JavaScript/bind.md', '手写 bind'],
//       ['/question/JavaScript/new.md', '手写 new'],
//       ['/question/JavaScript/inhert.md', '手写 继承'],
//       ['/question/JavaScript/instanceof.md', '手写 instanceof'],
//       ['/question/JavaScript/array.md', '手写各种数组方法'],
//       ['/question/JavaScript/url.md', '手写 解析 url'],
//       ['/question/JavaScript/promise.md', 'promise 专场'],
//     ],
//   },
//   {
//     title: 'Webpack',
//     path: '/question/webpack/',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [],
//   },
//   {
//     title: '计算机网络/浏览器',
//     path: '/question/network/',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [],
//   },
//   {
//     title: 'React',
//     path: '/question/REACT/',
//     collapsable: true,
//     sidebarDepth: 2,
//     children: [],
//   },
//   // {
//   //   title: '剑指 OFFER',
//   //   path: '/leetcode/offer/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [
//   //     ['/leetcode/offer/1.md', '1. 二维数组中的查找'],
//   //     ['/leetcode/offer/58-1.md', '58 - 1. 翻转单词顺序'],
//   //     ['/leetcode/offer/24.md', '24. 反转链表'],
//   //   ],
//   // },
//   // {
//   //   title: '字符串',
//   //   path: '/leetcode/string/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/string/q.md', '训练题']],
//   // },
//   // {
//   //   title: '数组',
//   //   path: '/leetcode/array/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/array/q.md', '训练题']],
//   // },
//   // {
//   //   title: '链表',
//   //   path: '/leetcode/linklist/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/linklist/q.md', '训练题']],
//   // },
//   // {
//   //   title: '树',
//   //   path: '/leetcode/tree/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [
//   //     // ['/structure/tree/ployfill.md', '实现'],
//   //     ['/leetcode/tree/Binarytree.md', '二叉树'],
//   //     ['/leetcode/tree/Binarytreetrain.md', '二叉树训练题'],
//   //     ['/leetcode/tree/BinarySearchTree.md', '二叉搜索树'],
//   //     ['/leetcode/tree/BinarySearchTreetrain.md', '二叉搜索树训练题'],
//   //     ['/leetcode/tree/heap.md', '堆'],
//   //   ],
//   // },
//   // {
//   //   title: '二分查找',
//   //   path: '/leetcode/dichotomy/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/dichotomy/q.md', '训练题']],
//   // },
//   // {
//   //   title: '双指针',
//   //   path: '/leetcode/doublePointer/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/doublePointer/q.md', '训练题']],
//   // },
//   // {
//   //   title: '动态规划',
//   //   path: '/leetcode/dp/',
//   //   collapsable: true,
//   //   sidebarDepth: 2,
//   //   children: [['/leetcode/dp/q.md', '训练题']],
//   // },
// ]

// // const fs = require('fs')
// // const path = require('path')

// // const readline = require('readline')

// // let resultConfig = []
// // const fileName = path.basename(__filename).slice(0, -3)
// // const targetPath = path.resolve(__dirname, '..', '..', fileName)

// // function line(targetPath, files, filesitem) {
// //   return new Promise((resolve, reject) => {
// //     var rd = readline.createInterface({
// //       input: fs.createReadStream(path.resolve(targetPath, files, filesitem)),
// //       output: process.stdout,
// //       console: false,
// //     })

// //     rd.on('line', function(line) {
// //       rd.close()
// //       resolve(line.trim().slice(2))
// //     })
// //   })
// // }

// // fs.readdirSync(targetPath).forEach(files => {
// //   let p = path.resolve(__dirname, '..', '..', fileName, files)
// //   if (fs.statSync(p).isDirectory()) {
// //     let children = []

// //     fs.readdirSync(path.resolve(targetPath, files)).forEach(async filesitem => {
// //       if (filesitem !== 'README.md') {
// //         children.push([
// //           `/${fileName}/${files}/${filesitem}`,
// //           await line(targetPath, files, filesitem),
// //         ])
// //       }
// //     })
// //     resultConfig.push({
// //       title: files,
// //       path: `/${fileName}/${files}/`,
// //       collapsable: true,
// //       sidebarDepth: 2,
// //       children,
// //     })
// //   }
// // })

// // module.exports = resultConfig
