## 数组

一般而言，数组是一个线性的数据结构，满足以下特点：

- 储存在一段连续的内存之中
- 数组长度固定
- 以数字为索引

但是在 JavaScript 中，你可以这样：

```js
let arr = new Array(10)
arr[11] = 666 // [empty × 11, 666]
```

还可以这样

```js
arr['name'] = 'rcw' // [empty × 11, 666, name: "rcw"]
```

甚至用 instanceof 来检测它

```js
arr instanceof Object // true
```

**OK，数组是对象实锤了**  
事实上，array 与传统数组确实不太一样，基于 v8 引擎的实现，array 在 JavaScript 中会表现出对象的行为模式
（[探究 JS V8 引擎下的“数组”底层实现](https://juejin.im/post/5df1e21bf265da33c24fe9f4)）
但是我们开发过程中还是要把 array 当作一个线性的数据结构，避免上述操作

如果没有给数组的每个元素赋值，会产生数组的空位（hole），形成稀疏数组（感觉这个性质没有什么用）

## 数组的方法

介绍一些常用数组方法的实现

### Array.from()

> Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

逻辑上比较简单，直接使用 for of 迭代即可

```js
Array.__from = function(resource) {
  if (!resource[Symbol.iterator]) {
    return []
  }

  let result = []
  for (let item of resource) result.push(item)

  return result
}
```

### Array.prototype.concat()

> concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

因为 concat 对于数组也是浅拷贝，所以直接遍历即可

```js
Array.prototype.__concat = function(...resource) {
  let result = []

  for (let item of this) result.push(item)

  for (let item of resource) {
    if (Array.isArray(item)) {
      for (let data of item) {
        result.push(data)
      }
    } else {
      result.push(item)
    }
  }

  return result
}
```

### Array.prototype.copyWithin()

> copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

第一步：取出需要拷贝的序列
第二部：将序列从 target 依次插入原数组

```js
Array.prototype.__copyWithin = function(target, start = 0, end = this.length) {
  if (target >= this.length) return this

  let toCopy = []
  while (--end >= start) toCopy.push(this[end])

  let length = toCopy.length
  while (length--) this[target++] = toCopy[length]

  return this
}
```

### Array.prototype.every()

> every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```js
Array.prototype.__every = function(cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new Error(cb + ' is not a function')
  }

  let index = 0

  for (let item of this) {
    let result = cb.call(thisArg, item, index, this)
    if (!result) {
      return false
    }
    index++
  }
  return true
}
```

### Array.prototype.fill()

> fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
Array.prototype.__fill = function(value, start = 0, end = this.length) {
  while (start < end) {
    this[start++] = value
  }
  return this
}
```

### Array.prototype.filter()

> filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```js
Array.prototype.__filter = function(cb, thisArg) {
  if (typeof cb !== 'function') {
    throw new Error(cb + ' is not a function')
  }

  let index = 0
  let newArray = []

  for (let item of this) {
    let result = cb.call(thisArg, item, index, this)
    if (result) {
      newArray.push(item)
    }
  }
  return newArray
}
```

### Array.prototype.flat()

> flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

#### 循环 + 递归

```js
Array.prototype.__flat = function(depth = 1) {
  let result = []

  ;(function innerFlat(arr, depth) {
    for (let item of arr) {
      if (depth < 1) {
        result.push(item)
        continue
      }

      if (Array.isArray(item)) {
        innerFlat(item, --depth)
      } else {
        if (item !== undefined) {
          result.push(item)
        }
      }
    }
  })(this, depth)

  return result
}
```

#### reduce + concat

```js
Array.prototype.__flat = function(depth = 1) {
  if (depth < 1) {
    return this
  }

  return this.__reduce((accumulator, currentValue) => {
    if (Array.isArray(currentValue)) {
      return accumulator.concat(currentValue.__flat(--depth))
    } else {
      accumulator.push(currentValue)
      return accumulator
    }
  }, [])
}
```

### Array.prototype.reduce()

> reduce() 方法对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。

```js
Array.prototype.__reduce = function(cb, initialValue) {
  if (typeof cb !== 'function') {
    throw new Error(cb + ' is not a function')
  }
  if (this.length === 0) {
    throw new Error('Reduce of empty array with no initial value')
  }

  let index = 0
  if (arguments.length >= 2) {
    accumulator = arguments[1]
  } else {
    accumulator = this[index++]
  }

  let length = this.length
  while (index < length) {
    accumulator = cb(accumulator, this[index], index++, this)
  }

  return accumulator
}
```

### Array.prototype.sort()

> sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的

V8 引擎使用（原地算法）快排实现 sort 方法
当排序的长度少于 22 时，则使用插入排序

```js
Array.prototype.__sort = function(comparefn) {
  function Compare(a, b) {
    if (typeof comparefn === 'function') {
      return comparefn(a, b)
    }

    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    } else {
      return 0
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
  }

  function InsertionSort(array, from, to) {
    for (let i = from + 1; i < to; i++) {
      let element = array[i]
      for (let j = 0; j < i; j++) {
        if (Compare(element, array[j]) < 0) {
          array.splice(j, 0, array[i])
          array.splice(i + 1, 1)
          break
        }
      }
    }
  }

  function QuickSort(array, from, to) {
    if (to - from <= 22) {
      InsertionSort(array, from, to)
      return
    }

    let pivot_index = getRandomIntInclusive(from, to - 1)
    let pivot_value = array[pivot_index]

    let element = array[from]
    array[from] = array[pivot_index]
    array[pivot_index] = element

    let low_end = from
    let high_start = to

    for (let i = from + 1; i < high_start; ) {
      element = array[i]
      let order = Compare(pivot_value, element)

      if (order > 0) {
        array[i] = array[low_end]
        array[low_end] = element
        ++low_end
        i++
      } else if (order < 0) {
        --high_start
        array[i] = array[high_start]
        array[high_start] = element
      } else {
        i++
      }
    }
    QuickSort(array, from, low_end)
    QuickSort(array, high_start, to)
  }
  QuickSort(this, 0, this.length)
}
```
