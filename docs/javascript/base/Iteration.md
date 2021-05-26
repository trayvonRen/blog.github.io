## 遍历器

遍历器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

### Iterator 的作用

- 为各种数据结构，提供一个统一的、简便的访问接口；
- 使得数据结构的成员能够按某种次序排列；
- 支持 for ... of 循环；

### Iterator 的工作流程：

- 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
- 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
- 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
- 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每一次调用 next 方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束。

** 可以使用 JavaScript 模拟 Iterator 的实现 **

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
  };
}
```

### for ... of 循环

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即 for...of 循环。

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。
原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

## 数组遍历

### 常规方法 for, while 循环

```js
for(let i = 0; i < arr.length; i++) {
    ...
}
```

```js
let i = arr.length;
while(i--) {
    ...
}
```

### 数组方法 forEach, map

forEach() 方法对数组的每个元素执行一次提供的函数。
无返回值，不会改变数组。

```js
let arr = [1,5,8,9]
arr.forEach(item => {
    ...
})
```

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
let arr = [1,5,8,9]
let newArray = arr.map(item => {
    ...
})
```

### for ... of

```js
let arr = [1,5,8,9]
for(let item of arr) {
    ...
}
```

## 字符串遍历

### for while 循环

```js
let str = 'abcdefg';
let strL = str.length;
for (let i = 0; i < strL; i++) {
  console.log(str[i]);
}
```

### for .. of

```js
let str = 'abcdefg';
for (let item of str) {
  console.log(item);
}
```

## 对象遍历

### for ... in

for...in 循环会遍历除 Symbol 以外的可枚举属性（**包括它的原型链上的可枚举属性**）。

> for...in 循环也可以遍历数组
> 但不能保证 for ... in 将以任何特定的顺序返回索引，所以应该避免使用它遍历数组。

```js
let obj = Object.create({
  height: 200,
});

obj.name = 'rcw';
obj.age = 100;
obj[Symbol('money')] = 100;

for (let item in obj) {
  console.log(item, obj[item]);
}
//name rcw
//age 100
//height 200
```

### 使用 Object.keys() 和 Object.values() 遍历

Object.keys() 方法会返回一个由一个给定对象的自身除 Symbol 以外可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

```js
let obj = Object.create({
  height: 200,
});

obj.name = 'rcw';
obj.age = 100;
obj[Symbol('money')] = 100;

console.log(Object.keys(obj));
// [ 'name', 'age' ]
```

Object.values()方法返回一个给定对象自身除 Symbol 以外的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

```js
let obj = Object.create({
  height: 200,
});

obj.name = 'rcw';
obj.age = 100;
obj[Symbol('money')] = 100;

console.log(Object.values(obj));
// [ 'rcw', 100 ]
```

### getOwnPropertyNames

Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

```js
let obj = {};
obj.name = 'rcw';
obj.age = 100;
obj.__msg = 'no enumerable';

Object.defineProperty(obj, '__msg', {
  enumerable: false,
});

console.log(Object.getOwnPropertyNames(obj));
//[ 'name', 'age', '__msg' ]
```

## 总结

- 对于数组的遍历, 理论上来说所有遍历的方法时间复杂度为 O(n).
  但 for 和 while 不会创建新的执行期上下文, 所以它们性能最高。
  因为不同 JavaScript 引擎优化的关系, 其实性能差距也有一定玄学的成分, 所以实际编码中应该以代码的可读性为标准。
- 对于对象的遍历, 因该以实际需求为准(要不要遍历原型链? 要不要 unenumerable 属性? 要不要 Symbol 属性?).
  对于一个经常需要遍历的对象, 可以尝试使用 Map 来替换, 因为它实现了 Iterator 接口。

## 参考资料

[MDN: for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
