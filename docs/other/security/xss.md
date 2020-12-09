## XSS

XSS 是跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为 XSS。恶意攻击者往 Web 页面里插入恶意 Script 代码，当用户浏览该页之时，嵌入其中 Web 里面的 Script 代码会被执行，从而达到恶意攻击用户的目的。

XSS 的最常见表现形式为在 html 标签中插入恶意 `<script>`，从而执行内部的代码，获取一些用户信息，包括 cookie、storage 等。

通常有：

- 在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。
- 在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。
- 在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。
- 在标签的 href、src 等属性中，包含 javascript: 等可执行代码。
- 在 onload、onerror、onclick 等事件中，注入不受控制代码。
- 在 style 属性和标签中，包含类似 background-image:url("javascript:..."); 的代码（新版本浏览器已经可以防范）。
- 在 style 属性和标签中，包含类似 expression(...) 的 CSS 表达式代码（新版本浏览器已经可以防范）。

## XSS 分类

### 反射型 XSS

攻击步骤：攻击者构造出特殊的 URL，其中包含恶意代码。当用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回浏览器，之后用户浏览器收到响应后解析执行混入其中的恶意代码，恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户行为，调用目标网站接口执行攻击者指定的操作。

常见于通过 URL 传递参数的功能，如网站搜索、跳转等。由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

### 存储型 XSS

攻击步骤：攻击者将恶意代码提交到目标网站的数据库中，用户打开网站是，网站服务端将恶意代码从数据库中取出，拼接在 HTML 中返回浏览器，之后用户浏览器收到响应后解析执行混入其中的恶
意代码，恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户行为，调用目标网站接口执行攻击者指定的操作。

代码是存储在服务器中的，如在个人信息或发表文章等地方，加入代码，如果没有过滤或过滤不严，那么这些代码将储存到服务器中，用户访问该页面的时候触发代码执行。

### DOM based XSS

攻击步骤：攻击者构造出特殊的 URL，其中包含恶意代码，用户打开带有恶意代码的 URL，用户浏览器打开带有恶意代码的 URL，之后用户浏览器收到响应后解析执行，前端 JS 取出 URL 中的恶意代码并执行，恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户行为，调用目标网站接口执行攻击者指定的操作。

- DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

## XSS 危害

- 挟持 cookie 或者其他身份凭证伪造用户发送请求
- 获取用户信息：ip 地址，浏览器信息，安装软件，安装插件。

## XSS 防御

### 开启 cookie HttpOnly

不能解决 XSS,但是可以防止 cookie 劫持

### 敏感请求使用验证码

确认使用户本人发送的请求

### 输入检查

对表单，参数进行检查

- 控制输入内容的长度
- 控制输入内容的格式
- 检查特殊字符串并进行过滤和转义: < > javascript 等等  
  [XSS Filter Evasion Cheat Sheet](https://owasp.org/www-community/xss-filter-evasion-cheatsheet)

### 输出（渲染）检查

> 本质上时实现数据与视图分离，不要危险的代码直接渲染到视图上

#### 尽量做到前端渲染，不让后端直接渲染界面

#### :sparkles:渲染时进行 html 转义：htmlEncode

在使用 .innerHTML、.outerHTML、document.write() 之前使用 html 转码：htmlEncode

防止 script 直接输入到 dom 上

```js
function HTMLEnCode(str) {
  var s = ''
  if (str.length == 0) return ''
  s = str.replace(/&/g, '&gt;')
  s = s.replace(/</g, '&lt;')
  s = s.replace(/>/g, '&gt;')
  s = s.replace(/    /g, '&nbsp;')
  s = s.replace(/\'/g, "'")
  s = s.replace(/\"/g, '&quot;')
  s = s.replace(/\n/g, '<br>')
  return s
}
function HTMLDeCode(str) {
  var s = ''
  if (str.length == 0) return ''
  s = str.replace(/&gt;/g, '&')
  s = s.replace(/&lt;/g, '<')
  s = s.replace(/&gt;/g, '>')
  s = s.replace(/&nbsp;/g, '    ')
  s = s.replace(/'/g, "'")
  s = s.replace(/&quot;/g, '"')
  s = s.replace(/<br>/g, '\n')
  return s
}

let container = document.getElementById('view')
result = `<script>alert(1313)<` + `/script>`
container.innerHTML = result // bad
container.innerHTML = HTMLEnCode(result) // good
```

如果用 Vue/React 技术栈，并且不使用 v-html/dangerouslySetInnerHTML 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。
