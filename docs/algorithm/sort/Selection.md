## 概念
选择排序（Selection sort）是一种简单直观的排序算法。它的工作原理如下。首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

## 动图演示
<img src="/img/selectionSort.gif" width = "60%" height = "60%" align=center />

## 性质
### 时间复杂度
- 平均：$$O(n^2)$$
- 最坏：$$O(n^2)$$
- 最优：$$O(n^2)$$
### 额外的空间复杂度
$$O(1)$$
### 稳定性
不稳定

## 实现
### JavaScript
```js
Array.prototype.selection_sort = function() {
  let min;
  for (let i = 0; i < this.length - 1; i++) {
    min = i;
    for (let j = i + 1; j < this.length; j++) {
      if (this[min] > this[j]) {
        min = j;
      }
    }
    // swap two value without temp variable
    if (min !== i) {
      this[min] = this[min] ^ this[i];
      this[i] = this[min] ^ this[i];
      this[min] = this[min] ^ this[i];
    }
  }
  return this;
};
```