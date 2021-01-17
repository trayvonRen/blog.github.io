函数是一个附带可被调用功能的常规对象。

## Function

Function 构造函数创建一个新的 Function 对象。直接调用此构造函数可用动态创建函数，但会遭遇来自 eval 的安全问题和相对较小的性能问题。然而，与 eval 不同的是，Function 构造函数只在全局作用域中运行。

```js
function fn1(a, b) {
  if (a > b) {
    return a
  } else {
    return b
  }
}
```

等价于

```js
const fn2 = new Function(
  'a',
  'b',
  `if(a > b) {
    return a;
} else {
    return b
}`
)
```

每个 JavaScript 函数实际上都是一个 Function 对象。运行 (function(){}).constructor === Function 便可以得到这个结论。

```js
;(function() {}.constructor === Function)
// true
```

## 不同类型的函数

#### 匿名函数是一个没有函数名的函数：

```js
function () {};
// or using the ECMAScript 2015 arrow notation
() => {};
```

#### 命名函数是具有函数名称的函数

```js
function foo() {}
// or using the ECMAScript 2015 arrow notation
const foo = () => {}
```

#### 内部函数是另一个函数内的函数（下面例子中的 square）。

```js
function addSquares(a, b) {
  function square(x) {
    return x * x
  }
  return square(a) + square(b)
}
//Using ECMAScript 2015 arrow notation
const addSquares = (a, b) => {
  const square = x => x * x
  return square(a) + square(b)
}
```

#### 递归函数是调用自身的函数。

```js
function loop(x) {
  if (x >= 10) return
  loop(x + 1)
}
//Using ECMAScript 2015 arrow notation
const loop = x => {
  if (x >= 10) return
  loop(x + 1)
}
```

#### 立即调用函数表达式（IIFE）是一种被加载到浏览器的编译器之后直接调用的函数。

```js
// Error (https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)
/*
​function foo() { 
    console.log('Hello Foo'); 
}();
*/

;(function foo() {
  console.log('Hello Foo')
})()
;(function food() {
  console.log('Hello Food')
})()
```

## Function 方法

### Function.prototype.apply()

### Function.prototype.bind()

### Function.prototype.call()

改变 [this](https://woyasuohen6.cn/javascript/improve/this.html#%E6%98%BE%E5%BC%8F%E7%BB%91%E5%AE%9A) 指向

### Function.name

function.name 属性返回函数实例的名称。

```js
function doSomething() {}
doSomething.name // "doSomething"
```

对于匿名函数，会返回 `anonymous`

```js
new Function().name // "anonymous"
```

变量可以推断匿名函数名

```js
var f = function() {}
console.log(f.name)
```

### Function.length

length 属性指明函数的形参个数。

```js
var f = function(props1, props2, ...res) {}
console.log(f.length)
//2
```

## Arguments

arguments 是一个对应于传递给函数的参数的类数组对象。
arguments 对象是所有（非箭头）函数中都可用的局部变量。你可以使用 arguments 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引 0 处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```js
arguments[0]
arguments[1]
arguments[2]
```

参数也可以被设置：

```js
arguments[1] = 'new value'
```

在非严格模式下， arguments 和实参会相互影响

```js
var f = function(name) {
  name = '1'
  console.log(name, arguments[0])
  arguments[0] = '2'
  console.log(name, arguments[0])
}
f('rcw')
//1 1
//2 2
```

严格模式下，argumments 和 实参互不影响

```js
var f = function(name) {
  'use strict'
  name = '1'
  console.log(name, arguments[0])
  arguments[0] = '2'
  console.log(name, arguments[0])
}
f('rcw')
//1 rcw
//1 2
```

### arguments.length

函数调用时传入函数的实参数量

```js
var f = function(name) {
  console.log(arguments.length)
}
f('rcw', 12)
//2
```

### arguments.callee

arguments.callee 属性包含当前正在执行的函数。

### arguments.callee.caller

arguments.callee.caller 返回调用该函数的函数

:::warning
在严格模式下，第 5 版 ECMAScript (ES5) 禁止使用 arguments.callee()。  
因为 arguments.callee 会导致一些性能问题。
:::
