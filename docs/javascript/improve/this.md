---
title: JavaScript 的 this 原理
comments: true
date: 2020-1-20
top_image: http://img.woyasuohen6.cn/v2-94396f19a1c112072aec13111d0fe5cc_1200x500.jpg
categories: 
- JavaScript
tags:
- 《你不知道的 JavaScript》
---

读书笔记  
:pencil:《你不知道的 JavaScript》


## 默认绑定

最常用的函数调用类型：独立函数调用

非严格模式下
```js
function f1(){
  return this;
}
//在浏览器中：
f1() === window;   //在浏览器中，全局对象是window

//在Node中：
f1() === global;   
```

严格模式下
```js
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true
```

## 隐式绑定
当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。
```js
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37
```

同样，this 的绑定只受最靠近的成员引用的影响。在下面的这个例子中，我们把一个方法 g 当作对象 o.b 的函数调用。在这次执行期间，函数中的 this 将指向 o.b。事实证明，这与他是对象 o 的成员没有多大关系，最靠近的引用才是最重要的。

```js
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // 42
```

## 显式绑定
可以使用 call，apply 来为调用的方法指定 this  
具体用法如下  
**call**
```js
function.call(thisArg, arg1, arg2, ...) 
\\  arg1，arg2... 为参数列表
```
示例：
```js
function foo() {
    console.log( this.a );
}
var obj = {
    a:2
};
foo.call( obj ); // 2
```
**apply**
```js
func.apply(thisArg, [argsArray])
\\ [argsArray] 为参数数组
```
示例：
```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2
```
**bind**
ECMAScript 5 引入了 Function.prototype.bind。调用f.bind(someObject) 会创建一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。
```js
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); // bind只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```

## new绑定
使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
- 创建（或者说构造）一个全新的对象。
- 这个新对象会被执行[[ 原型]] 连接。
- **这个新对象会绑定到函数调用的 this。**
- **如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。**
```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```

## 特殊情况
**原型链中的 this**  
对于在对象原型链上某处定义的方法，同样的概念也适用。如果该方法存在于一个对象的原型链上，那么 this 指向的是调用这个方法的对象，就像该方法在对象上一样。
```js
var o = {
  f: function() { 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
**箭头函数**  
在箭头函数中，this 与封闭词法环境的 this 保持一致。在全局代码中，它将被设置为全局对象。
```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true
```
**绑定丢失**

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的
bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
```js
function foo() {
    console.log( this.a );
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一
个例子一样。
```js
function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    // fn 其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
doFoo( obj.foo ); // "oops, global"
```
传入系统内置的函数参数也会引起绑定丢失
```js
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

## 参考资料
《你不知道的 JavaScript》  
[MDN: this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)  
[JavaScript.info](https://zh.javascript.info/object-methods#fang-fa-zhong-de-this)  

