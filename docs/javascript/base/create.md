## 创建对象

### 直接创建

```js
var person = {
  name: '',
  age: 29,
  sayName: function() {
    console.log(this.name)
  },
}
```

### 工厂模式

```js
function createPerson(name, age, job) {
  let o = new Object()
  o.name = name
  o.age = age
  o.job = j
  o.sayName = function() {
    console.log(this.name)
  }
  return o
}
```

### 构造函数模式

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }

let person = new Person('rcw', 29, 'student')
```

构造函数在创建对象的时候会经历以下 4 个步骤：

- 创建一个新对象
- 将构造函数的作用域赋给新对象（this 指向新对象）
- 执行构造函数中的代码（为对象添加新属性）
- 返回这个新对象

构造函数和普通函数的区别仅在于调用它们的方式不同，任何函数，只要通过 new 操作符来调用，那它就可以作为构造函数；任何函数，如果不通过 new 操作符来调用，那么它就是一个普通函数。

实例可以访问 constructor(构造函数)属性，该属性返回创建实例对象的构造函数。

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

var person = new Person('fyy', 22)
console.log(person.constructor === Person) // true
```

有一点需要说明的是，除了基本数据类型的 constructor 外( null 和 undefined 无 constructor 属性)，constructor 属性是可以被重写的。因此检测对象类型时，instanceof 操作符比 constructor 更可靠一些。

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }

let person = new Person('rcw', 29, 'student')
person.constructor = null
console.log(person.constructor === null)
```

## 原型模式

```js
Person.prototype.name = 'rcw1'

Person.prototype.sayName = function() {
  console.log(this.name)
}

let person1 = new Person()
```

## 组合使用构造函数模式和原型模式

```js
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
}

Person.prototype.color = 'black'

Person.prototype.sayName = function() {
  console.log(this.name)
}

let person1 = new Person('rcw', 29, 'student')
let person2 = new Person('rcw', 29, 'student')
```
