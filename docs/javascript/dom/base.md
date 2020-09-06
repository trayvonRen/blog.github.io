## 节点类型

只读属性 Node.nodeType 表示的是该节点的类型。
| 常量 | 值 | 描述 |
|---|---|---|
|Node.ELEMENT_NODE|1|一个 元素 节点，例如 `<p>` 和 `<div>`。|
|Node.TEXT_NODE|3|Element 或者 Attr 中实际的 文字|
|Node.CDATA_SECTION_NODE|4 |一个 CDATASection，例如 <!CDATA[[ … ]]>。|
|Node.PROCESSING_INSTRUCTION_NODE|7|一个用于 XML 文档的 ProcessingInstruction ，例如 `<?xml-stylesheet ... ?>` 声明。|
|Node.COMMENT_NODE|8 |一个 Comment 节点。|
|Node.DOCUMENT_NODE| 9 |一个 Document 节点。|
|Node.DOCUMENT_TYPE_NODE| 10| 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html> 就是用于 HTML5 的。|
|Node.DOCUMENT_FRAGMENT_NODE |11| 一个 DocumentFragment 节点|

## 节点关系

![](/img/javascript/dom.jpg)

### Node.childNodes

返回一个包含了该节点所有子节点的实时的 NodeList。

:::warning
NodeList 不是一个数组，是一个类似数组的对象(Like Array Object)。虽然 NodeList 不是一个数组，但是可以使用 forEach() 来迭代。你还可以使用 Array.from() 将其转换为数组。

Node.childNodes 返回的 NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化
:::

### Node.firstChild

返回该节点的第一个子节点 Node，如果该节点没有子节点则返回 null。

### Node.lastChild

返回该节点的最后一个子节点 Node，如果该节点没有子节点则返回 null。

### Node.nextSibling

返回与该节点同级的下一个节点 Node，如果没有返回 null。

### Node.previousSibling

返回一个当前节点同辈的前一个结点( Node) ，或者返回 null（如果不存在这样的一个节点的话）。

### Node.parentNode

返回一个当前结点 Node 的父节点 。如果没有这样的结点，比如说像这个节点是树结构的顶端或者没有插入一棵树中， 这个属性返回 null。

### Node.hasChildNodes()

返回一个 Boolean 布尔值，来表示该元素是否包含有子节点。

### ParentNode.children

ParentNode.children 是一个只读属性，返回 一个 Node 的子 elements ，是一个动态更新的 HTMLCollection。

```js
var children = node.children
```

### Element.firstElementChild

ParentNode.firstElementChild 只读属性，返回对象的第一个子 元素, 如果没有子元素，则为 null。

```js
var element = node.firstElementChild
```

### Element.lastElementChild

只读属性 ParentNode.lastElementChild 返回对象的最后一个子元素，如果没有子元素，则返回 null。

```js
var element = node.lastElementChild
```

### Element.nextElementSibling

nextElementSibling 返回当前元素在其父元素的子元素节点中的后一个元素节点,如果该元素已经是最后一个元素节点,则返回 null,该属性是只读的.

```js
var nextNode = elementNodeReference.nextElementSibling
```

### Element.previousElementSibling

previousElementSibling 返回当前元素在其父元素的子元素节点中的前一个元素节点,如果该元素已经是第一个元素节点,则返回 null,该属性是只读的.

```js
var prevNode = elementNodeReference.previousElementSibling
```
