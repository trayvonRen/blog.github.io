#### 构造函数

```js
var aWebSocket = new WebSocket(url [, protocols]);
```

#### WebSocket.onopen

WebSocket.onopen 属性定义一个事件处理程序，当 WebSocket 的连接状态 readyState 变为“OPEN”时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 事件（建立连接时）触发。

```js
aWebSocket.onopen = function(event) {
  console.log('WebSocket is open now.')
}
```

#### WebSocket.onclose

WebSocket.onclose 属性返回一个事件监听器，这个事件监听器将在 WebSocket 连接的 readyState 变为 CLOSED 时被调用，它接收一个名字为“close”的 CloseEvent 事件。

```js
WebSocket.onclose = function(event) {
  console.log('WebSocket is closed now.')
}
```

#### WebSocket.onerror

在 WebSocket.onerror 属性中，你可以定义一个发生错误时执行的回调函数，此事件的事件名为"error"

```js
WebSocket.onerror = function(event) {
  console.error('WebSocket error observed:', event)
}
```

#### WebSocket.onmessage

WebSocket.onmessage 属性是一个当收到来自服务器的消息时被调用的 EventHandler。它由一个 MessageEvent 调用。

```js
aWebSocket.onmessage = function(event) {
  console.debug('WebSocket message received:', event)
}
```

#### WebSocket.readyState

返回当前 WebSocket 的链接状态，只读。

- 0 (WebSocket.CONNECTING)
  正在链接中
- 1 (WebSocket.OPEN)
  已经链接并且可以通讯
- 2 (WebSocket.CLOSING)
  连接正在关闭
- 3 (WebSocket.CLOSED)
  连接已关闭或者没有链接成功

```js
var readyState = aWebSocket.readyState
```

## 参考资料

[MDN: WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)
