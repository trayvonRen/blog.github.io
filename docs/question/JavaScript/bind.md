### 第一版

使用 apply 实现 bind

```js
Function.prototype.$bind = function(context) {
  let self = this
  return function() {
    return self.apply(context)
  }
}
```

### 第二版

实现参数传递

```js
Function.prototype.$bind = function(context) {
  let self = this
  const args = Array.prototype.slice.call(arguments, 1)

  return function() {
    const subArgs = Array.prototype.slice.call(arguments, 1)
    return self.apply(context, args.concat(subArgs))
  }
}
```
