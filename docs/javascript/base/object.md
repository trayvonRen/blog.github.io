ECMA-262 将对象定义为一组属性的无序集合。严格来说，这意
味着对象就是一组没有特定顺序的值。对象的每个属性或方法都由一
个名称来标识，这个名称映射到一个值。正因为如此（以及其他还未
讨论的原因），可以把 ECMAScript 的对象想象成一张散列表，其中的
内容就是一组名/值对，值可以是数据或者函数。

## 属性类型

### 数据属性

数据属性是键值对，并且每个数据属性拥有下列特性（ attribute ）
数据属性的特性(Attributes of a data property)

| 特性             | 数据类型             | 描述                                                                                             | 默认值    |
| :--------------- | :------------------- | :----------------------------------------------------------------------------------------------- | :-------- |
| [[Value]]        | 任何 Javascript 类型 | 包含这个属性的数据值                                                                             | undefined |
| [[Writable]]     | Boolean              | 如果该值为 false，则该属性的 [[Value]] 特性 不能被改变。                                         | true      |
| [[Enumerable]]   | Boolean              | 如果该值为 true，则该属性可以用 for...in 循环来枚举                                              | true      |
| [[Configurable]] | Boolean              | 如果该值为 false，则该属性不能被删除，并且 除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变 | true      |

对于这样一个直接定义的属性，就是一个数据属性

```js
let person = {
  name: 'rcw',
}
```

可以使用 Object.defineProperty() 修改属性的特性

```js
let person = {
  name: 'old',
}
Object.defineProperty(person, 'name', {
  value: 'new',
})
console.log(person.name) // new
```

#### 注意

在把 [[Configurable]] 设置为 false 之后，除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变，否则就会报错

```js
let person = {
  name: 'old',
}
Object.defineProperty(person, 'name', {
  configurable: false,
})
Object.defineProperty(person, 'name', {
  enumerable: false,
})
//Uncaught TypeError: Cannot redefine property: name
// at Function.defineProperty (<anonymous>)
```

### 访问器属性

访问器属性有一个或两个访问器函数 (get 和 set) 来存取数值，并且有以下特性
访问器属性的特性

| 特性             | 类型                   | 描述                                                                 | 默认值    |
| :--------------- | :--------------------- | :------------------------------------------------------------------- | :-------- |
| [[Get]]          | 函数对象或者 undefined | 该函数使用一个空的参数列表，能够在有权访问的情况下读取属性值。       | undefined |
| [[Set]]          | 函数对象或者 undefined | 该函数有一个参数，用来写入属性值。                                   | undefined |
| [[Enumerable]]   | Boolean                | 如果该值为 true，则该属性可以用 for...in 循环来枚举。                | true      |
| [[Configurable]] | Boolean                | 如果该值为 false，则该属性不能被删除，并且不能被转变成一个数据属性。 | true      |

访问器属性不能直接定义，必须用 Object.defineProperty()

```js
let person = {
  _name: 'old',
}
Object.defineProperty(person, 'name', {
  get() {
    return this._name
  },
  set(val) {
    this._name = val
  },
})
```

## 对象的方法

### getOwnPropertyDescriptor

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```js
let person = {
  _name: 'old',
}
Object.defineProperty(person, 'name', {
  get() {
    return this._name
  },
  set(val) {
    this._name = val
  },
})
console.log(Object.getOwnPropertyDescriptor(person, '_name'))
//configurable: true
//enumerable: true
//value: "old"
//writable: true
console.log(Object.getOwnPropertyDescriptor(person, 'name'))
//configurable: false
//enumerable: false
//get: ƒ ()
//set: ƒ (val)
```

### Object.freeze()

Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

```js
'use strict'
const obj = {
  prop: 42,
}

Object.freeze(obj)

obj.prop = 33
// Throws an error in strict mode

console.log(obj.prop)
// expected output: 42
```

### Object.isFrozen()

Object.isFrozen()方法判断一个对象是否被冻结。

```js
const obj = {
  prop: 42,
}

Object.freeze(obj)

Object.isFrozen(obj) // true
```

### Object.preventExtensions()

Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。

```js
const obj = {
  prop: 42,
}

Object.preventExtensions(obj)
obj.newAtr = 1
//Uncaught TypeError: Cannot add property newAtr, object is not extensible
```

### Object.isExtensible()

方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。

```js
const obj = {
  prop: 42,
}

Object.preventExtensions(obj)
Object.isExtensible(obj) //false
```

### Object.assign()

Object.assign() 方法用于将所有可枚举并且自有的属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。  
Object.assign() 实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

console.log(target)
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget)
// expected output: Object { a: 1, b: 4, c: 5 }
```

### Object.create()

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的 **proto**。

```js
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
  },
}

const me = Object.create(person)

me.name = 'Matthew' // "name" is a property set on "me", but not on "person"
me.isHuman = true // inherited properties can be overwritten

me.printIntroduction()
// expected output: "My name is Matthew. Am I human? true"
```

### Object.is()

Object.is() 方法判断两个值是否为同一个值。如果满足以下条件则两个值相等:

- 都是 undefined
- 都是 null
- 都是 true 或 false
- 都是相同长度的字符串且相同字符按相同顺序排列
- 都是相同对象（意味着每个对象有同一个引用）
- 都是数字且
  - 都是 +0
  - 都是 -0
  - 都是 NaN
  - 或都是非零而且非 NaN 且为同一个值

## 参考资料

[MDN: 数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)  
《JavaScript 高级程序设计》
