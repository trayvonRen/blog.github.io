## 创建

### document.createElement()

在 HTML 文档中，Document.createElement() 方法用于创建一个由标签名称 tagName 指定的 HTML 元素。如果用户代理无法识别 tagName，则会生成一个未知 HTML 元素 HTMLUnknownElement。

```js
let div = document.createElement('div')
```

### document.createTextNode()

创建一个新的文本节点。这个方法可以用来转义 HTML 字符。

```js
var text = document.createTextNode('<div>1221</div>')
```

### document.createComment()

createComment() 方法用来创建并返回一个注释节点.

```js
var text = document.createComment('这是注释')
```

### Node.cloneNode

Node.cloneNode() 方法返回调用该方法的节点的一个副本.

```js
var dupNode = node.cloneNode(true)
```

## 查找

### getElementById

getElementById()返回一个匹配特定 ID 的元素. 由于元素的 ID 在大部分情况下要求是独一无二的，这个方法自然而然地成为了一个高效查找特定元素的方法。

```js
var element = document.getElementById(id)
```

### getElementsByClassName()

返回一个包含了所有指定类名的子元素的类数组对象。当在 document 对象上调用时，会搜索整个 DOM 文档，包含根节点。你也可以在任意元素上调用 getElementsByClassName() 方法，它将返回的是以当前元素为根节点，所有指定类名的子元素。

```js
var elements = document.getElementsByClassName(names) // or:
var elements = rootElement.getElementsByClassName(names)
```

### getElementsByName()

根据给定的 name 返回一个在 (X)HTML document 的节点列表集合。

```js
elements = document.getElementsByName(name)
```

### getElementsByTagName()

返回一个包括所有给定标签名称的元素的 HTML 集合 HTMLCollection。 整个文件结构都会被搜索，包括根节点。返回的 HTML 集合是动态的, 意味着它可以自动更新自己来保持和 DOM 树的同步而不用再次调用 getElementsByTagName() 。

```js
var elements = document.getElementsByTagName(name)
```

### querySelector()

文档对象模型 Document 引用的 querySelector()方法返回文档中与指定选择器或选择器组匹配的第一个 html 元素 Element。 如果找不到匹配项，则返回 null。

```js
element = document.querySelector(selectors)
```

### querySelectorAll()

返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 NodeList 。

```js
elementList = document.querySelectorAll(selectors)
```

## 删改

### Element.classList

Element.classList 是一个只读属性，返回一个元素的类属性的实时 DOMTokenList 集合。

相比将 element.className 作为以空格分隔的字符串来使用，classList 是一种更方便的访问元素的类列表的方法。

```js
let child = document.getElementsByClassName('child')[0]
console.log(child.classList)
child.classList.add('a')
console.log(child.classList)

child.classList.add('b')
console.log(child.classList)

child.classList.remove('a')
console.log(child.classList)
child.classList.toggle('b')
console.log(child.classList)
child.classList.toggle('b')
console.log(child.classList)
```

### Element.getAttribute()

getAttribute() 返回元素上一个指定的属性值。如果指定的属性不存在，则返回 null 或 "" （空字符串）

```js
let attribute = element.getAttribute(attributeName)
```

### Element.setAttribute()

设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。

```js
element.setAttribute(name, value)
```

### Element.removeAttribute()

removeAttribute() 从指定的元素中删除一个属性

```js
element.removeAttribute(attrName)
```

### Node.appendChild

Node.appendChild() 方法将一个节点附加到指定父节点的子节点列表的末尾处。如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

```js
element.appendChild(aChild)
```

### Node.removeChild

Node.removeChild() 方法从 DOM 中删除一个子节点。返回删除的节点。

```js
let oldChild = node.removeChild(child)
```

### Node.replaceChild()

Node.replaceChild() 方法用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。

```js
parentNode.replaceChild(newChild, oldChild)
```

### Element.innerHTML

Element.innerHTML 属性设置或获取 HTML 语法表示的元素的后代。

如果一个 `<div>`, `<span>`, 或 `<noembed>` 节点有一个文本子节点，该节点包含字符 (&), (<), 或(>), innerHTML 将这些字符分别返回为&amp;, &lt; 和 &gt; 。使用 Node.textContent 可获取一个这些文本节点内容的正确副本。

```js
let wrapper = document.getElementsByClassName('wrapper')[0]
console.log(wrapper.innerHTML)
wrapper.innerHTML = '<div class="child"></div>'
```

:::warning
用 innerHTML 插入文本到网页中并不罕见。但这有可能成为网站攻击的媒介，从而产生潜在的安全风险问题。

基于这个原因，当插入纯文本时，建议不要使用 innerHTML 。取而代之的是使用 Node.textContent ，它不会把给定的内容解析为 HTML，它仅仅是将原始文本插入给定的位置。
:::

### Node.textContent

Node 接口的 textContent 属性表示一个节点及其后代的文本内容。

### HTMLElement.innerText

innerText 属性表示一个节点及其后代的“渲染”文本内容。

#### 与 textContent 的区别

- textContent 会获取所有元素的内容，包括 `<script>` 和 `<style>` 元素，然而 innerText 只展示给人看的元素。
- textContent 会返回节点中的每一个元素。相反，innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，
  - 此外，由于 innerText 受 CSS 样式的影响，它会触发回流（ reflow ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）
- 与 textContent 不同的是, 在 Internet Explorer (小于和等于 11 的版本) 中对 innerText 进行修改， 不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。
