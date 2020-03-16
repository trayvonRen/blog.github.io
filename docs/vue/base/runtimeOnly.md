在 vue 2.0 以后所有的模板最终都会编译成 render 函数，但两者的区别是：

Runtime+Compiler 是完整版的构建，即 vue.common.js , 支持创建 vue 实例时，传入 template 选项。编译器可以在客户端运行时将模板编译成 render 函数。

Runtime-only 删除了模板编译的功能，即vue.runtime.esm.js, 因此无法支持带 template 属性的 Vue 实例选项。使用该构建方式的 vue 需要借助 vue-loader 或者 vueify 事先将 .vue 文件内部的模板会在构建时预编译成 render 函数，供 vue 实例使用。

> 因为 Runtime-only 相比 Runtime+Compiler 缩减了30%的体积，并且运行时编译 render 函数会大量损耗性能，所以应该尽可能使用Runtime-only版本。

当你使用了 Runtime-only 版本，而没有将模板预先编译成 render 函数，vue就会报如下的警告：

> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.



### 参考资料

- [官方文档](https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时)

- [vue的Runtime Compiler vs Runtime-only](http://60kmlh.ink/2017/10/12/vue%E7%9A%84Runtime%20%20%20Compiler%20vs.%20Runtime-only/)