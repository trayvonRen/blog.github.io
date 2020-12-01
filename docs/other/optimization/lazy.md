## 资源阻塞

### JS 阻塞(全阻塞)

在执行 js 前，js 可能会对 dom 或者 cssom 进行读写，为了保持 js 获取实时的 dom/cssom，浏览器遇到 `<script>`且没有 defer 或 async 属性的 标签时，会等待执行完前面的 css ，并渲染一次页面之后再执行 js。

**所以我们一般把 `<script>` 放在 `<link>` 之前**。

浏览器在执行 js 时，需要等待 js 执行完成，才能继续解析 dom/cssom。

### CSS 阻塞(半阻塞)

浏览器是解析 DOM（html + js） 生成 DOM Tree，结合 CSS 生成的 CSSOM，最终组成 render tree，再渲染页面。  
由此可见，在此过程中 CSS 完全无法影响 DOM Tree，因而无需阻塞 DOM 解析, 但是 **CSS 会阻塞页面的渲染**。

### 总结

- CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染和 JS 执行。
- JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。
- 浏览器遇到 `<script>`且没有 defer 或 async 属性的 标签时，会触发页面渲染，因而如果前面 CSS 资源尚未加载完毕时，浏览器会等待它加载完毕再执行脚本。

## JavaScript 异步加载

当浏览器加载 HTML 时遇到 `<script>...</script>` 标签，浏览器就不能继续构建 DOM。它必须立刻执行此脚本。对于外部脚本 `<script src="..."></script>` 也是一样的：浏览器必须等脚本下载完，并执行结束，之后才能继续处理剩余的页面。

这会导致两个重要的问题：

- 脚本不能访问到位于它们下面的 DOM 元素，因此，脚本无法给它们添加处理程序等。
- 如果页面顶部有一个笨重的脚本，它会“阻塞页面”。在该脚本下载并执行结束前，用户都不能看到页面内容

### defer

defer 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。

- 具有 defer 特性的脚本不会阻塞页面。
- 具有 defer 特性的脚本总是要等到 DOM 解析完毕，但在 DOMContentLoaded 事件之前执行。
- 具有 defer 特性的脚本保持其相对顺序，就像常规脚本一样

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p>...content before scripts...</p>

    <script>
      document.addEventListener('DOMContentLoaded', () => alert('DOM ready after defer!'))
    </script>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <p>...content after scripts...</p>
  </body>
