## XSRF
跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。  
这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。

## 例子
假如一家银行用以运行转账操作的URL地址如下： http://www.examplebank.com/withdraw?account=AccoutName&amount=1000&for=PayeeName

那么，一个恶意攻击者可以在另一个网站上放置如下代码：  
 `<img src="http://www.examplebank.com/withdraw?account=Alice&amount=1000&for=Badman">`  
(使用 img 标签的原因是，img 加载资源不受同源策略的限制，会带上 cookie。所以即使恶意网站无法访问银行网站的 cookie ，但请求也会带上 cookie)  
如果有账户名为Alice的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那么她就会损失1000资金。

透过例子能够看出，攻击者并不能通过CSRF攻击来直接获取用户的账户控制权，也不能直接窃取用户的任何信息。他们能做到的，是欺骗用户的浏览器，让其以用户的名义运行操作。

## 解决方法
### 1、检查请求头中的 refer   
通过请求头中的referer字段判断请求的来源，但是这种方法并不保险，具有一定危险性，因为referer有可能被伪造。

### 2、在请求头中添加用于检验用户信息的 token
在浏览器访问网站A时，网站A设置cookie会增加随机值csrf_token（也就是token）。

Token就是令牌，最大的特点就是随机性，不可预测。

返回给浏览器时，cookie会储存在浏览器。然后前端提交表单或者非表单请求的时候，就将这个token获取到然后发送给后端，后端判断请求中的token和cookie中的token是否一致来判断是否为正常请求，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

为什么放在cookie之后，别的网站获取不到cookie里面的token而自己的网站可以获取token中的cookie呢？

因为cookie采取同源策略，只有相同域名的网页才能获取域名对应的cookie。
