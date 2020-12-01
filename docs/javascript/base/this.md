

在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）。  
this 不能在执行期间被赋值，并且在每次函数被调用时 this 的值也可能会不同。

## this 的绑定方式

### 全局上下文

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。

### 函数上下文

在函数内部，this 的值取决于函数被调用的方式。

#### 函数直接调用

不在严格模式下， this 的值默认指向全局对象，浏览器中就是 window

```js
function f1() {
  return this
}
//在浏览器中：
f1() === window //在浏览器中，全局对象是window
```

严格模式下，如果进入执行环境时没有设置 this 的值，this 会保持为 undefined

```js
function f2() {
  'use strict' // 这里是严格模式
  return this
}

f2() === undefined // true
```

#### 作为对象里的方法被调用

当函数作为对象里的方法被调用时，它们的 this 是调用该函数的对象。

```js
var o = {
  prop: 37,
  f: function() {
    return this.prop
  },
}

console.log(o.f()) // logs 37
```

#### 箭头函数

在箭头函数中，this 与封闭词法环境的 this 保持一致。在全局代码中，它将被设置为全局对象。

#### 原型链中的 this

如果该方法存在于一个对象的原型链上，那么 this 指向的是调用这个方法的对象，就像该方法就在这个对象上一样。

```js
var o = {
  f: function() {
    return this.a + this.b
  },
}
var p = Object.create(o)
p.a = 1
p.b = 4

console.log(p.f()) // 5
```

#### 作为构造函数

当一个函数用作构造函数时（使用 new 关键字），它的 this 被绑定到正在构造的新对象。

```js
function C() {
  this.a = 37
}

var o = new C()
console.log(o.a) // logs 37

function C2() {
  this.a = 37
  return { a: 38 }
}

o = new C2()
console.log(o.a) // logs 38
```

#### 作为一个 DOM 事件处理函数

当函数被用作事件处理函数时，它的 this 指向触发事件的元素

```js
// 被调用时，将关联的元素变成蓝色
function bluify(e) {
  console.log(this === e.currentTarget) // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target)
  this.style.backgroundColor = '#A5D9F3'
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*')

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false)
}
```

### 类上下文

this 在 类 中的表现与在函数中类似，因为类本质上也是函数，但也有一些区别和注意事项。

和其他普通函数一样，方法中的 this 值取决于它们如何被调用。

```js
class Car {
  constructor() {
    // Bind sayBye but not sayHi to show the difference
    this.sayBye = this.sayBye.bind(this)
  }
  sayHi() {
    console.log(`Hello from ${this.name}`)
  }
  sayBye() {
    console.log(`Bye from ${this.name}`)
  }
  get name() {
    return 'Ferrari'
  }
}

class Bird {
  get name() {
    return 'Tweety'
  }
}

const car = new Car()
const bird = new Bird()

// The value of 'this' in methods depends on their caller
car.sayHi() // Hello from Ferrari
bird.sayHi = car.sayHi
bird.sayHi() // Hello from Tweety

// For bound methods, 'this' doesn't depend on the caller
bird.sayBye = car.sayBye
bird.sayBye() // Bye from Ferrari
```

### bind & call & apply

- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

- call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

- apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

## 绑定丢失

### 引用赋值丢失

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo,
}
var bar = obj.foo // 函数别名！
var a = 'oops, global' // a 是全局对象的属性
bar() // "oops, global"
```

### 传参丢失

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一 个例子一样。

```js
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  // fn 其实引用的是foo
  fn() // <-- 调用位置！
}
var obj = {
  a: 2,
  foo: foo,
}
var a = 'oops, global' // a 是全局对象的属性
doFoo(obj.foo) // "oops, global"
```

**解决方法，使用 bind 进行 this 绑定**
