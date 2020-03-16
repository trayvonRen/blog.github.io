module.exports = [{
   title: 'vue 基础', // 必要的
   path: '/vue/base/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/vue/base/vue-render.md', 'render 函数'],
      ['/vue/base/runtimeOnly.md', 'runtimeOnly & Runtime+Compiler'],
      ['/vue/base/axios_api.md', '封装 axios'],

   ]
}, {
   title: 'vue 源码解析', // 必要的
   path: '/vue/code/', // 可选的, 应该是一个绝对路径
   collapsable: true, // 可选的, 默认值是 true,
   sidebarDepth: 2, // 可选的, 默认值是 1
   children: [
      ['/vue/code/next-tick.md', 'vue nextTick'],
   ]
}]