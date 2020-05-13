## 缓存位置
缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

### Service Worker
优先级最高的一种缓存，需要调用 `Service Worker` Api才可使用  
严格意义上来讲，`Service Worker` 也是储存在硬盘的缓存，但是它的优先级最高，并且可以无限期的持久缓存，缓存行为可以通过客户端更加准确精细地控制，所以非常适合开发离线 web app  

具体使用方法：  
[入门 Service Worker](https://woyasuohen6.cn/network/browser/service.html#%E7%AE%80%E5%8D%95%E5%85%A5%E9%97%A8)  

### Memory Cache  
`Memory Cache` 是在内存中的缓存，主要包含的是当前中页面已经获取到的资源，内存中的缓存速度很快，但是持续性很短，会随着进程释放而释放。一旦我们关闭了 `Tab`页，内存中的缓存也就被释放了。

需要注意的是，内存缓存在缓存资源时不关心 `HTTP` 缓存头 `Cache-Control`，同时资源的匹配也并非仅仅是对 `URL` 做匹配，还可能会对 `Content-Type` , `CORS` 等其他特征做校验。

### Disk Cache
`Disk Cache` 也是存储在硬盘中的缓存，读取速度稍慢，但是容量和时效性较 `Memory Cache` 更好。在所有的浏览器缓存中，`Disk Cache` 覆盖面基本是最大的。他会根据 `HTTP Header` 中的字段判断哪些资源需要缓存，哪些资源不请求直接使用，哪些资源已经过期需要重新请求，即 `HTTP` 协议头中的缓存字段主要影响的是 `Disk Cache` 的。

### Push Cache  
Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。

## 缓存过程
浏览器第一次向服务器发起该请求后拿到请求结果后，将请求结果和缓存标识存入浏览器缓存，浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的。具体过程如下图：

![第一次发起 http 请求](/img/network/3174701-de3d6e025582103a.webp)  
由上图我们可以知道：  
- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识  
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中  


这里我们根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强缓存和协商缓存。  
## 强缓存  
强缓存：不会向服务器发送请求，直接从缓存中读取资源，在 `chrome` 控制台的 `Network` 选项中可以看到该请求返回 `200` 的状态码，并且 `Size` 显示 `from disk cache` 或 `from memory cache`。  
强缓存可以通过设置两种 `HTTP Header` 实现：`Expires` 和 `Cache-Control`。  
### Expires  
`Expires` 响应头包含日期/时间， 即在此时候之后，响应过期。    
`Expires` 是 `Web` 服务器响应消息头字段，在响应 `http` 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。   
### Cache-Control  
`Cache-Control` 通用消息头字段，被用于在 `http` 请求和响应中，通过指定指令来实现缓存机制。  
|指令|含义|
|--------|-----|
|public|表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存|
|private|表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）|
|no-cache|在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)|
|no-store|缓存不应存储有关客户端请求或服务器响应的任何内容，即不使用任何缓存|
|max-age=seconds|设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)|
|s-maxage=seconds|覆盖max-age或者Expires头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它|
|max-stale=seconds|表明客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间|
|min-fresh=seconds|表示客户端希望获取一个能在指定的秒数内保持其最新状态的响应|  

#### 示例
##### 禁止缓存  
发送如下响应头可以关闭缓存。此外，可以参考Expires和Pragma消息头。
```
Cache-Control: no-store
```

##### 缓存静态资源
对于应用程序中不会改变的文件，你通常可以在发送响应头前添加积极缓存。这包括例如由应用程序提供的静态文件，例如图像，CSS文件和JavaScript文件。
```
Cache-Control:public, max-age=31536000
```

##### 需要重新验证(协商缓存)
指定 `no-cache` 或 `max-age=0` 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。这意味着每次都会发起 `HTTP` 请求，但当缓存内容仍有效时可以跳过 `HTTP` 响应体的下载。
```
Cache-Control: no-cache
Cache-Control: max-age=0
```
### Expires 和 Cache-Control 两者区别  
其实这两者差别不大，区别就在于 `Expires` 是 `http1.0` 的产物，`Cache-Control` 是 `http1.1` 的产物，两者同时存在的话，`Cache-Control` 优先级高于`Expires`


## 协商缓存
强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，那我们如何获知服务器端内容是否已经发生了更新呢？此时我们需要用到协商缓存策略。

**协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：**  
- 协商缓存生效，返回 `304` 和 `Not Modified`    

