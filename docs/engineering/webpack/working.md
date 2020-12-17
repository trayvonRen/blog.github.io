## 缩小打包作用域

### exclude include

使用 exclude 和 include，减少 loader 的工作量。

```js
rules: [
  {
    test: /\.js$/,
    include: /src\/scripts/,
    exclude: /node_modules/，
    loader: 'babel-loader',
  },
]
```

## 合理使用插件

不使用不必要的插件，不使用性能低的插件。

## 合理使用 resolve

resolve 可以省略文件后缀或路径，但是会增加打包速度

```js
resolve: {
  extensions: ['.js', '.jsx'],
  mainFiles: ['index', 'child '],
  alias: {
    '@': path.resolve(__dirname, '../src')
  }
}
```

## 使用动态链接库 DllPlugin

对于第三方模块或者是一些不常变化的模块，可以它们预先编译然后打包，然后在项目的构建中直接取用即可。

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom'],
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    }),
  ],
}
```

## Tree shaking

通过 Tree shaking 避免打包没必要的模块

## 多线程打包

thread-loader happypack parallel-webpack

## 合理使用 sourceMap
