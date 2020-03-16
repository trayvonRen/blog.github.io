---
title: 词法作用域
comments: true
date: 2020-1-20
top_image: http://img.woyasuohen6.cn/v2-94396f19a1c112072aec13111d0fe5cc_1200x500.jpg
categories: 
- JavaScript
tags:
- 《你不知道的 JavaScript》
---

读书笔记  
:pencil:《你不知道的 JavaScript》
<!-- more -->

## 作用域
作用域是程序代码中变量解析的规则。
作用域共有两种主要的工作模型。
- 第一种是最为普遍的，被大多数编程语言所采用的词法作用域。
- 另外一种叫作动态作用域，仍有一些编程语言在使用（比如Bash 脚本、Perl 中的一些模式等）。

## 词法作用域
简单地说，词法作用域就是定义在词法阶段的作用域。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的）。

**JavaScript 采用的就是词法作用域**
```js
function foo(a) {
    var b = a * 2;
    function bar(c) {
        console.log( a, b, c );
    }
    bar( b * 3 );
}
foo( 2 ); // 2, 4, 12
```
在这个例子中有三个逐级嵌套的作用域。为了帮助理解，可以将它们想象成几个逐级包含的气泡。
![](/img/javascript/scope.jpg)
1、包含着整个全局作用域，其中只有一个标识符：foo。
2、包含着foo 所创建的作用域，其中有三个标识符：a、bar 和b。
3、包含着bar 所创建的作用域，其中只有一个标识符：c。

在词法作用域中，首先会查找当前作用域下的变量，然后依次向上级查找，直到全局作用域为止。

## 参考资料
《你不知道的 JavaScript》