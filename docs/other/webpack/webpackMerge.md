webpack merge 提供了合并功能，一般用与生产环境和开发环境中配置文件的合并

## webpack.common.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')

const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

const commonConfig = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node _modules/, loader: 'babel-loader' },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 只对异步代码进行 code splitting
      minSize: 3000, // 只对大于 minSize（byte） 的模块进行代码分割
      // minRemainingSize: 0,
      maxSize: 0, // 对大于 maxSize 的 chunk 进行二次分割
      minChunks: 1, // 模块被引入的最小次数
      maxAsyncRequests: 6, // 按需加载的最大请求数
      maxInitialRequests: 4, // 入口文件的最大请求数
      automaticNameDelimiter: '~', // 文件连接符

      // 打包缓存组，按照 priority 来命中
      cacheGroups: {
        // node_modules 中的模块
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        // 其他模块
        default: {
          priority: -20,
          reuseExistingChunk: true, // 可以复用已经被打包的 chunk
          filename: 'common.js',
        },
      },
    },
  },
}

module.exports = env => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}
```

## webpack.dev.js

```js
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
```

## webpack.prod.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
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
              chunkFilename: '[id].css',
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

## package.json

```js
  "scripts": {
    "dev-build": "webpack --config webpack.common.js",
    "dev": "webpack-dev-server --config webpack.common.js",
    "build": "webpack --env.production --config webpack.common.js"
  },
```
