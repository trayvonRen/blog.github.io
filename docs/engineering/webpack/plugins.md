## HtmlWebpackPlugin

HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个 HTML 文件，使用 lodash 模板提供你自己的模板，或使用你自己的 loader。

该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
}
```

[详细配置](https://www.webpackjs.com/plugins/html-webpack-plugin/)

## CleanWebpackPlugin

自动清除 build folder 里面的内容

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  plugins: [
    /**
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be. If using webpack 4+'s default configuration,
     * everything under <PROJECT_DIR>/dist/ will be removed.
     * Use cleanOnceBeforeBuildPatterns to override this behavior.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     *
     * See `Options and Defaults` for information
     */
    new CleanWebpackPlugin(),
  ],
}

module.exports = webpackConfig
```
