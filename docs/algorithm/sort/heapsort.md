## 概念
堆排序（英语：Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子节点的键值或索引总是小于（或者大于）它的父节点。  

## 动图演示
<img src="/img/Sorting_heapsort_anim.gif" width = "60%" height = "60%" align=center />     

## 时间复杂度    

- 平均：$O(nlogn)$
- 最坏：$O(nlogn)$
- 最优：$O(nlogn)$ 

## 实现
### javascript
```js
Array.prototype.heap_sort = function () {
         let arr = this.slice(0);

         function swap(i, j) {
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
         }

         function max_heapify(start, end) {
            let dad = start;
            let son = dad * 2 + 1;
            if (son >= end) return;
            if (son + 1 < end && arr[son + 1] > arr[son]) son++;
            if(arr[son] > arr[dad]) {
               swap(son, dad);
               max_heapify(son, end);
            }
         }

         let len = arr.length;

         for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
            max_heapify(i, len);
         }
         for (let i = len - 1; i > 0; i--) {
            swap(0, i);
            max_heapify(0, i);
         }

         return arr;
}
```