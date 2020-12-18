## Call

我们模拟的步骤可以分为：

- 将函数设为对象的属性
- 执行该函数
- 删除该函数

### 第一版

最基础的版本

```js
Function.prototype.myCall = function(context) {
  context.fn = this
  const result context.fn()
  delete context.fn
  return result
}
```

### 第二版

解决参数传递问题

```js
Function.prototype.myCall = function(context) {
  context.fn = this
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  const result = context.fn(...args)
  delete context.fn

  return result
}
```

### 最终奥义

如果没有传递 this，把 this 绑定为 window

```js
Function.prototype.myCall = function(context) {
  const context = context || window
  context.fn = this
  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i])
  }

  const result = context.fn(...args)
  delete context.fn

  return result
}
```

兼容 es3，使用字符串拼接参数执行

```js
Function.prototype.myCall = function(context) {
  context.fn = this

  const args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  const result = eval('context.fn(' + args + ')')
  delete context.fn

  return result
}
```

## Apply

同理

```js
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window
  context.fn = this

  var result
  if (!arr) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result
}
```
