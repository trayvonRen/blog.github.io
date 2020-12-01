## 经典的错误洗牌算法

```js
A.sort(function() {
  return 0.5 - Math.random()
})
```

## Fisher-Yates shuffle

其基本思路是，每次从未打乱的部分等可能地选一个元素，把它与未打乱部分的最后一个元素交换。

```js
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[arr[j - 1], arr[i]] = [arr[i], arr[j - 1]]
  }
  return arr
}
```
