代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：

- 入口起点：使用 entry 配置手动地分离代码。
- 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

## 入口起点(entry points)

这是迄今为止最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些陷阱，我们将会解决这些问题。先来看看如何从 main bundle 中分离另一个模块：

### another-module.js

```js
import _ from 'lodash'

console.log(_.join(['Another', 'module', 'loaded!'], ' '))
```

#### webpack.config.js

```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

这种方法存在一些问题:

- 如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

## 防止重复(prevent duplication)

SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除：

##### webpack.config.js

```js
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all',
+     },
+   },
  };
```

## 动态导入(dynamic imports)

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure。让我们先尝试使用第一种……
:::warning
import() 调用会在内部用到 promises。如果在旧有版本浏览器中使用 import()，记得使用 一个 polyfill 库（例如 es6-promise 或 promise-polyfill），来 shim Promise。
:::

#### webpack.config.js

```js
  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
-     another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[name].bundle.js',
      publicPath: 'dist/',
      path: path.resolve(__dirname, 'dist'),
    },
-   optimization: {
-     splitChunks: {
-       chunks: 'all',
-     },
-   },
  };
```

#### index.js

```js
function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['DELL', 'LEE'], '-----')
    return element
  })
}

getComponent().then(element => {
  document.body.appendChild(element)
})
```
