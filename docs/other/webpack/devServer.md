webpack-dev-server 能够用于快速开发应用程序。

```js
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  open: true,
  hot: true,
  hotOnly: true,
}
```

```json
"scripts": {
  "start:dev": "webpack-dev-server"
}
```

[具体配置](https://www.webpackjs.com/configuration/dev-server/)

### 手写一个简易的 dev-server

```js
const express = require('express')
const webpack = require('webpack')

const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

const complier = webpack(config)

const app = express()

app.use(
  webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,
  })
)

app.listen(3000, () => {
  console.log('server is running!')
})
```
