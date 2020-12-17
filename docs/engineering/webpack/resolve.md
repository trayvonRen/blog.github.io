```js
module.exports = {
  resolve: {
    // 设置模块导入规则，import/require 时会直接在这些目录找文件
    // 可以指明存放第三方模块的绝对路径，以减少寻找，
    // 默认 node_modules
    modules: [path.resolve(`${project}/components`), 'node_modules'],
    // import 导入时省略后缀
    // 注意：尽可能的减少后缀尝试的可能性
    extensions: ['.js', '.jsx', '.react.js', '.css', '.json'],
    // import 导入时别名，减少耗时的递归解析操作
    alias: {
      '@components': path.resolve(`${project}/components`),
      '@style': path.resolve('asset/style'),
    },
    // 很多第三方库会针对不同的环境提供几份代码
    // webpack 会根据 mainFields 的配置去决定优先采用那份代码
    // 它会根据 webpack 配置中指定的 target 不同，默认值也会有所不同
    mainFields: ['browser', 'module', 'main'],
  },
}
```
