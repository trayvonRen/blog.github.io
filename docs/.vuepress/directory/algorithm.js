module.exports = [{
   title: '算法基础', // 必要的
   path: '/algorithm/base/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/base/t_complexity.md', '时间复杂度'],
      ['/algorithm/base/s_complexity.md', '空间复杂度'],
      ['/algorithm/base/method.md', '算法分析的主要方法'],
      ['/algorithm/base/series.md', '迭代类算法'],
      // ['/algorithm/base/series.md', '递归类算法'],
   ]
}, {
   title: '排序算法', // 必要的
   path: '/algorithm/sort/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/sort/bubble.md', '冒泡排序'],
      ['/algorithm/sort/Selection.md', '选择排序'],
      ['/algorithm/sort/quick.md', '快速排序'],
      ['/algorithm/sort/insertion.md', '插入排序'],
   ]
}, {
   title: '搜索算法', // 必要的
   path: '/algorithm/search/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/search/linear.md', '顺序查找'],
      ['/algorithm/search/binary.md', '二分查找'],
   ]
}, {
   title: '递归', // 必要的
   path: '/algorithm/recursion/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/recursion/improve.md', '深入理解递归'],
      ['/algorithm/recursion/memoization.md', '递归优化: memoization'],
      ['/algorithm/recursion/train.md', '训练题'],
      // ['/algorithm/recursion/binary.md', '二分查找'],
   ]
}, {
   title: '贪心算法', // 必要的
   path: '/algorithm/greedy/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/greedy/train.md', '训练题'],
      // ['/algorithm/greedy/binary.md', '二分查找'],
   ]
},{
   title: '动态规划', // 必要的
   path: '/algorithm/dp/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/algorithm/dp/train.md', '训练题'],
      // ['/algorithm/greedy/binary.md', '二分查找'],
   ]
}, {
   title: '蓝桥杯习题', // 必要的
   path: '/algorithm/lanqiao/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 5, // 可选的, 默认值是 1
   children: [
      ['/algorithm/lanqiao/java.md', 'java 语法'],
      ['/algorithm/lanqiao/big_data.md', '高精度类问题'],
      ['/algorithm/lanqiao/1_4.md', 'BEGIN-4：Fibonacci数列'],
      ['/algorithm/lanqiao/2_3.md', 'BASIC-3：字母图形'],
      ['/algorithm/lanqiao/2_8.md', 'BASIC-8：回文数'],
      ['/algorithm/lanqiao/2_9.md', 'BASIC-9：特殊回文数'],
      ['/algorithm/lanqiao/2_11.md', 'BASIC-10, 11, 12 ：进制转换'],
      ['/algorithm/lanqiao/2_19.md', 'BASIC-19 ：完美的代价'],
      ['/algorithm/lanqiao/2_30.md', 'BASIC-30：阶乘计算'],
   ]
}]