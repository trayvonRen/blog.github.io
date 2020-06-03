## 概念
希尔排序（Shellsort），也称递减增量排序算法，是插入排序的一种更高效的改进版本。希尔排序是非稳定排序算法。   

一般步骤：  

- 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1
- 按增量序列个数 k，对序列进行 k 趟排序；
- 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
## 动图演示
<img src="/img/Sorting_shellsort_anim.gif" width = "60%" height = "40%" align=center />  

## 时间复杂度  

- 平均时间复杂度： 根据步长序列的不同而不同。
- 最坏时间复杂度： 根据步长序列的不同而不同。
- 最优时间复杂度： $$O(n)$$

## 实现
### JavaScript  
```js
Array.prototype.shell_sort = function() {
	var gap, i, j;
	var temp;
	for (gap = this.length >> 1; gap > 0; gap >>= 1)
		for (i = gap; i < this.length; i++) {
			temp = this[i];
			for (j = i - gap; j >= 0 && this[j] > temp; j -= gap)
				this[j + gap] = this[j];
			this[j + gap] = temp;
		}
return this
};
```