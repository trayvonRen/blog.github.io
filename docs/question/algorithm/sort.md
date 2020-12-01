# 排序算法

## 快速排序

### 时间复杂度

- 平均：$$O(nlogn)$$
- 最坏：$$O(n^2)$$
- 最优：$$O(nlogn)$$
  <!-- ### 额外的空间复杂度
  $$O(1)$$ -->

### 稳定性

不稳定

## 实现

### JavaScript

```js
Array.prototype.quickSort = function() {
  let length = this.length
  if (this.length < 2) return this
  let middle = this[0]
  let left = []
  let right = []
  for (let i = 1; i < length; i++) this[i] > middle ? right.push(this[i]) : left.push(this[i])
  return left.quickSort().concat(middle, right.quickSort())
}
```
