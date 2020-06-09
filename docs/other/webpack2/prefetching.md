在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

```js
function getComponent() {
  return import(/* webpackPrefetch: true */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['DELL', 'LEE'], '-----')
    return element
  })
}
document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
```

这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。

只要父 chunk 完成加载，webpack 就会添加 prefetch hint(预取提示)。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

:::warning
不正确地使用 webpackPreload 会有损性能，请谨慎使用。
:::
