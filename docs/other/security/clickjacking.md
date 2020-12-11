点击劫持 (Clickjacking) 技术又称为界面伪装攻击 (UI redress attack )，是一种视觉上的欺骗手段。攻击者使用一个或多个透明的 iframe 覆盖在一个正常的网页上，然后诱使用户在该网页上进行操作，当用户在不知情的情况下点击透明的 iframe 页面时，用户的操作已经被劫持到攻击者事先设计好的恶意按钮或链接上。攻击者既可以通过点击劫持设计一个独立的恶意网站，执行钓鱼攻击等；也可以与 XSS 和 CSRF 攻击相结合，突破传统的防御措施，提升漏洞的危害程度。

![](/img/other/2166980-06491836dedab318.webp)

攻击者实施攻击的一般步骤是：

- 黑客创建一个网页利用 iframe 包含目标网站；
  - 隐藏目标网站，使用户无法察觉到目标网站存在；
  - 构造网页，诱骗用户点击特定按钮 (图 1 中的 PLAY!按钮)；
- 用户在不知情的情况下点击按钮，触发执行恶意网页的命令。

## 防御措施

### frame busting

防止一个网站从功能上载入一个 frame 框架

```js
if (top.location != location) top.location = self.location
```

### X-Frame-Options

服务器端 header X-Frame-Options 可以允许或禁止在 frame 中显示页面。

它必须被完全作为 HTTP-header 发送：如果浏览器在 HTML `<meta>` 标签中找到它，则会忽略它。因此，`<meta http-equiv="X-Frame-Options"...>` 没有任何作用。

#### DENY

始终禁止在 frame 中显示此页面。

#### SAMEORIGIN

允许在和父文档同源的 frame 中显示此页面。

#### ALLOW-FROM domain

允许在来自给定域的父文档的 frame 中显示此页面。

### 验证码

验证码永远滴神
