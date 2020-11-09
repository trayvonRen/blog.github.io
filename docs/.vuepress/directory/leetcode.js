module.exports = [
  {
    title: 'LEECODE', // 必要的
    path: '/leetcode/leetcode/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/leetcode/leetcode/1.md', '1. 两数之和'],
      ['/leetcode/leetcode/2.md', '2. 两数相加'],
      ['/leetcode/leetcode/5.md', '5. 最长回文子串'],
      ['/leetcode/leetcode/7.md', '7. 整数反转'],
      ['/leetcode/leetcode/14.md', '14. 最长公共前缀'],
      ['/leetcode/leetcode/19.md', '19. 删除链表的倒数第N个节点'],
      ['/leetcode/leetcode/21.md', '21. 合并两个有序链表'],
      ['/leetcode/leetcode/26.md', '26. 删除排序数组中的重复项'],
      ['/leetcode/leetcode/27.md', '27. 移除元素'],
      ['/leetcode/leetcode/28.md', '28. 实现 strStr()'],
      ['/leetcode/leetcode/35.md', '35. 搜索插入位置'],
      ['/leetcode/leetcode/38.md', '38. 外观数列'],
      ['/leetcode/leetcode/56.md', '56. 合并区间'],
      ['/leetcode/leetcode/66.md', '66. 加一'],
      ['/leetcode/leetcode/70.md', '70. 爬楼梯'],
      ['/leetcode/leetcode/94.md', '94. 二叉树的中序遍历'],
      ['/leetcode/leetcode/102.md', '102. 二叉树的层序遍历'],

      ['/leetcode/leetcode/118.md', '118. 杨辉三角'],
      ['/leetcode/leetcode/119.md', '119. 杨辉三角 II'],
      ['/leetcode/leetcode/122.md', '122. 买卖股票的最佳时机 II'],
      ['/leetcode/leetcode/125.md', '125. 验证回文串'],
      ['/leetcode/leetcode/136.md', '136. 只出现一次的数字'],
      ['/leetcode/leetcode/141.md', '141. 环形链表'],
      ['/leetcode/leetcode/142.md', '142. 环形链表 II'],
      ['/leetcode/leetcode/144.md', '144. 二叉树的前序遍历'],
      ['/leetcode/leetcode/145.md', '145. 二叉树的后序遍历'],

      ['/leetcode/leetcode/153.md', '153. 寻找旋转排序数组中的最小值'],
      ['/leetcode/leetcode/160.md', '160. 相交链表'],
      ['/leetcode/leetcode/167.md', '167. 两数之和 II - 输入有序数组'],
      ['/leetcode/leetcode/189.md', '189. 旋转数组'],
      ['/leetcode/leetcode/203.md', '203. 移除链表元素'],
      ['/leetcode/leetcode/209.md', '209. 长度最小的子数组'],
      ['/leetcode/leetcode/217.md', '217. 存在重复元素'],
      ['/leetcode/leetcode/234.md', '234. 回文链表'],
      ['/leetcode/leetcode/237.md', '237. 删除链表中的节点'],
      ['/leetcode/leetcode/242.md', '242. 有效的字母异位词'],
      ['/leetcode/leetcode/283.md', '283. 移动零'],
      ['/leetcode/leetcode/328.md', '328. 奇偶链表'],
      ['/leetcode/leetcode/344.md', '344. 反转字符串'],
      ['/leetcode/leetcode/350.md', '350. 两个数组的交集 II'],
      ['/leetcode/leetcode/387.md', '387. 字符串中的第一个唯一字符'],
      ['/leetcode/leetcode/485.md', '485. 最大连续1的个数'],
      ['/leetcode/leetcode/557.md', '557. 反转字符串中的单词 III'],
      ['/leetcode/leetcode/561.md', '561. 数组拆分 I'],
      ['/leetcode/leetcode/724.md', '724. 寻找数组的中心索引'],
    ],
  },
  {
    title: '剑指 OFFER', // 必要的
    path: '/leetcode/offer/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/leetcode/offer/1.md', '1. 二维数组中的查找'],
      ['/leetcode/offer/58-1.md', '58 - 1. 翻转单词顺序'],
      ['/leetcode/offer/24.md', '24. 反转链表'],
    ],
  },
  {
    title: '字符串', // 必要的
    path: '/leetcode/string/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/string/q.md', '训练题']],
  },
  {
    title: '数组', // 必要的
    path: '/leetcode/array/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/array/q.md', '训练题']],
  },
  {
    title: '链表', // 必要的
    path: '/leetcode/linklist/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/linklist/q.md', '训练题']],
  },
  {
    title: '树', // 必要的
    path: '/leetcode/tree/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      // ['/structure/tree/ployfill.md', '实现'],
      ['/leetcode/tree/Binarytree.md', '二叉树'],
      ['/leetcode/tree/Binarytreetrain.md', '二叉树训练题'],
      ['/leetcode/tree/BinarySearchTree.md', '二叉搜索树'],
      ['/leetcode/tree/BinarySearchTreetrain.md', '二叉搜索树训练题'],
      ['/leetcode/tree/heap.md', '堆'],
    ],
  },
  {
    title: '二分查找', // 必要的
    path: '/leetcode/dichotomy/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/dichotomy/q.md', '训练题']],
  },
  {
    title: '双指针', // 必要的
    path: '/leetcode/doublePointer/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/doublePointer/q.md', '训练题']],
  },
  {
    title: '动态规划', // 必要的
    path: '/leetcode/dp/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [['/leetcode/dp/q.md', '训练题']],
  },
]
