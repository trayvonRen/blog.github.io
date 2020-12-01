## Web 性能检测 API

### PerformanceTiming

使用 PerformanceTiming 可以获取页面的关键时间节点，并计算相关耗时

![](/img/other/timing-overview.png)

```js
console.log(performance.timing)
```

### PerformanceObserver()

PerformanceObserver 用于观察性能时间线，以便在记录新的性能指标时发出通知, 这在采集性能数据时经常用到。  
比较常用的是观察主线程 long task 的执行情况，如下：

```js
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log(entry)
  }
})

observer.observe({ entryTypes: ['longtask'] })
```

### Navigator.connection

Navigator.connection 是只读的，提供一个 NetworkInformation 对象来获取设备的网络连接信息。例如用户设备的当前带宽或连接是否被计量， 这可以用于基于用户的连接来选择高清晰度内容或低清晰度内容。

```js
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
var type = connection.effectiveType

function updateConnectionStatus() {
  console.log('Connection type changed from ' + type + ' to ' + connection.effectiveType)
  type = connection.effectiveType
}

connection.addEventListener('change', updateConnectionStatus)
```

## 参考资料

[MDN: PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)