</html>
```

### async

async 脚本会在后台加载，并在加载就绪时运行，DOM 和其他脚本不会等待它们，它们也不会等待其它的东西， async 脚本就是一个会在加载完成时执行的完全独立的脚本。

async 特性与 defer 有些类似。它也能够让脚本的加载不阻塞页面。但是，在行为上二者有着重要的区别。

- 浏览器不会因加载 async 脚本而阻塞（与 defer 类似）
- 其他脚本不会等待 async 脚本加载完成，同样，async 脚本也不会等待其他脚本。
- DOMContentLoaded 和异步脚本不会彼此等待：
  - DOMContentLoaded 可能会发生在异步脚本之前（如果异步脚本在页面完成后才加载完成）
  - DOMContentLoaded 也可能发生在异步脚本之后（如果异步脚本很短，或者是从 HTTP 缓存中加载的）
- 两个属性同时使用的时候会忽略 defer 采用 async 模式

### 动态脚本

此外，还有一种向页面添加脚本的重要的方式。

我们可以使用 JavaScript 动态地创建一个脚本，并将其附加（append）到文档（document）中：

```js
let script = document.createElement('script')
script.src = '/article/script-async-defer/long.js'
document.body.append(script) // (*)
```

当脚本被附加到文档 (\*) 时，脚本就会立即开始加载。
默认情况下，动态脚本的行为是 “async” 的。

也就是说：

- 它们不会等待任何东西，也没有什么东西会等它们。
- 先加载完成的脚本先执行（“加载优先”顺序）

### 总结

async 和 defer 有一个共同点：加载这样的脚本都不会阻塞页面的渲染。因此，用户可以立即阅读并了解页面内容。

但是，它们之间也存在一些本质的区别：

<table>
<thead>
<tr>
<th></th>
<th>顺序</th>
<th><code>DOMContentLoaded</code></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>async</code></td>
<td><strong>加载优先顺序</strong>。脚本在文档中的顺序不重要 —— 先加载完成的先执行</td>
<td>不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况。</td>
</tr>
<tr>
<td><code>defer</code></td>
<td><strong>文档顺序</strong>（它们在文档中的顺序）</td>
<td>在文档加载和解析完成之后（如果需要，则会等待），即在 <code>DOMContentLoaded</code> 之前执行。</td>
</tr>
</tbody>
</table>

在实际开发中，defer 用于需要整个 DOM 的脚本，和/或脚本的相对执行顺序很重要的时候。

async 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。

## CSS 异步加载

### 非阻塞加载 CSS

默认情况下，CSS 被视为渲染阻塞资源，因此，在 CSSOM 被构造完成之前，浏览器不会渲染任何已处理的内容。CSS 必须很薄，才能尽快交付，建议使用媒体类型和查询实现非阻塞渲染。

```css
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
```

当浏览器看到一个它知道只会用于特定场景的样式表时，它仍会下载样式，但不会阻塞渲染。

## 预加载：preload/prefetch/Preconnect

### preload

preload 最基本的使用方式是提前加载较晚发现的资源。虽然大部分基于标签的资源会被浏览器内部的预加载器（preloader）提早发现，但并非所有资源都是基于标签的。有些资源是隐藏在 CSS 和 JavaScript 中的，浏览器不知道页面即将需要这些资源，而等到发现它们时已经为时已晚。所以在有些情况，这些资源延缓了首屏渲染，或是延缓了页面关键部分的加载。

一般来说，最好使用 preload 来加载你最重要的资源，比如图像，CSS，JavaScript 和字体文件。这不要与浏览器预加载混淆，浏览器预加载只预先加载在 HTML 中声明的资源。preload 指令事实上克服了这个限制并且允许预加载在 CSS 和 JavaScript 中定义的资源，并允许决定何时应用每个资源。

使用 preload 指令的好处包括：

- 允许浏览器来设定资源加载的优先级因此可以允许前端开发者来优化指定资源的加载。
- 赋予浏览器决定资源类型的能力，因此它能分辨这个资源在以后是否可以重复利用。
- 浏览器可以通过指定 as 属性来决定这个请求是否符合 content security policy。
- 浏览器可以基于资源的类型（比如 image/webp）来发送适当的 accept 头。

### prefetch

Prefetch 是一个低优先级的资源提示，允许浏览器在后台（空闲时）获取将来可能用得到的资源，并且将他们存储在浏览器的缓存中。一旦一个页面加载完毕就会开始下载其他的资源，然后当用户点击了一个带有 prefetched 的连接，它将可以立刻从缓存中加载内容。

### Preconnect

本文介绍的最后一个资源提示是 preconnect，preconnect 允许浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析，TLS 协商，TCP 握手，这消除了往返延迟并为用户节省了时间。

"Preconnect 是优化的重要手段，它可以减少很多请求中的往返路径 —— 在某些情况下可以减少数百或者数千毫秒的延迟。—— lya Grigorik"

preconnect 可以直接添加到 HTML 中 link 标签的属性中，也可以写在 HTTP 头中或者通过 JavaScript 生成，如下是一个为 CDN 使用 preconnect 的例子：

```html
<link href="https://cdn.domain.com" rel="preconnect" crossorigin />
```

如下是为 Google Fonts 使用 preconnect 的例子，通过给 fonts.gstatic.com 加入 preconnect 提示，浏览器将立刻发起请求，和 CSS 请求并行执行。在这个场景下，preconnect 从关键路径中消除了三个 RTTs（Round-Trip Time） 并减少了超过半秒的延迟。

## 参考资料

[javascript.info: 脚本：async，defer](https://zh.javascript.info/script-async-defer#async)  
[什么是 Preload，Prefetch 和 Preconnect？](https://github.com/fi3ework/blog/issues/32)
