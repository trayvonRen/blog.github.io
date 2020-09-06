## 原型链继承

原型链继承的基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

```js
function SuperType() {
  this.name = 'fyy'
  this.color = ['pick', 'blue', 'green']
}
SuperType.prototype.getName = function() {
  return this.name
}
SuperType.prototype.setName = function(name) {
  this.name = name
}
function SubType() {
  this.age = 22
}

SubType.prototype = new SuperType()
SubType.prototype.getAge = function() {
  return this.age
}

SubType.prototype.constructor = SubType
let instance1 = new SubType()
instance1.color.push('yellow')

console.log(instance1.getName()) // fyy
console.log(instance1.color) // ['pick', 'blue', 'green', 'yellow' ]
instance1.setName('nameChange')
console.log(instance1.getName()) // nameChange

let instance2 = new SubType()
console.log(instance2.color) // ['pick', 'blue', 'green', 'yellow' ]
console.log(instance2.getName()) // fyy
```

可以看出 colors 属性会被所有的实例共享(instance1、instance2、...)。

### 缺点

- 通过原型来实现继承时，原型会变成另一个类型的实例，原先的实例属性变成了现在的原型属性，该原型的引用类型属性会被所有的实例共享。
- 在创建子类型的实例时，没有办法在不影响所有对象实例的情况下给超类型的构造函数中传递参数。

## 借用构造函数

```js
function SuperType(name) {
  this.name = name
  this.colors = ['pick', 'blue', 'green']
}

function SubType(name) {
  SuperType.call(this, name)
}

var instance1 = new SubType('fyy')
instance1.colors.push('yellow')
console.log(instance1.colors) // ['pick', 'blue', 'green', 'yellow']

var instance2 = new SubType('jack')
console.log(instance2.colors) // ['pick', 'blue', 'green'];
```

### 优点

- 可以向超类传递参数
- 解决了原型中包含引用类型值被所有实例共享的问题

### 缺点

- 方法都在构造函数中定义，函数复用无从谈起，另外超类型原型中定义的方法对于子类型而言都是不可见的

## 组合继承

```js
function SuperType(name) {
  this.name = name
  this.colors = ['pick', 'blue', 'green']
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function() {
  console.log(this.age)
}
var instance1 = new SubType('fyy', 22)
instance1.colors.push('yellow')
console.log(instance1.colors) // ['pick', 'blue', 'green', 'yellow']
instance1.sayName()

var instance2 = new SubType('jack', 20)
console.log(instance2.colors) // ['pick', 'blue', 'green'];
instance2.sayName()
```

### 缺点

- 无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。

### 优点

- 可以向超类传递参数
- 每个实例都有自己的属性
- 实现了函数复用

## 原型式继承

原型继承的基本思想：借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

在 object() 函数内部，先穿甲一个临时性的构造函数，然后将传入的对象作为这个构造函数的原型，最后返回了这个临时类型的一个新实例，从本质上讲，object() 对传入的对象执行了一次浅拷贝。

ECMAScript5 通过新增 Object.create()方法规范了原型式继承。这个方法接收两个参数：一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象(可以覆盖原型对象上的同名属性)，在传入一个参数的情况下，Object.create() 和 object() 方法的行为相同。

```js
var person = {
  name: 'fyy',
  hobbies: ['reading', 'photography'],
}

var person1 = Object.create(person)
person1.name = 'Jack'
person1.hobbies.push('coding')

var person2 = Object.create(person)
person2.name = 'ume'
person2.hobbies.push('running')
console.log(person.name) // fyy
console.log(person.hobbies) //  ["reading", "photography", "coding", "running"]

console.log(person1.name) // Jack
console.log(person1.hobbies) // ["reading", "photography", "coding", "running"]

console.log(person2.name) // ume
console.log(person2.hobbies) //  ["reading", "photography", "coding", "running"]
```

在没有必要创建构造函数，仅让一个对象与另一个对象保持相似的情况下，原型式继承是可以胜任的。

### 缺点

- 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

## 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部已某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```js
function createAnother(original) {
  var clone = Object.assign({}, original)
  clone.sayHi = function() {
    console.log('hi')
  }
  return clone
}

var person = {
  name: 'fyy',
  hobbies: ['reading', coding],
}

var person2 = createAnother(person)
person2.sayHi() // hi
```

基于 person 返回了一个新对象 -—— person2，新对象不仅具有 person 的所有属性和方法，而且还有自己的 sayHi() 方法。在考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

### 缺点：

- 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而效率低下。
- 同原型链实现继承一样，包含引用类型值的属性会被所有实例共享。

## 寄生组合式继承

所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法，基本思路：

不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示：

```js
function inheritPrototype(subType, superType) {
  var prototype = Object.assign({}, superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}
```

- 第一步：创建超类型原型的一个副本
- 第二步：为创建的副本添加 constructor 属性
- 第三步：将新创建的对象赋值给子类型的原型

至此，我们就可以通过调用 inheritPrototype 来替换为子类型原型赋值的语句：

```js
function SuperType(name) {
  this.name = name
  this.colors = ['pink', 'blue', 'green']
}
//...code
function SuberType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SuberType, SuperType)
```

### 优点

- 只调用了一次超类构造函数，效率更高。避免在 SuberType.prototype 上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。

**因此寄生组合继承是引用类型最理性的继承范式。**
