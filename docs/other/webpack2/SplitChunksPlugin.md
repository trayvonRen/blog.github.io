## 默认配置

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'inital', // 只对异步代码进行 code splitting
      minSize: 3000, // 只对大于 minSize（byte） 的模块进行代码分割
      // minRemainingSize: 0,
      maxSize: 0, // 对大于 maxSize 的 chunk 进行二次分割
      minChunks: 1, // 模块被引入的最小次数
      maxAsyncRequests: 6, // 按需加载的最大请求数
      maxInitialRequests: 4, // 入口文件的最大请求数
      automaticNameDelimiter: '~', // 文件连接符

      // 打包缓存组，按照 priority 大小来命中
      cacheGroups: {
        // node_modules 中的模块
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: 'vendors.js',
        },
        // 其他模块
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, // 可以复用已经被打包的 chunk
        },
      },
    },
  },
}
```
