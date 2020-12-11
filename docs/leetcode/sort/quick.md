## 概念

快速排序（英语：Quicksort），又称划分交换排序（partition-exchange sort），简称快排。

快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为较小和较大的 2 个子序列，然后递归地排序两个子序列。

步骤为：

- 挑选基准值：从数列中挑出一个元素，称为“基准”（pivot），
- 分割：重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（与基准值相等的数可以到任何一边）。在这个分割结束之后，对基准值的排序就已经完成，
- 递归排序子序列：递归地将小于基准值元素的子序列和大于基准值元素的子序列排序。
  递归到最底部的判断条件是数列的大小是零或一，此时该数列显然已经有序。

**选取基准值有数种具体方法，此选取方法对排序的时间性能有决定性影响。**

## 动图演示

<img src="/img/Sorting_quicksort_anim.gif" width = "60%" height = "40%" align=center />

## 性质

### 时间复杂度

- 平均：$O(nlogn)$
- 最坏：$O(n^2)$
- 最优：$O(nlogn)$

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

## 优化

对于分治算法，当每次划分时，算法若都能分成两个等长的子序列时，那么分治算法效率会达到最大。也就是说，基准的选择是很重要的。选择基准的方式决定了两个分割后两个子序列的长度，进而对整个算法的效率产生决定性影响。

有三种选择基准的方法

- 选择一个固定位置
- 选择随机位置
- 选择左中右三个数的中间值

其中，第三种可以显著提高算法的效率
