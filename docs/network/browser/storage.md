## Web Storage  
`Web Storage API` 提供机制，使浏览器可以保存必要的数据，这些数据必须是键值对的形式，并且键和值都为字符串。  
`Web Storage API` 定义了 `Storage` 接口，为数据的 `CRUD` 提供统一的方法
### Storage 接口
作为 `Web Storage AP` 的接口，`Storage` 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。  
- Storage.length  
返回一个整数，表示存储在 Storage 对象中的数据项数量。  
- Storage.key()  
该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名  
- Storage.getItem()  
该方法接受一个键名作为参数，返回键名对应的值。  
- Storage.setItem()  
该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。  
- Storage.removeItem()  
该方法接受一个键名作为参数，并把该键名从存储中删除。  
- Storage.clear()  
调用该方法会清空存储中的所有键名。 

根据 `Storage` 的具体实现，`Web Storage` 分为两种  
- localStorage   
- sessionStorage 
### localStorage  
`localStorage` 生命周期是永久，这意味着除非用户主动清除 `localStorage` 信息，否则这些信息将永远存在。  
存放数据大小为一般为 5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。  
**如果存放的数据超出了浏览器大小限制，浏览器会抛出错误并且页面会奇卡无比**

#### 用法
```js
// 添加
localStorage.setItem('myCat', 'Tom');
// 读取
let cat = localStorage.getItem('myCat');
// 删除
localStorage.removeItem('myCat');
// 清空全部数据
localStorage.clear();
```

### sessionStorage  
`sessionStorage` 与 `localStorage` 基本相同，不同之处在于 `localStorage` 里面存储的数据没有过期时间限制, 而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。  
- 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。  
- 在当前 `tab` 下跳转新的页面,  `sessionStorage` 会依然保持。
- 在新的 `tab` 下跳转或者打开页面，会创建各自的 `sessionStorage`。  
- 关闭对应浏览器 `tab`，会清除对应的 `sessionStorage`。   

简单来说, `sessionStorage` 只在当前 `tab` 下保持, 只要没有将 `tab` 关闭, `sessionStorage` 会一直存在。 但如果打开新的 `tab` 或者关闭 `tab` , `sessionStorage` 会清除。
#### 用法
```js
// 保存数据到 sessionStorage
sessionStorage.setItem('key', 'value');

// 从 sessionStorage 获取数据
let data = sessionStorage.getItem('key');

// 从 sessionStorage 删除保存的数据
sessionStorage.removeItem('key');

// 从 sessionStorage 删除所有保存的数据
sessionStorage.clear();
```

## Web Cookie  
`HTTP Cookie`（也叫 `Web Cookie` 或浏览器 `Cookie`）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。`Cookie` 使基于无状态的 `HTTP` 协议记录稳定的状态信息成为了可能。    
`Cookie` 大小和个数都有严格的限制,一般来说不超过 4K  
`Cookie` 主要用于以下三个方面：
- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）  
**本文主要介绍 Cookie 的基础用法, 不涉及 Cookie 具体应用**  

### 创建 Cookie  
当服务器收到 `HTTP` 请求时，服务器可以在响应头里面添加一个 `Set-Cookie` 选项。浏览器收到响应后通常会保存下 `Cookie`，之后对该服务器每一次请求中都通过 `Cookie` 请求头部将 `Cookie` 信息发送给服务器。另外，`Cookie` 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。    
服务器使用 `Set-Cookie` 响应头部向用户代理（一般是浏览器）发送 `Cookie` 信息。一个简单的 `Cookie` 可能像这样：  

```
Set-Cookie: <cookie名>=<cookie值>
```

现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的 `Cookie` 信息通过 `Cookie` 请求头部再发送给服务器。
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

