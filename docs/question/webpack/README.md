## loader 和 plugin 的区别

Loader 直译为"加载器"。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到 loader。 所以 Loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力。

Plugin 直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## 有哪些常见的 Loader？他们是解决什么问题的？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- babel-loader：把 ES6 转换成 ES5css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- css-loader：处理 css 文件
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## 有哪些常见的 Plugin？他们是解决什么问题的？

- split-chunks-plugin  
  代码分割
- html-webpack-plugin  
  把 js 插入 html 模板中，还可以配置多页面应用
- clean-webpack-plugin  
  清理打包目录
- happypack  
  多线程 loader，用于提升构建速度
- mini-css-extract-plugin  
  抽离 css

## webpack 的构建流程是什么

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 是否写过 Loader 和 Plugin？描述一下编写 loader 或 plugin 的思路？

Loader 像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个 Loader 通过链式操作，将源文件一步步翻译成想要的样子。编写 Loader 时要遵循单一原则，每个 Loader 只做一种"转义"工作。  
 每个 Loader 的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用 this.callback()方法，将内容返回给 webpack。 还可以通过 this.async()生成一个 callback 函数，再用这个 callback 将处理后的内容输出出去。

此外 webpack 还为开发者准备了开发 loader 的工具函数集——loader-utils。

相对于 Loader 而言，Plugin 的编写就灵活了许多。 webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## npm 打包时需要注意哪些？如何利用 webpack 来更好的构建？

- 要支持 CommonJS 模块化规范，所以要求打包后的最后结果也遵守该规则。
- Npm 模块使用者的环境是不确定的，很有可能并不支持 ES6，所以打包的最后结果应该是采用 ES5 编写的。
- 并且如果 ES5 是经过转换的，请最好连同 SourceMap 一同上传。
- Npm 包大小应该是尽量小（有些仓库会限制包大小） 发布的模块不能将依赖的模块也一同打包，应该让用户选择性的去自行安装。这样可以避免模块应用者再次打包时出现底层模块被重复打包的情况。
- UI 组件类的模块应该将依赖的其它资源文件，例如.css 文件也需要包含在发布的模块里。

## hmr 原理

[参考资料](/engineering/webpack/hmr.html#启用-hmr)

## hash chunkhash contenthash 区别

在 webpack 中有三种 hash 可以配置，分别是 hash、chunkhash、contenthash 他们是不对的可以针对不同的配置，首相要搞清楚这三种的 hash 的区别，什么场景下，适合用哪种。

- hash  
  build-specific， 哈希值对应每一次构建（ Compilation ），即每次编译都不同，即使文件内容都没有改变，并且所有的资源都共享这一个哈希值，此时，浏览器缓存就没有用了，可以用在开发环境，生产环境不适用。
- chunkhash  
  chunk-specific， 哈希值对应于 webpack 每个入口点，每个入口都有自己的哈希值。如果在某一入口文件创建的关系依赖图上存在文件内容发生了变化，那么相应入口文件的 chunkhash 才会发生变化，适用于生产环境
- contenthash  
  content-specific，根据包内容计算出的哈希值，只要包内容不变，contenthash 就不变，适用于生产环境。有时内容没有变更，打包时 [contenthash] 也会变更

webpack 允许哈希的切片。如果你写 [hash:8] ，那么它会获取哈希值的前 8 位。
按需加载的块不受 filename 影响，受 chunkFilename 影响

## module chunk bundle 区别

- module  
  我们直接写出来的是 module，一般来说一个文件就是一个 module
- chunk  
  当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作；
- bundle  
  webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。

:::warning
一般来说一个 chunk 对应一个 bundle，但也有例外，如果做了 code splitting 就会输出多个 bundle
:::

![](/img/question/chunk.png)

## webpack 代码分割总结

- 配置多入口，把库文件配置一个独立的入口

- 使用自带的 spliteChunkPlugin，配置 optimization

- 动态导入

  - 懒加载

  - 预加载

## webpack 懒加载 预加载

### 使用 import() 动态导入/懒加载

本质上是动态加载 script 标签

```js
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'client.js'
document.body.appendChild(script)
```

### 使用 prefetch preload 预加载

```js
const getComponent = import(/* webpackPrefetch: true */ 'math.js')
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。
