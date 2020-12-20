一开始不创建实例对象，当第一次使用时才创建
用一个变量标志当前是否已经为某个类创建过对象，如果已创建则在下次获取时返回之前创建的实例对象

```js
// 单例模式，所有的页面共享一个 websocket 链接
// 所以只需要一个 websocket 链接即可
export default class ERPWebSocket {
  constructor(param = 'NoGroup') {
    this.instance = new WebSocket('url')
    this.description = 'erpwebsocket'
    this.param = param
    this.instance.onmessage = function(event) {
      // websocket 的业务逻辑
    }
  }
  static getInstance(param) {
    // 如果没有创建过 websocket 链接，或者需要更新 websocket 的 param，则建立一个新的链接
    if (!this.instance || this.instance.param !== param) {
      this.instance = new this(param)
    }
  }
}
```
