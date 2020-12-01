## 浏览器的回流与重绘

## 浏览器渲染机制

- 浏览器采用流式布局模型（Flow Based Layout）
- 浏览器会把 HTML 解析成 DOM，把 CSS 解析成 CSSOM，DOM 和 CSSOM 合并就产生了渲染树（Render Tree）。
- 有了 RenderTree，我们就知道了所有节点的样式，然后计算他们在页面上的大小和位置，最后把节点绘制到页面上。
- 由于浏览器使用流式布局，对 Render Tree 的计算通常只需要遍历一次就可以完成，但 table 及其内部元素除外，他们可能需要多次计算，通常要花 3 倍于同等元素的时间，这也是为什么要避免使用 table 布局的原因之一。

### 回流 (Reflow)

当 Render Tree 中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
会导致回流的操作：

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的 DOM 元素
- 激活 CSS 伪类（例如：:hover）
- 查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

**注意：回流一定会触发重绘，而重绘不一定会回流**

### 重绘 (Repaint)

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility 等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

## 性能影响

回流比重绘的代价要更高。
有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。  
现代浏览器会对频繁的回流或重绘操作进行优化：
浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。
当你访问以下属性或方法时，浏览器会立刻清空队列：

- clientWidth、clientHeight、clientTop、clientLeft

- offsetWidth、offsetHeight、offsetTop、offsetLeft

- scrollWidth、scrollHeight、scrollTop、scrollLeft

- getComputedStyle()

- getBoundingClientRect()

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，**最好避免使用上面列出的属性，他们都会刷新渲染队列。** 如果要使用它们，最好将值缓存起来。

## 减少回流和重绘

### 最小化重绘和重排

由于重绘和重排可能代价比较昂贵，因此最好就是可以减少它的发生次数。为了减少发生次数，我们可以合并多次对 DOM 和样式的修改，然后一次处理掉。考虑这个例子

```js
const el = document.getElementById('test')
el.style.padding = '5px'
el.style.borderLeft = '1px'
el.style.borderRight = '2px'
```

例子中，有三个样式属性被修改了，每一个都会影响元素的几何结构，引起回流。当然，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。

因此，我们可以合并所有的改变然后依次处理，比如我们可以采取以下的方式：

使用 cssText

```js
const el = document.getElementById('test')
el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;'
```

修改 CSS 的 class

```js
const el = document.getElementById('test')
el.className += ' active'
```

### 批量修改 DOM

当我们需要对 DOM 对一系列修改的时候，可以通过以下步骤减少回流重绘次数：

- 使元素脱离文档流
- 对其进行多次修改
- 将元素带回到文档中。

该过程的第一步和第三步可能会引起回流，但是经过第一步之后，对 DOM 的所有修改都不会引起回流重绘，因为它已经不在渲染树了。

有三种方式可以让 DOM 脱离文档流：

- 隐藏元素，应用修改，重新显示
- 使用文档片段(document fragment)在当前 DOM 之外构建一个子树，再把它拷贝回文档。
- 将原始元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素。

#### 隐藏元素，应用修改，重新显示

```js
function appendDataToElement(appendToElement, data) {
  let li
  for (let i = 0; i < data.length; i++) {
    li = document.createElement('li')
    li.textContent = 'text'
    appendToElement.appendChild(li)
  }
}
const ul = document.getElementById('list')
ul.style.display = 'none'
appendDataToElement(ul, data)
ul.style.display = 'block'
```

#### 使用文档片段(document fragment)在当前 DOM 之外构建一个子树，再把它拷贝回文档

```js
const ul = document.getElementById('list')
const fragment = document.createDocumentFragment()
appendDataToElement(fragment, data)
ul.appendChild(fragment)
```

#### 将原始元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素。

```js
const ul = document.getElementById('list')
const clone = ul.cloneNode(true)
appendDataToElement(clone, data)
ul.parentNode.replaceChild(clone, ul)
```

### 避免触发同步布局事件

避免触发同步布局事件
上文我们说过，当我们访问元素的一些属性的时候，会导致浏览器强制清空队列，进行强制同步布局。举个例子，比如说我们想将一个 p 标签数组的宽度赋值为一个元素的宽度，我们可能写出这样的代码：

```js
function initP() {
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px'
  }
}
```

这段代码看上去是没有什么问题，可是其实会造成很大的性能问题。在每次循环的时候，都读取了 box 的一个 offsetWidth 属性值，然后利用它来更新 p 标签的 width 属性。这就导致了每一次循环的时候，浏览器都必须先使上一次循环中的样式更新操作生效，才能响应本次循环的样式读取操作。每一次循环都会强制浏览器刷新队列。我们可以优化为:

```js
const width = box.offsetWidth
function initP() {
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = width + 'px'
  }
}
```

#### 对于复杂动画效果,使用绝对定位让其脱离文档流

对于复杂动画效果，由于会经常的引起回流重绘，因此，我们可以使用绝对定位，让它脱离文档流。否则会引起父元素以及后续元素频繁的回流。

### css3 硬件加速（GPU 加速）

使用 css3 硬件加速，可以让 transform、opacity、filters 这些动画不会引起回流重绘。对于动画的其它属性，比如 background-color 这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

常见的触发硬件加速的 css 属性：

- transform
- opacity
- filters
- Will-change

##### css3 硬件加速的坑

当然，任何美好的东西都是会有对应的代价的，过犹不及。css3 硬件加速还是有坑的:

- 如果你为太多元素使用 css3 硬件加速，会导致内存占用较大，会有性能问题。
- 在 GPU 渲染字体会导致抗锯齿无效。这是因为 GPU 和 CPU 的算法不同。因此如果你不在动画结束的时候关闭硬件加速，会产生字体模糊。

### CSS

- 避免使用 table 布局
- 尽可能在 DOM 树的最末端改变 class
- 避免设置多层内联样式
- 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上
- 避免使用 CSS 表达式（例如：calc()）

### JavaScript

- 避免频繁操作样式，最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性
- 避免频繁操作 DOM，创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中
- 也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘
- 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
- 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流