### 会话期 Cookie  
会话期 `Cookie` 是最简单的 `Cookie`：浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期 `Cookie` 不需要指定过期时间（Expires）或者有效期（Max-Age）。  
### 持久性 Cookie  
和关闭浏览器便失效的会话期 `Cookie` 不同，持久性 `Cookie` 可以指定一个特定的过期时间（Expires）或有效期（Max-Age）。
```
Set-Cookie: id=a3fWa; Max-Age=300;
// response.setHeader("Set-Cookie",  ['id=a3fWa;Max-Age=300']);
```
:::warning
提示：当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。  
客户端会根据 Expires 或者 Max-Age 自动计算到期时间
:::
### Cookie 的 Secure 和 HttpOnly 标记  
标记为 `Secure` 的 `Cookie` 只应通过被 `HTTPS` 协议加密过的请求发送给服务端。但即便设置了 `Secure` 标记，敏感信息也不应该通过 `Cookie` 传输，因为 `Cookie` 有其固有的不安全性，`Secure` 标记也无法提供确实的安全保障。从 Chrome 52 和 Firefox 52 开始，不安全的站点（http:）无法使用 `Cookie` 的 `Secure` 标记。
```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
// response.setHeader("Set-Cookie",  ['id=a3fWb;Max-Age=300;Secure; HttpOnly']);
```
### Cookie 的作用域  
`Domain` 和 `Path` 标识定义了 `Cookie` 的作用域：即 `Cookie` 应该发送给哪些 `URL`。

`Domain` 标识指定了哪些主机可以接受 `Cookie`。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了 `Domain`，则一般包含子域名。

例如，如果设置 `Domain=mozilla.org`，则 `Cookie` 也包含在子域名中（如 `developer.mozilla.org`）。

`Path` 标识指定了主机下的哪些路径可以接受 `Cookie`（该URL路径必须存在于请求 `URL` 中）。以字符 %x2F ("/") 作为路径分隔符，子路径也会被匹配。

例如，设置 `Path=/docs`，则以下地址都会匹配：
```
/docs
/docs/Web/
/docs/Web/HTTP
```
### JavaScript 通过 Document.cookie 访问 Cookie
通过 `Document.cookie` 属性可创建新的 `Cookie` ，也可通过该属性访问非 `HttpOnly` 标记的 `Cookie`。  
```js
document.cookie = "yummy_cookie=choco"; 
document.cookie = "tasty_cookie=strawberry"; 
console.log(document.cookie); 
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```

### Cookie 跨域  
cookie 默认是无法跨域的，但是可以通过设置相关的 headers 完成跨域      
本案例中实现 `http://localhost:8082` 向 `http://localhost:8081` 发送携带 `Cookie` 的跨域请求
#### 设置 Access-Control-Allow-Origin 
如果需要完成一个跨域操作，必须要在服务器中设置 `Access-Control-Allow-Origin` 响应头  
该响应头的值是允许请求的 ip 地址
```js
response.setHeader("Access-Control-Allow-Origin",  'http://localhost:8082');
```

#### 设置 Access-Control-Allow-Credentials  
在服务器端设置 `Access-Control-Allow-Credentials` 响应头
```js
response.setHeader("Access-Control-Allow-Credentials",  'true');
```
#### 客户端设置跨域 Cookie
如果使用 `XHR` 需要设置 `xhr.withCredentials = true`
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8081/');
xhr.withCredentials = true;
xhr.send();
``` 
如果使用 `fetch`, 需要添加 `credentials: "include"`
```js
fetch('http://localhost:8081/', {
   credentials: "include"
})
.then(function (response) {
   return response.json();
})
.then(function (myJson) {
   console.log(myJson);
});
```

## localStorage & sessionStorage & Cookie 对比 
|              |大小     |持续时间                 |作用域|
|--------------|----------|-----------------------|-----|
|localStorage  |一般为5 M |除非手动清除，否则用不过期|同源：协议，主机(域名)和端口|
|sessionStorage|一般为5 M |随着 Tag 关闭而失效|不仅需要同源，还要同一个 Tag|
|Cookie|一般为4 K|通过 Max-Age，Expires 指定过期时间。如果不指定，则默认为一个会话级别的 Cookie|通过 Domain 和 Path 指定。可以通过特定的方法完成跨域|

[测试当前浏览器 Storage 的大小](http://dev-test.nemikor.com/web-storage/support-test/)

## 总结 
- 不管是 WebStorage 还是 Cookie ，存储的都是键值对，都是字符串类型      
- WebStorage 储存的内容不参与网络请求。而 Cookie 则需要通过响应头设置，并且通过请求头携带传输      
- localStorage 一般用于储存固定不变的页面信息，减少请求数量。也可以用于同域下页面间传值。   
- sessionStorage 一般用于保存会话级别的数据，并且仅用于同一个窗口。(感觉没啥用)    
- Cookie 一般用于与服务器的交互，用于保存用户信息凭证，维持登录态   
## 参考资料 
[MDN: HTTP cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)  
[MDN: Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)  
