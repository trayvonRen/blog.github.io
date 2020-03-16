---
title: JavaScript 类型检测
comments: true
date: 2020-1-28
top_image: http://img.woyasuohen6.cn//JavaScript-Debugging.jpg
math: true
categories: 
- JavaScript
tags:
- JavaScript
---
JavaScript 类型检测
基本数据类型：
null，undefined，string，number，boolean，symbol，bigint  
引用数据类型：
Object，Array，Function...
<!-- more -->

## typeof
typeof 运算符返回参数的类型。当我们想要分别处理不同类型值的时候，或者想快速进行数据类型检验时，非常有用。
它支持两种语法形式：

作为运算符：typeof x。
函数形式：typeof(x)。
```js
// number
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof Number(1) === 'number'; // Number 会尝试把参数解析成数值

// bigint
typeof 42n === 'bigint';

// string
typeof '' === 'string';
typeof 'bla' === 'string';
typeof `template literal` === 'string';
typeof '1' === 'string'; // 注意内容为数字的字符串仍是字符串
typeof (typeof 1) === 'string'; // typeof 总是返回一个字符串
typeof String(1) === 'string'; // String 将任意值转换为字符串，比 toString 更安全

// boolean
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(1) === 'boolean'; // Boolean() 会基于参数是真值还是虚值进行转换
typeof !!(1) === 'boolean'; // 两次调用 ! (逻辑非) 操作符相当于 Boolean()

// symbol
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

//null
typeof null === 'object';

// object
typeof {a: 1} === 'object';

//array date regex
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';
typeof /regex/ === 'object'; 

// function
typeof function() {} === 'function';
typeof class C {} === 'function'
typeof Math.sin === 'function';
```
几点重要的说明：
- 对于基本数据类型，都能正确返回其类型，除了 null 返回 object
- 对于引用数据类型，都返回 object，除了函数返回 function
- 基本包装类型属于引用类型，所以返回 object
```js
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';
```
- 即使一个变量没有定义，typeof 也会返回 undefined
- 对于暂存死区的变量，typeof 会报错
```js
console.log(typeof num)
let num = 1
// Cannot access 'num' before initialization
```
**可见 typeof 能准确检测除 null 外的所有基本数据类型，但对于多数引用数据类型，显得无能为力**


## Object.prototype.toString
每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。

为了每个对象都能通过 Object.prototype.toString() 来检测，需要使用 Object.prototype.toString.call 来调用
```js
    var toString = Object.prototype.toString;
    toString.call(new Date); // [object Date]
    toString.call(Math); // [object Math]
    toString.call([]) //[object Array]
    toString.call({}) //[object Object]
    toString.call(() => {}) //[object Function]


    toString.call(undefined); // [object Undefined]
    toString.call(null); // [object Null]
    toString.call(true); // [object Boolean]
    toString.call(1); // [object Number]
    toString.call("string") // [object String]
    toString.call(Symbol()) // [object Symbol]
```
**可见，可以使用 toString 对几乎所有的数据类型进行检测，而且十分准确**
## 其他检测方法
**判断是否为数组**
```js
    function isArray(val) {
        return Array.isArray(val)
    }
```

**判断是否为基本数据类型：(null 除外)**
```js
    function isPrimitive(value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'symbol' ||
            typeof value === 'boolean'
        )
    }
```

**判断是否为引用数据类型**
```js
    function isObject (obj) {
        return obj !== null && typeof obj === 'object'
    }
```

**判断是否为 NaN**
```js
isNaN()
```

## 参考资料
[MDN: typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
[javascript.info](https://zh.javascript.info/types)