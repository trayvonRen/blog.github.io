> DOM window 对象通过 history 对象提供了对浏览器的会话历史的访问。它暴露了很多有用的方法和属性，允许你在用户浏览历史中向前和向后跳转，同时——从 HTML5 开始——提供了对 history 栈中内容的操作。

## 基本操作

### back()

在 history 中向后跳转  
**这和用户点击浏览器回退按钮的效果相同。**

```js
window.history.back()
```

### forward()

在 history 中向前跳转  
**这和用户点击浏览器前进按钮的效果相同。**

```js
window.history.forward()
```

### go()

可以用 go() 方法载入到会话历史中的某一特定页面， 通过与当前页面相对位置来标志 (当前页面的相对位置标志为 0)

#### 向后移动一个页面

```js
window.history.go(-1)
```

#### 向前移动一个页面

```js
window.history.go(1)
```

### length

可以通过查看长度属性的值来确定的历史堆栈中页面的数量

```js
window.history.length
```

## 高级操作

### pushState()

添加一条历史记录，不刷新页面

```js
history.pushState(state, title, url)
```

### replaceState()

history.replaceState() 的使用与 history.pushState() 非常相似，区别在于 replaceState() 是修改了当前的历史记录项而不是新建一个。 注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。

### popstate 事件

每当处于激活状态的历史记录条目发生变化时,popstate 事件就会在对应 window 对象上触发. 如果当前处于激活状态的历史记录条目是由 history.pushState()方法创建,或者由 history.replaceState()方法修改过的, 则 popstate 事件对象的 state 属性包含了这个历史记录条目的 state 对象的一个拷贝.

```js
window.onpopstate = function(event) {
  alert('location: ' + document.location + ', state: ' + JSON.stringify(event.state))
}
```
