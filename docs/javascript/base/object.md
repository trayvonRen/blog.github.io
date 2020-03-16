---
title: JavaScript 对象
comments: true
date: 2020-1-30
top_image: http://img.woyasuohen6.cn/JavaScript-Debugging.jpg
math: true
categories: 
- JavaScript
tags:
- 《JavaScript 高级程序设计》
---
读书笔记  
:pencil:《JavaScript 高级程序设计》  
一个 Javascript 对象就是键和值之间的映射。键是一个字符串（或者 Symbol） ，值可以是任意类型的值。  
<!--more-->

## 属性类型
### 数据属性
数据属性是键值对，并且每个数据属性拥有下列特性（ attribute ）
数据属性的特性(Attributes of a data property)

| 特性        | 数据类型            | 描述                   |  默认值 |
| :------    | :------              | :------                   | :------    |
|[[Value]]   | 任何Javascript类型   | 包含这个属性的数据值        | undefined |
|[[Writable]]| Boolean               | 如果该值为 false，则该属性的 [[Value]] 特性 不能被改变。|true|
|[[Enumerable]]	| Boolean| 如果该值为 true，则该属性可以用 for...in 循环来枚举 | true |
|[[Configurable]] |	Boolean	|如果该值为 false，则该属性不能被删除，并且 除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变|true

对于这样一个直接定义的属性，就是一个数据属性
```js
    let person = {
        name: 'rcw'
    }
```

可以使用 Object.defineProperty() 修改属性的特性
```js
    let person = {
    	name: 'old'
    }
    Object.defineProperty(person, 'name', {
    	value: 'new'
    })
    console.log(person.name) // new
```
#### 注意
在把 [[Configurable]] 设置为 false 之后，除了 [[Value]] 和 [[Writable]] 以外的特性都不能被改变，否则就会报错
```js
    let person = {
    	name: 'old'
    }
    Object.defineProperty(person, 'name', {
    	configurable: false
    })
    Object.defineProperty(person, 'name', {
    	enumerable: false
    })
    //Uncaught TypeError: Cannot redefine property: name
    // at Function.defineProperty (<anonymous>)
```

### 访问器属性
访问器属性有一个或两个访问器函数 (get 和 set) 来存取数值，并且有以下特性
访问器属性的特性

|特性|	类型|	描述|	默认值
| :------    | :------              | :------                   | :------    |
|[[Get]]	|函数对象或者 undefined	|该函数使用一个空的参数列表，能够在有权访问的情况下读取属性值。|	undefined
|[[Set]]	|函数对象或者 undefined	|该函数有一个参数，用来写入属性值。|	undefined
|[[Enumerable]]|	Boolean|	如果该值为 true，则该属性可以用 for...in 循环来枚举。|	true
|[[Configurable]]|	Boolean	|如果该值为 false，则该属性不能被删除，并且不能被转变成一个数据属性。|	true

访问器属性不能直接定义，必须用 Object.defineProperty()
```js
    let person = {
    	_name: 'old'
    }
    Object.defineProperty(person, 'name', {
    	get () {
    		return this._name
    	},
    	set (val) {
    		this._name = val
    	}
    })
```

## 对象的方法
### getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
```js
    let person = {
    	_name: 'old'
    }
    Object.defineProperty(person, 'name', {
    	get () {
    		return this._name
    	},
    	set (val) {
    		this._name = val
    	}
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
        prop: 42
    };

    Object.freeze(obj);

    obj.prop = 33;
    // Throws an error in strict mode

    console.log(obj.prop);
    // expected output: 42
```
### Object.isFrozen()
Object.isFrozen()方法判断一个对象是否被冻结。
```js
    const obj = {
        prop: 42
    };

    Object.freeze(obj);

   	Object.isFrozen(obj);// true
```
### Object.preventExtensions()
Object.preventExtensions()方法让一个对象变的不可扩展，也就是永远不能再添加新的属性。
```js
    const obj = {
        prop: 42
    };

   Object.preventExtensions(obj);
   obj.newAtr = 1
   //Uncaught TypeError: Cannot add property newAtr, object is not extensible
```
### Object.isExtensible()
方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
```js
    const obj = {
        prop: 42
    };

    Object.preventExtensions(obj);
    Object.isExtensible(obj);//false
```

## 参考资料
[MDN: 数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
《JavaScript 高级程序设计》