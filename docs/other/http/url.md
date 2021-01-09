## URI

统一资源标识符（英语：Uniform Resource Identifier，缩写：URI）在电脑术语中是一个用于标识某一互联网资源名称的字符串。  
简单来说，URI 是在「某一规则」下标识出一个资源的字符串，通常情况下 URI 有两种实现方式

- URL 通过资源定位
- URN 通过名称编码

### 三者关系

<img src="/img/network/url.png" width="400">

## URL

统一资源定位符（英语：Uniform Resource Locator，缩写：URL；或称统一资源定位器、定位地址、URL 地址，俗称网页地址或简称网址）是因特网上标准的资源的地址（Address），如同在网络上的门牌。

### URL 完整格式

```
[协议类型]://[访问资源需要的凭证信息]@[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]
```

**其中[访问凭证信息]、[端口号]、[查询]、[片段 ID]都属于选填项**  
大多数网页浏览器不要求用户输入网页中“https://”的部分，因为绝大多数网页内容是超文本传输协议文件。  
同样，“80”是超文本传输协议文件的常用端口号，因此一般也不必写明。  
一般来说用户只要键入统一资源定位符的一部分（zh.wikipedia.org/w/index.php?title=Special:随机页面）就可以了。

### URL 样例

```
                    hierarchical part
        ┌───────────────────┴─────────────────────┐
                    authority               path
        ┌───────────────┴───────────────┐┌───┴────┐
  abc://username:password@example.com:123/path/data?key=value&key2=value2#fragid1
  └┬┘   └───────┬───────┘ └────┬────┘ └┬┘           └─────────┬─────────┘ └──┬──┘
scheme  user information     host     port                  query         fragment
```

## URN

统一资源名称（英语：Uniform Resource Name，缩写：URN）是统一资源标识（URI）的历史名字，它使用 urn:作为 URI scheme。

### URN 样例

```
  urn:example:mammal:monotreme:echidna
  └┬┘ └──────────────┬───────────────┘
scheme              path
```

## 参考资料

[HTTP 中 URI 与 URL 的区别](https://juejin.cn/post/6844903933631004680)
