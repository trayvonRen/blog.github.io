`Service Worker` 一般作为 `web` 应用程序、浏览器和网络（如果可用）之间的代理服务。他们旨在（除开其他方面）创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。如果用户离线时，可以返回已缓存的资源，提高用户体验。  

## 简单入门  
[在线演示](/sw/index.html)  
### 注册 worker  
在代码的入口 `app.js` 中注册一个 worker 
```js
// 在注册之前确保 service worker 是支持
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/sw/sw.js', {
      scope: '/sw/'
   }).then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
   }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
   });
}
```   
- 使用 `ServiceWorkerContainer.register()` 函数来注册站点的 `service worker`，`service worker` 只是一个驻留在我们的 `app` 内的一个  `JavaScript` 文件。在这个例子中，`service worker` 就是 `sw.js` 文件
- `scope` 参数是选填的，可以被用来指定你想让 `service worker` 控制的内容的子目录。 在这个例子例，我们指定了 '/sw-test/'，表示 app 的 origin 下的所有内容。
- .then() 函数链式调用我们的 `promise`，当  `promise` resolve 的时候，里面的代码就会执行。

:::warning
`service worker` 工作在 `worker context` 环境中，没有 `dom` 的访问权限，一般只能负责处理有关 `Service Worker` 的逻辑 
::::

### 安装 worker  
在你的 `service worker` 注册之后，浏览器会尝试自动为你的页面或站点安装并激活它, 并触发 `install` 事件。  
在 sw.js 中 
```js
this.addEventListener('install', function(event) {
   event.waitUntil(
     caches.open('version1').then(function(cache) {
       return cache.addAll([
         '/sw/',
         '/sw/index.html',
         '/sw/app.js',
         '/sw/picture.jpeg'
       ]);
     })
   );
 });
 ```
 - 这里我们 新增了一个 `install` 事件监听器，接着在事件上接了一个 `ExtendableEvent.waitUntil()`  方法——这会确保 `Service Worker` 不会在 `waitUntil()` 里面的代码执行完毕之前安装完成。
 -  `waitUntil()` 内，我们使用了 `caches.open()` 方法来创建了一个叫做 `version1` 的新的缓存，将会是我们的站点资源缓存的第一个版本。它返回了一个创建缓存的 promise，当它 resolved 的时候，我们接着会调用在创建的缓存示例上的一个方法  `addAll()`，这个方法的参数是一个由一组相对于 origin 的 URL 组成的数组，这些 URL 就是你想缓存的资源的列表。
 - 如果 `promise` 被 rejected，安装就会失败，这个 `worker` 不会做任何事情。
 - 当安装成功完成之后， `service worker` 就会激活。

### 自定义请求的响应
现在你已经将你的站点资源缓存了，你需要告诉 `service worker` 让它用这些缓存内容来做点什么。  
每次任何被 `service worker` 控制的资源被请求到时，都会触发 `fetch` 事件，这些资源包括了指定的 `scope` 内的文档，和这些文档内引用的其他任何资源。  
可以利用 `fetch` 实现一层代理，即使在断网环境，也可以返回所需要的资源
![](/img/network/sw-fetch.png)  
#### 返回缓存的资源
在 sw.js 中，添加以下内容  
```js
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});
```
`caches.match(event.request)` 允许我们对网络请求的资源和 `cache` 里可获取的资源进行匹配，查看是否缓存中有相应的资源。这个匹配通过 `url` 和 `vary header`进行。

如果没有在缓存中找到匹配的资源，你可以告诉浏览器对着资源直接去 `fetch` 默认的网络请求：
```js
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

```

如果没有在缓存中找到匹配的资源，同时网络也不可用，你可以用 match() 把一些回退的页面作为响应来匹配这些资源，比如：
```js
caches.match('/fallback.html');
```

### 更新资源
#### 安装新的 worker
如果你的 `service worker` 已经被安装，但是刷新页面时有一个新版本的可用，新版的 `service worker` 会在后台安装，但是还没激活。当不再有任何已加载的页面在使用旧版的 `service worker` 的时候，新版本才会激活。    

把你的新版的 `service worker` 里的  `install` 事件监听器改成下面这样, 注意需要更换版本号
```js
this.addEventListener('install', function(event) {
   event.waitUntil(
     caches.open('version2').then(function(cache) {
       return cache.addAll([
         '/sw/',
         '/sw/index.html',
         '/sw/app.js',
         '/sw/picture.jpeg'
       ]);
     })
   );
 });
```  
当安装发生的时候，前一个版本依然在响应请求，新的版本正在后台安装，我们调用了一个新的缓存 `v2`，所以前一个 `v1` 版本的缓存不会被扰乱。  

当没有页面在使用当前的版本的时候，这个新的 `service worker` 就会激活并开始响应请求。  

#### 删除旧缓存  
还有个 activate 事件, 在新版本激活时触发，可以用来清除旧缓存  
```js
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['version2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
```

## 总结
- `service worker` 核心是利用 `fetch` api 充当用户资源的代理，可以拦截 `ajax` 请求, 控制 app 使用缓存的资源
- 更新资源需要重新注册 `service worker`, 并且在 `service worker` 激活时删除缓存的旧资源
- 新的 `service worker` 不会立马生效，必须等到所有的依赖旧版本的页面全部关闭才会激活 

## 参考资料
[MDN: 使用 Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)  