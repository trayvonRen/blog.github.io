module.exports = [
  {
    title: '栈', // 必要的
    path: '/structure/stack/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/structure/stack/ployfill.md', '实现'],
      ['/structure/stack/train.md', '训练题'],
    ],
  },
  {
    title: '队列', // 必要的
    path: '/structure/queue/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/structure/queue/ployfill.md', '实现'],
      ['/structure/queue/train.md', '训练题'],
    ],
  },
  {
    title: '链表', // 必要的
    path: '/structure/linklist/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/structure/linklist/ployfill.md', '实现'],
      ['/structure/linklist/train.md', '训练题'],
    ],
  },
  {
    title: '数组', // 必要的
    path: '/structure/array/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      // ['/structure/array/ployfill.md', '实现'],
      ['/structure/array/train.md', '训练题'],
    ],
  },
  {
    title: '字符串', // 必要的
    path: '/structure/string/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      // ['/structure/array/ployfill.md', '实现'],
      ['/structure/string/train.md', '训练题'],
    ],
  },
  {
    title: '树', // 必要的
    path: '/structure/tree/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      // ['/structure/tree/ployfill.md', '实现'],
      ['/structure/tree/Binarytree.md', '二叉树'],
      ['/structure/tree/Binarytreetrain.md', '二叉树训练题'],
      ['/structure/tree/BinarySearchTree.md', '二叉搜索树'],
      ['/structure/tree/BinarySearchTreetrain.md', '二叉搜索树训练题'],
      ['/structure/tree/heap.md', '堆'],
    ],
  },
  {
    title: '哈希表', // 必要的
    path: '/structure/hashtable/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      // ['/structure/tree/ployfill.md', '实现'],
      // ['/structure/hashtable/Binarytree.md', '二叉树'],
      ['/structure/hashtable/train.md', '训练题'],
    ],
  },
  {
    title: '课程笔记', // 必要的
    path: '/structure/c/', // 可选的, 应该是一个绝对路径
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, // 可选的, 默认值是 1
    children: [
      ['/structure/c/introduction.md', '绪论'],
      ['/structure/c/linearTable.md', '线性表'],
      ['/structure/c/stack.md', '栈'],
      ['/structure/c/queue.md', '队列'],
      ['/structure/c/biTree.md', '二叉树'],
      // ['/structure/hashtable/Binarytree.md', '二叉树'],
      // ['/structure/hashtable/train.md', '训练题']
    ],
  },
]
