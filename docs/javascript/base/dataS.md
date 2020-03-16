---
title: JavaScript 中的数据结构
comments: true
date: 2020-2-28
# top_image: http://img.woyasuohen6.cn/JavaScript-Debugging.jpg
# math: true
categories: 
- JavaScript
tags:
- JavaScript
---

线性结构：数组，字符串    
非线性结构：对象， Maps, Sets, WeakMaps, WeakSets   
<!-- more -->

## 数组
数组是在很多编程语言中应用广泛的数据存储结构。一般而言，数组是一组有序数据的线性集合，长度是固定的，并且只能储存同一种数据类型。 

但是在 JavaScript 中，数组是一种使用整数作为键(integer-key-ed)的常规对象。具体表现在：
- 没有固定的类型
- 没有固定的长度
- 甚至可以不用数字当索引😂
```js
let arr = [];
arr['name'] = 'rcw' // [name: "rcw"]
```

但是，我们在实际操作中应该避免使用这些令人迷惑的特性。

## 字符串
JavaScript的字符串类型用于表示文本数据。它是一组16位的无符号整数值的“元素”。在字符串中的每个元素占据了字符串的位置。第一个元素的索引为0，下一个是索引1，依此类推。字符串的长度是它的元素的数量。
```js
let str = 'abc';
str[1] // 'b'
```
不同于类 C 语言，JavaScript 字符串是不可更改的。这意味着字符串一旦被创建，就不能被修改。
字符串在 JavaScript 中本身为基本数据类型，但因为包装对象的存在，你可以以对象的形式来调用字符串的方法和属性。
```js
let str = 'abc';
str.length // '3'
```
## 标准的对象
一个 Javascript 对象就是键和值之间的映射.。键是一个字符串（或者 Symbol） ，值可以是任意类型的值。 这使得对象非常符合 哈希表（散列表）。

## Sets

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

## WeakSets
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## Map 
JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。

## WeakMap 
WeakMap结构与Map结构类似，也是用于生成键值对的集合。
WeakMap与Map的区别有两点。

- WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
- WeakMap的键名所指向的对象，不计入垃圾回收机制。