## 原型

我们创建的每个函数都有 `prototype` 属性，这个属性指向函数的原型对象。原型对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

在默认情况下，所有原型对象都会自动获得一个 `constructor` 属性，这个属性包含一个指向 `prototype` 属性所在函数的指针。

当调用构造函数创建一个新实例后，该实例的内部将包含一个指针，指向构造函数的原型对象(可以通过实例的 `proto` 来访问构造函数的原型对象)。

```js
function Person(name) {
  this.name = name
}

Person.prototype.sayName = function() {
  console.log(this.name)
}

var person1 = new Person('fyy')
var person2 = new Person('js')
// 构造函数原型对象上的方法和属性被实例共享
person1.sayName()
person2.sayName()
```

![](/img/javascript/proto.webp)
:::warning
对象在查找属性或方法时，首先会从自己本身查找，如果没找到，则会继续查找 **proto** 指针指向的原型对象。

对象可以访问原型对象中的值，但是无法修改它，如果对象添加了一个与原型对象相同的属性名，会就重写原型对象的属性，该属性会屏蔽原型中的那个属性。
:::

## 原型链

假如我们让原型对象等于另一个类型的实例，那么此时原型对象包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。加入另一个原型又是另一个类型的实例，那么上述关系仍然成立，如此层层递进，就构成了实例与原型的链条，这就是原型链的基本概念。

```js
function SuperType() {
  this.type = 'animal'
}

SuperType.prototype.getType = function() {
  console.log(this, type)
}

function subType() {}

subType.prototype = new SuperType()
subType.prototype.sayHello = function() {
  console.log('hello')
}

function SimType(name) {
  this.name = name
}
SimType.prototype = new Subtype()
SimType.prototype.sayHi = function() {
  console.log('hi')
}

var instance = new SimType('fyy')
instance.getType()
```

![](/img/javascript/super.webp)
调用 instance.getType() 会调用以下的搜索步骤:

- 搜索 instance 实例
- 搜索 SimType.prototype
- 搜索 SubType.prototype
- 搜索 SuperType.prototype，找到了 getType 方法

在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链的末端才会停下来。

所有引用类型都继承了 Object，这个继承也是通过原型链实现的。如果在 SuperType.prototype 还没有找到 getType，就会到 Object.prototype 中找。

:::warning
所有引用类型都继承了 Object，这个继承也是通过原型链实现的。如果在 SuperType.prototype 还没有找到 getType，就会到 Object.prototype 中找。
:::
