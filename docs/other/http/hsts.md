## HSTS

HTTP Strict Transport Security（通常简称为 HSTS）是一个安全功能，它告诉浏览器只能通过 HTTPS 访问当前资源，而不是 HTTP。

- **用户第一次通过 HTTPS 请求，服务器响应 Strict-Transport-Security 头，浏览器记录下这些信息。**

- 用户后面尝试访问这个网站时，**浏览器会自动劫持这个请求**，把 HTTP 替换为 HTTPS。

- 当 HSTS 头设置的过期时间到了，后面通过 HTTP 的访问恢复到正常模式，不会再自动跳转到 HTTPS。
  每次浏览器接收到 Strict-Transport-Security 头，它都会更新这个网站的过期时间，所以网站可以刷新这些信息，防止过期发生。

:::warning
Chrome、Firefox 等浏览器里，HSTS 重定向策略是产生一个 **307 Internal Redirect（内部跳转）**，自动跳转到 HTTPS 请求。

<img width="400" src="/img/other/internal.png">
:::

## HSTS 缺点

使用了 HSTS 也不是绝对安全的，用户如果是第一次访问站点，此时浏览器还没有记录`Strict Transport Security` 头部，浏览器就不会重定向到 HTTPS 请求。

## HSTS Preloading

HSTS preload list 是 Chrome 维护的 HSTS 预载入列表，用户访问某个网站，如果浏览器 HSTS preload list 预存了该网站的域名，即使用户从来没有访问过该网站，浏览器也会自动重定向到 HTTPS 访问。

将网站加入 HSTS Preloading list 需要在[hstspreload.org](https://hstspreload.org/)网站上进行申请。

## 参考资料

[MDN: HTTP Strict Transport Security](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/HTTP_Strict_Transport_Security)
