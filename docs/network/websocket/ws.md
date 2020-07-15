ws 是一种易于使用，快速且经过全面测试的 WebSocket 客户端和服务器实现的方法。

## 简单的服务器

```js
const WebSocket = require('ws')

// 实例化 websocket server
const wss = new WebSocket.Server({ port: 8080 })

// 监听 connection 事件
wss.on('connection', function connection(ws) {
  // 监听 message 事件
  ws.on('message', function incoming(message) {
    // 打印出返回的信息
    console.log('received: %s', message)
  })

  ws.send('something')
})

console.log('this websocket server is running on 8080 port...')
```

## 广播

```js
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})
```

## 连接建立过程

- 开启连接

-

## 参考文档

[npm: ws](https://www.npmjs.com/package/ws)
