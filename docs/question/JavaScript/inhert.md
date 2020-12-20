## 组合继承

本质上在子类中调用父类的构造函数，并把子类构造函数的原型指向父类的实例

```js
// 组合继承
function SuperType(name) {
  this.name = name
}

SuperType.prototype.sayName = function() {
  console.log(this.name)
}
function SubType(name) {
  SuperType.call(this, name)
  this.age = 20
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

const instance = new SubType('rcw')
console.log(instance)
```

## 原型式继承

提供一个对象成为子类的 `__proto__` 属性, 等于 `Object.create()`

```js
// 原型式继承
function object(origin) {
  function F() {}
  F.prototype = origin
  return new F()
}
```

## 寄生式继承

原理与原型式继承类似

```js
//寄生式继承
function inhert(origin, name) {
  let obj = Object.create(origin)
  obj.name = name
  return obj
}
```

## 寄生组合式继承

解决组合式继承父类构造函数调用两次的问题

```js
function inhert(subType, superType) {
  let prototype = Object.assign({}, superType.prototype)
  SubType.prototype = prototype
  SubType.prototype.constructor = SubType
}

function SuperType(name) {
  this.name = name
}
SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name) {
  SuperType.call(this, name)
  this.age = 20
}

inhert(SubType, SuperType)
const instance = new SubType('rcw')
instance.sayName()
console.log(instance)
```
