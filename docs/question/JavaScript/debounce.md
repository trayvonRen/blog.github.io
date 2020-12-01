## 防抖 Debounce

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行。

### 计时器版防抖函数

基础版本  
使用闭包维护一个 timer, 如果在规定时间内再次触发，则清除 timer，重新计时

```js
function debounce(fn, wait, immediate) {
  let timer
  return function() {
    const _this = this
    const _args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(_this, _args)
    }, wait)
  }
}
```

第二版  
添加 immediate 参数，表示是否立即执行

```js
function debounce(fn, wait, immediate) {
  let timer, result
  return function() {
    const _this = this
    const _args = arguments

    if (timer) clearTimeout(timer)

    if (immediate) {
      let callNow = !timer
      timer = setTimeout(function() {
        timer = null
      }, wait)
      if (callNow) result = fn.apply(_this, _args)
    } else {
      timer = setTimeout(function() {
        fn.apply(_this, _args)
      }, wait)
    }
  }

  return result
}
```

最终奥义  
添加取消函数，取消 debounce

```js
function debounce(func, wait, immediate) {
  var timeout, result

  var debounced = function() {
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
```

## 节流 Throttle

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

### 时间戳

```js
function throttle(func, wait) {
  var context, args
  var previous = 0

  return function() {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
}
```

### 计时器

```js
function throttle(func, wait) {
  var timeout
  var previous = 0

  return function() {
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}
```
