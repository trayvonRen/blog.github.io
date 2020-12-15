## loader 和 plugin 的区别

## hmr 原理

## hash chunkhash contenthash 区别

在 webpack 中有三种 hash 可以配置，分别是 hash、chunkhash、contenthash 他们是不对的可以针对不同的配置，首相要搞清楚这三种的 hash 的区别，什么场景下，适合用哪种。

- hash  
  hash 计算是跟整个项目的构建相关。
- chunkhash  
  因为 hash 是项目构建的哈希值，项目中如果有些变动，hash 一定会变，比如说我改动了 utils.js 的代码，index.js 里的代码虽然没有改变，但是大家都是用的同一份 hash。hash 一变，缓存一定失效了，这样子是没办法实现 CDN 和浏览器缓存的。  
  chunkhash 就是解决这个问题的，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。
- contenthash  
  我们更近一步，index.js 和 index.css 同为一个 chunk，如果 index.js 内容发生变化，但是 index.css 没有变化，打包后他们的 hash 都发生变化，这对 css 文件来说是一种浪费。如何解决这个问题呢？
  contenthash 将根据资源内容创建出唯一 hash，也就是说文件内容不变，hash 就不变。
