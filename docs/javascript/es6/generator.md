## Generator 语法
[ECMAScript 6 入门: Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)  

## Generator 管理异步操作  
Generator 函数最大特点就是可以交出函数的执行权（即暂停执行），并且可以通过 next 再收回函数执行权。   
利用这个特点，就可以实现异步操作的控制：
- 异步操作需要暂停的地方，都用 yield 语句注明。
- 异步操作完成的时候，调用 next 方法继续往下执行。  

**下面看看如何使用 Generator 函数，执行一个真实的异步任务。**
```js
   // 定义异步任务
   function aynchronous_task(ms) {
      return new Promise((resolve, reject) => {
         console.log('aynchronous task start');
         setTimeout(() => {
            console.log('aynchronous task over');
            resolve('success!!!!');
         }, ms);
      });
   }

   // 使用 Generator 封装两个异步操作
   var gen = function* () {
      yield aynchronous_task(2000);
      yield aynchronous_task(3000);
   }

   // 管理异步操作的流程，必须等到第一个执行完成再执行第二个
   var generator = gen();
   generator.next().value.then(() => {
      generator.next()
   })
```
因为 Generator 不会自动执行，所以必须手动管理异步操作。  
可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。  

## 自动执行器 co
co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。  
有了 co 模块，可以自动执行 Generator 函数，不用编写 Generator 函数的执行器。
```js
function aynchronous_task(ms) {
   return new Promise((resolve, reject) => {
      console.log('aynchronous task start');
      setTimeout(() => {
         console.log('aynchronous task over');
         resolve('success!!!!');
      }, ms);
   });
}
var gen = function* () {
   yield aynchronous_task(2000);
   yield aynchronous_task(3000);
}

co(gen)
```

### co 模块的原理   
以下是 co 的部分核心代码    
co 的原理就是：异步操作完成时，触发 Promise.then()，然后执行 next() 方法收回函数的执行权。  
```js
function co(gen) {
   return new Promise(function (resolve, reject) {
      gen = gen();
      if (!gen || typeof gen.next !== 'function') return resolve(gen);

      onFulfilled();
      function onFulfilled(res) {
         var ret;
         try {
            ret = gen.next(res);
         } catch (e) {
            return reject(e);
         }
         next(ret);
         return null;
      }

      function onRejected(err) {
         var ret;
         try {
            ret = gen.throw(err);
         } catch (e) {
            return reject(e);
         }
         next(ret);
      }

      function next(ret) {
         if (ret.done) return resolve(ret.value);
         var value = ret.value;
         if (value) return value.then(onFulfilled, onRejected);
         return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' + String(ret.value) + '"'));
      }
   });
}
```

## 总结  
- Generator 函数是一个状态机，封装了多个内部状态。可以使用 next 方法遍历每种状态。
- Generator 函数的执行过程可以看成协程：协程可以称之为“用户级线程”，可以暂停执行，然后用户再次启动从原先的状态继续运行。
- Generator 最重要的一个功能就是用来解决js令人头疼的异步回调问题。  
- 最后借用知乎大佬一个通俗易懂的例子：
>朋友聚会去饭馆，点好菜可以有两种吃法，第一种，等菜上完大家动筷子，第二种，上一道吃一道。如果按第一种吃法，吃饭的程序要等待做饭的程序（饭馆）全部执行完；按第二种吃法，吃饭的程序和做饭的程序就完成了解耦，做饭的做他的，快或者慢，只要上，吃饭的就吃，不依赖一个最终状态。这两种方法不改变菜的品种质量。但流程效益却不同，如果上一道吃一道，吃完的盘子就可以清掉，如果按第一种吃法，上到中间发现桌子不够大，盘子要叠罗汉。而且第一种吃法，喜欢吃某个菜的朋友可以先吃到，不必死等流口水。如果点三道菜，两种吃法或许没太大差异。但是你想像一下，假设点了3000道菜，两种吃法的效率当下立现，如果按第一种吃法，大家都饿死了，即使做好了，桌子（内存）也放不下。  
>这是generator的实际意义，在值的使用者和值的生产者之间，建立效益更高的依赖，规避效益不高的依赖。  
>理解概念先，再去理解概念的应用。  
## 参考资料
[ECMAScript 6 入门: Generator 函数的异步应用](https://es6.ruanyifeng.com/#docs/generator-async)  
[Github: co](https://github.com/tj/co)
