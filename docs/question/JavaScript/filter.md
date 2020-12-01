## Array.prototype.filter()

- filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
- filter 不会改变原数组，它返回过滤后的新数组。
- 如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。callback 函数最终观察到的 this 值是根据通常函数所看到的 "this"的规则确定的。
- filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']

const result = words.filter(word => word.length > 6)

console.log(result)
// expected output: Array ["exuberant", "destruction", "present"]
```

## Polyfill

```js
if (!Array.prototype.filter) {
  Array.prototype.filter = function(func, thisArg) {
    'use strict'
    if (!((typeof func === 'Function' || typeof func === 'function') && this)) throw new TypeError()

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this,
      c = 0,
      i = -1
    if (thisArg === undefined) {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func(t[i], i, t)) {
            res[c++] = t[i]
          }
        }
      }
    } else {
      while (++i !== len) {
        // checks to see if the key was set
        if (i in this) {
          if (func.call(thisArg, t[i], i, t)) {
            res[c++] = t[i]
          }
        }
      }
    }

    res.length = c // shrink down array to proper size
    return res
  }
}
```

## for 循环实现

```js
Array.prototype.__filter = function(cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new TypeError()
  }

  const res = []
  let index = 0
  if (thisArg === undefined) {
    for (let item of this) if (cb(item, index++, this)) res.push(item)
  } else {
    for (let item of this) if (cb.call(thisArg, item, index++, this)) res.push(item)
  }

  return res
}
```
