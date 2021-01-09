HTTP/1.1 以及更早的 HTTP 协议报文都是语义可读的。  
在 HTTP/2 中，这些报文被嵌入到了一个新的二进制结构，帧。  
帧允许实现很多优化，比如报文头部的压缩和复用。即使只有原始 HTTP 报文的一部分以 HTTP/2 发送出来，每条报文的语义依旧不变，客户端会重组原始 HTTP/1.1 请求。  
因此用 HTTP/1.1 格式来理解 HTTP/2 报文仍旧有效。

## HTTP 报文

用于 HTTP 协议交互的信息被称为 HTTP 报文。  
请求端（客户端）的 HTTP 报文叫做请求报文，响应端（服务器端）的叫做响应报文。  
HTTP 报文本身是由多行（用 CR+LF 作换行符）数据构成的字符串文本。

HTTP 报文大致可分为报文首部和报文主体两块。两者由最初出现的空行（CR+LF）来划分。  
通常，并不一定要有报文主体。  
<img src="/img/network/message.png" width="400">  
**HTTP 分为请求报文和响应报文两种**  
<img src="/img/network/two.png" width="400">

## 请求报文

### 请求行

包含用于请求的方法，请求 URI 和 HTTP 版本。

### 请求头（首部字段）

为服务端表达其他信息的可选头部 headers。

### 请求体

对于一些像 POST 这样的方法，报文的 body 就包含了发送的资源，这与响应报文的 body 类似。

**一个 get 请求报文（不包含请求体）**  
<img src="/img/network/get.png" width="400">

## 响应报文

### 状态行

包含用于请求的方法，请求 URI 和 HTTP 版本。

### 响应头（首部字段）

HTTP headers，与请求头部类似。

### 响应体

可选项，比起请求报文，响应报文中更常见地包含获取的资源 body。

**一个响应报文**  
<img src="/img/network/res.png" width="400">

## 参考资料

《图解 http》  
[MDN：HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview)
