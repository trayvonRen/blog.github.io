ECMAScript 有 6 种简单数据类型（也称为原始类型）：Undefined 、Null 、Boolean 、Number 、String 和 Symbol。  
很多引用数据类型：Date、RegExp、基本包装类型（Boolean 、Number 、String）、Object、Array、Global、Math、Map、WeakMap、Set、WeakSet、Function

## typeof 操作符

对一个值使用 typeof 操作符会返回下列字符串之一：

"undefined" 表示值未定义；  
"boolean" 表示值为布尔值；  
"string" 表示值为字符串；  
"number" 表示值为数值；  
"object" 表示值为对象（而不是函数）或 null ；  
"function" 表示值为函数；  
"symbol" 表示值为符号。

- 对于基本数据类型，都能正确返回其类型，除了 null 返回 object
- 对于引用数据类型，都返回 object，除了函数返回 function
- 基本包装类型属于引用类型，所以返回 object
- **即使一个变量没有定义，typeof 也会返回 undefined**
- 对于暂存死区的变量，typeof 会报错

**可见 typeof 能准确检测除 null 外的所有基本数据类型，但对于多数引用数据类型，显得无能为力**

## Object.prototype.toString()

每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中 type 是对象的类型。

```js
var toString = Object.prototype.toString
toString.call(new Date()) // [object Date]
toString.call(Math) // [object Math]
toString.call([]) //[object Array]
toString.call({}) //[object Object]
toString.call(() => {}) //[object Function]
toString.call(function fn() {}) //[object Function]

toString.call(undefined) // [object Undefined]
toString.call(null) // [object Null]
toString.call(true) // [object Boolean]
toString.call(1) // [object Number]
toString.call('string') // [object String]
toString.call(Symbol()) // [object Symbol]
toString.call(new Map()) // [object Map]
toString.call(new WeakMap()) // [object WeakMap]
toString.call(new Set()) // [object Map]
toString.call(new WeakSet()) // [object WeakMap]
```

## instanceof

instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。  
因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

使用 instance of 可以检测对象的继承类型

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
const auto = new Car('Honda', 'Accord', 1998)

console.log(auto instanceof Car)
// expected output: true

console.log(auto instanceof Object)
// expected output: true
```

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
function isObject(obj) {
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
