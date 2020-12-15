该插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              // only enable hot in development
              hmr: process.env.NODE_ENV === 'development',
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
              filename: '[name].css',
              chunkFilename: '[name].chunk.css',
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
}
```

## css 代码压缩

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
}
```
