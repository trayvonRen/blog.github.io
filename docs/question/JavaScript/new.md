new 关键字会进行如下的操作

- 创建一个空的简单 JavaScript 对象（即{}）；
- 链接该对象（设置该对象的 constructor）到另一个对象 ；
- 将步骤 1 新创建的对象作为 this 的上下文 ；
- 如果该函数没有返回对象，则返回 this。

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
function $new() {
  let obj = new Object()
  let Constructor = Array().shift.call(arguments)

  obj.__proto__ = Constructor.prototype
  const result = Constructor.apply(obj, arguments)

  return typeof result === 'object' ? result : obj
}

console.log($new(Person, 'rcw', 19))
```
