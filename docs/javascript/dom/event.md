## 事件流

![](/img/javascript/event.png)

## 事件处理程序

### DOM 0 级事件处理程序

```js
btn.onclick = function() {}
```

```js
btn.onclick = null
```

**以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理**

### DOM 2 级事件处理程序

```js
onst btn = document.querySelector('button');

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange, false);
```

```js
btn.removeEventListener('click', bgChange)
```

addEventListener 第三个参数默认为 useCapture  
如果为 true，就是注册在捕获阶段，如果为 false，即注册在冒泡阶段  
默认为 false

## 事件对象

有时候在事件处理函数内部，您可能会看到一个固定指定名称的参数，例如 event，evt 或简单的 e。 这被称为事件对象，它被自动传递给事件处理函数，以提供额外的功能和信息。

```js
function bgChange(e) {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')'
  e.target.style.backgroundColor = rndCol
  console.log(e)
}

btn.addEventListener('click', bgChange)
```

#### 阻止默认行为

有时，你会遇到一些情况，你希望事件不执行它的默认行为。 最常见的例子是 Web 表单，例如自定义注册表单。  
标准事件对象具有可用的名为 `preventDefault()` 函数，可以阻止默认行为

```js
form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault()
    para.textContent = 'You need to fill in both names!'
  }
}
```

#### 阻止冒泡

标准事件对象具有可用的名为 `stopPropagation()` 的函数, 当在事件对象上调用该函数时，它只会让当前事件处理程序运行，但事件不会在冒泡链上进一步扩大，因此将不会有更多事件处理器被运行(不会向上冒泡)。

```js
video.onclick = function(e) {
  e.stopPropagation()
  video.play()
}
```

## 事件参考

[MDN: 事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%A0%87%E5%87%86%E4%BA%8B%E4%BB%B6)
