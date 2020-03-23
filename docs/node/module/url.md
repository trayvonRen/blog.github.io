Node.js的URL模块提供了用于分析和解析URL的实用程序。可以调用require('url')来访问它：
```js
const url = require('url');
```

## new URL()  
new URL(input[, base])  
通过将 input 相对于 base 进行解析，创建一个新的 URL 对象。 如果 base 是一个字符串，则解析方法与 new URL(base) 相同。
```js
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

## url.hash 
获取及设置 URL 的片段部分。
```js
const myURL = new URL('https://example.org/foo#bar');
console.log(myURL.hash);
  // 打印 #bar

myURL.hash = 'baz';
console.log(myURL.href);
  // 打印 https://example.org/foo#baz
```

## url.host
获取及设置 URL 的主机部分。
```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.host);
  // 打印 example.org:81

myURL.host = 'example.com:82';
console.log(myURL.href);
  // 打印 https://example.com:82/foo
```

## url.hostname  
获取及设置 URL 的主机名部分。 url.host 和 url.hostname 之间的区别是 url.hostname 不包含端口。  
```js
const myURL = new URL('https://example.org:81/foo');
console.log(myURL.hostname);
  // 打印 example.org

myURL.hostname = 'example.com:82';
console.log(myURL.href);
  // 打印 https://example.com:81/foo
```

## url.href
获取及设置序列化的 URL。
```js
const myURL = new URL('https://example.org/foo');
console.log(myURL.href);
  // 打印 https://example.org/foo

myURL.href = 'https://example.com/bar';
console.log(myURL.href);
  // 打印 https://example.com/bar
```

## url.pathname
获取及设置 URL 的路径部分。
```js
const myURL = new URL('https://example.org/abc/xyz?123');
console.log(myURL.pathname);
  // 打印 /abc/xyz

myURL.pathname = '/abcdef';
console.log(myURL.href);
  // 打印 https://example.org/abcdef?123
```

## url.search
获取及设置 URL 的序列化查询部分。
```js
const myURL = new URL('https://example.org/abc?123');
console.log(myURL.search);
// 打印 ?123

myURL.search = 'abc=xyz';
console.log(myURL.href);
// 打印 https://example.org/abc?abc=xyz
```

