## 概念
在计算机科学中，二分查找算法（英语：binary search algorithm），也称折半搜索算法（英语：half-interval search algorithm）、对数搜索算法（英语：logarithmic search algorithm）。  
是一种在**有序数组**中查找某一特定元素的搜索算法。搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。
<img src="/img/Binary_search_into_array.png" width = "60%" height = "60%" align=center />

## 复杂度
- 最坏时间复杂度：O(logn)
- 平均时间复杂度：O(logn)
- 最优时间复杂度：O(1)
- 空间复杂度：O(1)

## 实现
### JavaScript 
#### 使用循环
```js
function binarySearch (arr, val) {
    let head = 0;
    let tail = arr.length - 1;
    let middle;

    while(head <= tail) {
        middle = parseInt((head + tail) / 2);

        if(val < arr[middle]) {
            tail = middle - 1;
        } else if(val > arr[middle]) {
            head = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
}
```
#### 使用迭代
```js
function binarySearch (arr, val, start = 0, end = arr.length - 1) {
    if(start > end) {
        return -1;
    }
    let middle = parseInt((start + end) / 2);

    if(val > arr[middle]) {
        start = middle + 1;
    } else if(val < arr[middle]) {
        end = middle - 1;
    } else {
        return middle;
    }
    return binarySearch(arr, val, start, end);

};
```