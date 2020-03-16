---
title: JavaScript 的数据类型
comments: true
date: 2020-1-28
top_image: http://img.woyasuohen6.cn/JavaScript-Debugging.jpg
math: true
categories: 
- JavaScript
tags:
- 《JavaScript 高级程序设计》
---

读书笔记   
:pencil:《JavaScript 高级程序设计》  
<!-- more -->

## 基本数据类型（primitive values）
*所有的基本数据类型都是不可变的（值本身无法被改变）。*

### 布尔（Boolean）
布尔表示一个逻辑实体，可以有两个值：true 和 false。

### NULL
JavaScript 中的 null 仅仅是一个代表“无”、“空”或“值未知”的特殊值。
相比较于其他编程语言，JavaScript 中的 null 不是一个“对不存在的 object 的引用”或者 “null 指针”。

### Undefined 类型
undefined 的含义是 未被赋值。
一个没有被赋值的变量会有个默认值 undefined

### 数字类型（Number）
JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值  **-($2^{53}$ -1) 到 ($2^{53}$ -1)**
除了常规的数字，还包括所谓的“特殊数值（“special numeric values”）”也属于这种类型：
- Infinity
    Infinity 代表数学概念中的 无穷大 ∞。是一个比任何数字都大的特殊值。
    ```js
    alert( 1 / 0 ); // Infinity
    ```
- -Infinity
- NaN
    代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果
    ```js
    alert( "not a number" / 2 ); // NaN，这样的除法是错误的
    ```

### BigInt
BigInt 是一种内置对象，它提供了一种方法来表示大于 $2^{53}$ -1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

可以用在一个整数字面量后面加 n 的方式定义一个 BigInt ，如：10n，或者调用函数BigInt()。
```js
const theBiggestInt = 9007199254740991n;
const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n
```

### 字符串类型(String)
JavaScript 的字符串必须被括在引号里。
```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```
### 符号类型(Symbols)
符号(Symbols)是 ECMAScript 第6版新定义的。符号类型是唯一的并且是不可修改的, 并且也可以用来作为 Object 的 key 的值。
```js
Symbol("foo") === Symbol("foo"); // false
```

## 引用类型
### Object
### Array
### Function
### Date
### JSON
### 键控集: Maps, Sets, WeakMaps, WeakSets
## 参考资料
[MDN: JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
《JavaScript 高级程序设计》
《你不知道的 JavaScript》