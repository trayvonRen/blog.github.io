## 概念

冒泡排序（Bubble Sort）是一种简单直观的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就把他们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。

## 动图演示

<img src="/img/bubbleSort.gif" width = "60%" height = "60%" align=center />

## 性质

### 时间复杂度

- 平均：$O(n^2)$
- 最坏：$O(n^2)$
- 最优：$O(n^2)$

### 额外的空间复杂度

$O(1)$

### 稳定性

稳定

## 实现

### JavaScript

```js
Array.prototype.bubble_sort = function() {
  let i, j, temp
  for (i = 0; i < this.length - 1; i++)
    for (j = 0; j < this.length - 1 - i; j++)
      if (this[j] > this[j + 1]) {
        temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
  return this
}
```
