instanceof 语法为

```js
instance instanceof Person
```

本质上就是比较左边对象原型链有没有右边构造函数的原型对象

```js
function myInstanceOf(instance, Constructor) {
  while (instance.__proto__) {
    if (instance.__proto__ === Constructor.prototype) return true
    instance = instance.__proto__
  }
  return false
}
```
