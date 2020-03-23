## Node.js 事件
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

## EventEmitter  
所有能触发事件的对象都是 EventEmitter 类的实例。   
这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。
事件的命名通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性键。   
当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。   
被调用的监听器返回的任何值都将会被忽略并丢弃。

例子，一个简单的 EventEmitter 实例，绑定了一个监听器。 `eventEmitter.on()` 用于注册监听器， `eventEmitter.emit()` 用于触发事件。
```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});
myEmitter.emit('event');
```

