## 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
}
```

## 出口(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

```js
const path = require('path')

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
}
```

### publicPath

以下是使用 CDN 和资源 hash 的复杂示例：

config.js

```js
output: {
  path: "/home/proj/cdn/assets/[hash]",
  publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

### 占位符

- [hash] 模块标识符(module identifier)的 hash
- [chunkhash] chunk 内容的 hash
- [name] 模块名称
- [id] 模块标识符(module identifier)
- [query] 模块的 query，例如，文件名 ? 后面的字符串

  _[hash] 和 [chunkhash] 的长度可以使用 [hash:16]（默认为 20）来指定。或者，通过指定 output.hashDigestLength 在全局配置长度。_
