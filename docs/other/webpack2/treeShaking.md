tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

## 将文件标记为无副作用(side-effect-free)

如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。  
如果你的代码确实有一些副作用，那么可以改为提供一个数组:

```js
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

:::warning
注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除
:::

## 压缩输出

通过如上方式，我们已经可以通过 import 和 export 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 -p(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

**从 webpack 4 开始，也可以通过 "mode" 配置选项轻松切换到压缩输出，只需设置为 "production"。**

## 结论

为了学会使用 tree shaking，你必须……

- 使用 ES2015 模块语法（即 import 和 export）。
- 在项目 package.json 文件中，添加一个 "sideEffects" 入口。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
  你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。
