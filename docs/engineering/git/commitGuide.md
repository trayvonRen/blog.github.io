## [Angular 团队的规范](https://link.zhihu.com/?target=https%3A//github.com/angular/angular.js/blob/master/DEVELOPERS.md%23-git-commit-guidelines)

_message 格式_

<!-- prettier-ignore -->
```html
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### 标题行: 必填, 描述主要修改类型和内容

#### type

- feat: 新特性

- fix: 修改问题

- refactor: 代码重构

- docs: 文档修改

- style: 代码格式修改, 注意不是 css 修改

- test: 测试用例修改

- chore: 其他修改, 比如构建流程, 依赖管理

#### scope (选填)

commit 影响的范围, 比如: route, component, utils, build

#### subject

commit 的概述

### 主体

commit 具体修改内容, 可以分为多行

### 尾部

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接

## 一些花里胡哨的工具

[git-emoji](https://gitmoji.carloscuesta.me/) 可以再 commit msg 中增加 emoji 图标 :pencil: :rocket: :fire:

[Commitizen](https://www.jianshu.com/p/d264f88d13a4) 可以以选项的方式自动生成 commit msg

## 参考资料

https://juejin.im/post/5afc5242f265da0b7f44bee4
