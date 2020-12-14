## file-loader

将文件发送到输出文件夹，并返回（相对）URL

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
}
```

[具体配置](https://www.webpackjs.com/loaders/file-loader/)

## url-loader

url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
}
```

[具体配置](https://www.webpackjs.com/loaders/url-loader/)

## css-loader & style-loader

css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。

style-loader 通过注入 `style` 标签将 CSS 添加到 DOM。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },
}
```

## postcss-loader

使用 PostCSS 处理 CSS

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
}
```

### postcss.config.js

添加 postcss.config.js

```js
module.exports = {
  plugins: [require('autoprefixer')],
}
```

[具体配置](https://www.webpackjs.com/loaders/postcss-loader/)

## babel-loader

使用 babel 处理 js（jsx）

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ]
}
```

[具体用法](https://www.webpackjs.com/loaders/babel-loader/)