<img src="/img/network//3174701-660fd163329d080b.webp" width="400px">      

- 协商缓存失效，返回 `200` 和请求结果   

<img src="/img/network//3174701-24953079cfebf2bf.webp" width="400px">      

协商缓存可以通过设置两种 `HTTP Header` 实现：`Last-Modified` 或者 `ETag` 
### Last-Modified & If-Modified-Since
`The Last-Modified`  是一个响应首部，其中包含源头服务器认定的资源做出修改的日期及时间。 它通常被用作一个验证器来判断接收到的或者存储的资源是否彼此一致。  
![](/img/network/3174701-bb7148a4431ccda1.webp)  
浏览器下一次请求这个资源，浏览器检测到有 `Last-Modified` 这个 `header`，于是添加 `If-Modified-Since` 这个 `header`，值就是 `Last-Modified` 中的值；服务器再次收到这个资源请求，会根据 `If-Modified-Since` 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果`If-Modified-Sinc `e的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200
### ETag & If-None-Match
`Etag` 是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，`Etag` 就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的 `Etag` 值放到 `request header` 里的 `If-None-Match` 里，服务器只需要比较客户端传来的 `If-None-Match` 跟自己服务器上该资源的 `ETag` 是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现 `ETag` 匹配不上，那么直接以常规 `GET 200` 回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果 `ETag` 是一致的，则直接返回304知会客户端直接使用本地缓存即可。

如果给定URL中的资源更改，则一定要生成新的 `Etag` 值。 因此 `Etags` 类似于指纹，也可能被某些服务器用于跟踪。 比较 `etags` 能快速确定此资源是否变化，但也可能被跟踪服务器永久存留。  


### Etag 和 Last-Modified 的区别
原理上 `Etag` 和 `Last-Modified` 没有区别，都是通过请求头发送一个描述信息，服务器通过验证这个描述信息来判断是否过期   
但 `Etag` 根据资源的内容生成一段标识， `Last-Modified` 直接使用资源的修改日期  
- 在精确度上：`Etag` 优于 `Last-Modified`。
- 性能上： `Last-Modified` 优于`Etag`。因为生成 `Etag`的算法要耗费时间。

### 使用 Etag 的 demo
`nodejs` 使用 `Etag` 控制协商缓存
```js
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require("mime")
const etag = require('etag')

http.createServer((request, response) => {
   // 解析请求路径
   var pathname = __dirname + decodeURI(request.url)
   // 跳转默认页面
   if (pathname === __dirname + '/') {
      pathname = __dirname + "/index.html";
   }

   fs.exists(pathname, exists => {
      // 如果资源存在，返回请求的资源
      if (exists) {
         // 读取请求文件
         fs.readFile(pathname, (err, data) => {
            if (err) console.error(err.stack)

            // 获取文件当前的 Etag
            const Etag = etag(data)

            // 如果当前文件 Etag 与请求的 Etag 相同，返回 304 命中协商缓存
            if (Etag === request.headers['if-none-match']) {
               response.statusCode = 304;
            } else {
               // 如果 Etag 不相同或者第一次请求文件，则返回静态资源并更新 Etag
               response.setHeader("Cache-Control", "no-cache");
               response.setHeader("Etag", Etag);
               response.writeHead(200, {
                  "Content-Type": mime.getType(pathname)
               });
               response.on('error', err => {
                  console.error(err.stack)
               });
               response.write(data);
            }
            response.end()
         });
         // 如何资源不存在，返回 404
      } else {
         response.writeHead(404, {
            "Content-Type": "text/plain;charset=utf-8"
         });
         response.end(path.basename(pathname) + "\n文件不存在！");
      }
   });
}).listen(80);

console.log('server is listening on 80 port!');
```
## 总结
- 缓存的意义在于减少重复的请求，缩短请求时间，提高用户体验。
- 强缓存一般用于不常变动文件。如果服务器资源有更新，可以通过修改资源文件名来使强缓存失效。 （比如 webpack 打包时，生成新的 hash）
- html 文件一般不会设置强缓存，因为对于 `Spa` 来说，`index.html` 是整个 `app` 的入口，使用强缓存可能会导致资源无法更新。 
- 协商缓存需要与服务器交互，一般用于经常会变动的文件，使用协商缓存可以确保资源更新。  
- 如果需要开发离线的 web 应用，请使用 `service worker`。
