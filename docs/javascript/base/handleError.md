## Error 实例对象
JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。

```js
var err = new Error('出错了');
err.message // "出错了"
```

上面代码中，我们调用Error构造函数，生成一个实例对象err。Error构造函数接受一个参数，表示错误提示，可以从实例的message属性读到这个参数。抛出Error实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。

JavaScript 语言标准只提到，Error实例对象必须有message属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对Error实例还提供name和stack属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

## Error 类型
[MDN: ERROR](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

## try-catch
try...catch语句标记要尝试的语句块，并指定一个出现异常时抛出的响应。

```js
try {
  nonExistentFunction();
}
catch(error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
```

## throw
throw语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（throw之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个catch块。如果调用者函数中没有catch块，程序将会终止。

```js
function getRectArea(width, height) {
  if (isNaN(width) || isNaN(height)) {
    throw "Parameter is not a number!";
  }
}

try {
  getRectArea(3, 'A');
}
catch(e) {
  console.error(e);
  // expected output: "Parameter is not a number!"
}
```

