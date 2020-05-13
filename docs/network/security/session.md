## Session  
在计算机网络中， `session` 是一个抽象概念，开发者为了实现中断和继续等操作，将 `user agent` 和 `server` 之间一对一的交互，抽象为“会话”，进而衍生出“会话状态”，也就是 `session` 的概念。    
而我们今天常说的 `Session`，是借助 `cookie` 或者其他手段实现的，一种会话状态的具体实现，最常见的就是用户登录态的维持。

## 实现原理 
一个简单的 `Session` 有以下过程  
- 浏览器向服务器发送请求，携带一定的用户认证信息（用户名，密码）  
- 服务器核对用户信息，确认无误后，生成一个 `session_id`, 并储存在内存中。（也可储存在数据库）  
- 服务器响应浏览器请求，并设置 `Set-Cookie` 的值为 `session_id`。
- 浏览器每次发送请求会把 `Cookie` 带上，服务器再比对储存的 `session_id` 值，判断是否已经登录。
![](/img/security/session.jpg)

### 注意点  
- 服务器一般会设置一个较短的过期时间，防止客户端 `Cookie` 被人窃取。 
- 在 `Cookie` 没有被禁用的情况下，这一切对于前端来说几乎是没有感知的，因为浏览器会自动携带 `Cookie`。 
- 如果浏览器禁用 `Cookie`，可以把 `session_id` 放在 `url` 中携带，或者放在请求体中（比较麻烦）。  
- 只要 `Cookie` 没过期，用户登录态一直存在。  

## 总结  
#### 安全性    
如果 `Cookie` 被窃取了，攻击者就可以登录账号。  
为了解决这个问题，可以采用以下方法  
- 设置 `Cookie` 有效期不要过长  
- 设置 `Cookie` 的 `Secure`  属性为 `true`。  
标记为 `Secure` 的 `Cookie` 只应通过被 `HTTPS` 协议加密过的请求发送给服务端。  
- 设置 `Cookie` 的 `HttpOnly` 属性为 `true`。  
为避免跨域脚本 (XSS) 攻击，通过 `JavaScript` 的 `Document.cookie API` 无法访问带有 `HttpOnly` 标记的 `Cookie`，它们只应该发送给服务端。
- 加密 `Cookie`   
万一攻击者窃取了 `Cookie`，经过加密的 `Cookie` 可以防止攻击者破解里面的用户信息。
:::danger
无论如何，都不应该把敏感信息放在 Cookie 中
:::
### 缺点
- 服务器需要维护 `Session` 数据，如果需要单点登录，就要把 `Session` 写入数据库持久层，做 `Session` 共享。
- `Cookie` 在跨域场景下表现不好。
- 用户有可能会禁用 `Cookie`。
- `Cookie` 数量和长度的限制。每个 `domain` 最多只能有20条 `Cookie`，每个 `cookie` 长度不能超过4KB。
