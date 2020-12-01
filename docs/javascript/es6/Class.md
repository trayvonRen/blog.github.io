ECMAScript 6 新引入的 class 关键字具有正式定义类的能力。类（class）是 ECMAScript 中新的基础性语法糖结构，因此刚开始接触时可能会不太习惯。虽然 ECMAScript 6 类表面上看起来可以支持正式的面向对象编程，但实际上它背后使用的仍然是原型和构造函数的概念。

```js
// 类声明
class Person {}
// 类表达式
const Animal = class {}
```

虽然函数声明可以提升，但类定义不能提升另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制：

```js
{
  function FunctionDeclaration() {}
  class ClassDeclaration {}
}
console.log(FunctionDeclaration); //
FunctionDeclaration() {}
console.log(ClassDeclaration); //
ReferenceError: ClassDeclaration is not defined1
```

## 类的组成

### 类构造函数

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

### 实例成员

每次通过 new 调用类标识符时，都会执行类构造函数。在这个函数内部，可以为新创建的实例（ this ）添加“自有”属性。至于添加什么样的属性，则没有限制。另外，在构造函数执行完毕后，仍然可以给实例继续添加新成员。

每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享:

```js
class Person {
  constructor() {
    // 这个例子先使用对象包装类型定义一个字符串
    // 为的是在下面测试两个对象的相等性
    this.name = new String('Jack')
    this.sayName = () => console.log(this.name)
    this.nicknames = ['Jake', 'J-Dog']
  }
}
let p1 = new Person(),
  p2 = new Person()
p1.sayName() // Jack
p2.sayName() // Jack
console.log(p1.name === p2.name)
// false
console.log(p1.sayName === p2.sayName)
// false
console.log(p1.nicknames === p2.nicknames)
// false
p1.name = p1.nicknames[0]
p2.name = p2.nicknames[1]
p1.sayName() // Jake
p2.sayName() // J-Dog
```

### 原型方法与访问器

为了在实例间共享方法，类定义语法把在类块中定义的方法作为
原型方法。

```js
class Person {
  constructor() {
    // 添加到this的所有内容都会存在于不同的实例上
    this.locate = () => console.log('instance')
  }
  // 在类块中定义的所有内容都会定义在类的原型上
  locate() {
    console.log('prototype')
  }
}
let p = new Person()
p.locate() // instance
Person.prototype.locate() // prototype
```

类定义也支持获取和设置访问器。语法与行为跟普通对象一样：

```js
class Person {
  set name(newName) {
    this.name_ = newName
  }
  get name() {
    return this.name_
  }
}
let p = new Person()
p.name = 'Jake'
console.log(p.name) // Jake
```

### 静态类方法

可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。与原型成员类似，每个类上只能有一个静态成员。静态类成员在类定义中使用 static 关键字作为前缀。在静态成员中， this 引用类自身

```js
class Person {
  constructor(age) {
    this.age_ = age
  }
  sayAge() {
    console.log(this.age_)
  }
  static create() {
    // 使用随机年龄创建并返回一个Person实例
    return new Person(Math.floor(Math.random() * 100))
  }
}
console.log(Person.create()) // Person {age_: ... }
```

### 非函数原型和类成员

虽然类定义并不显式支持在原型或类上添加成员数据，但在类定
义外部，可以手动添加

```js
class Person {
  sayName() {
    console.log('${Person.greeting}${this.name}')
  }
}
// 在类上定义数据成员
Person.greeting = 'My name is'
// 在原型上定义数据成员
Person.prototype.name = 'Jake'
let p = new Person()
p.sayName() // My name is Jake
```

## 继承

类本质上也是函数，可以把它理解为构造函数。

类和原型上定义的方法都会带到派生类。this 的值会反映调用相应方法的实例或者类

```js
class Vehicle {}
// 继承类
class Bus extends Vehicle {}
let b = new Bus()
console.log(b instanceof Bus) // true
console.log(b instanceof Vehicle) // true
function Person() {}
// 继承普通构造函数
class Engineer extends Person {}
let e = new Engineer()
console.log(e instanceof Engineer) // true
console.log(e instanceof Person) // true
```

### 抽象基类

有时候可能需要定义这样一个类，它可供其他类继承，但本身不会被实例化。虽然 ECMAScript 没有专门支持这种类的语法 ，但通过 new.target 也很容易实现。new.target 保存通过 new 关键字调用的类或函数。通过在实例化时检测 new.target 是不是抽象基类，可以阻止对抽象基类的实例化：

```js
// 抽象基类
class Vehicle {
  constructor() {
    console.log(new.target)
    if (new.target === Vehicle) {
      throw new Error('Vehicle cannot bedirectly instantiated')
    }
  }
}
```

### 继承内置类型

ES6 类为继承内置引用类型提供了顺畅的机制，开发者可以方便地扩展内置类型

```js
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this[i], this[j]] = [this[j], this[i]]
    }
  }
}
let a = new SuperArray(1, 2, 3, 4, 5)
console.log(a instanceof Array) //true
console.log(a instanceof SuperArray) //true
console.log(a) // [1, 2, 3, 4, 5]
a.shuffle()
console.log(a) // [3, 1, 4, 5, 2]
```
