## 笔试题

### 一、leetcode 最小栈原题

### 二、检查 rbg，hex，hsl 三种格式的颜色代码是否合法

其他题目忘记了

## 校招一面现场面试

### 一、介绍项目的设计方案，为什么这样设计

### 二、说两个 ES6 语法

1、class

说一下 class 集成和 ES 5 继承的区别

2、let const

说一下变量提升和暂时性死区

### 三、== ， === 的区别

#### [0] === [0]? 为什么？

[参考答案](https://www.trayvonren.top/javascript/base/comparisons.html)

### 四、浏览器渲染过程

1、解析 dom tree

2、解析 cssom

3、合成 render tree

4、Layout 重绘

5、Paint 回流

6、 Compositing 合成

[参考答案](https://www.trayvonren.top/other/browser/open.html)

### 五、不同域名下单点登录

当时没答出来

### 六、在 a.q.com 加载 b.q.com 的图片带不带 cookie

带！

#### 有什么安全问题

xsrf 攻击

#### 如何让它不带 cookie

设置 SameSite attribute

#### 如何解决 xsrf 攻击

[参考答案](https://www.trayvonren.top/other/security/xsrf.html)

### 七、简单说一说快排的过程

#### 平均时间复杂度

nlgn

#### 最坏时间复杂度

n^2

#### 什么情况下最坏

完全反序

基准是最大值或最小值的时候

#### 如何避免

我说选一个随机值当基准，他说不行 😭

### 八、算法题

用 2 个玻璃球找到从一 100 层的大楼的某一层落下刚好会摔碎，如何制定最优策略？

有一栋 100 层高的大楼，给你两个完全相同的玻璃球，假设从某一层开始丢下玻璃球会摔碎，怎么利用手中的两个玻璃球，用什么最优策略（最坏情况下最少次数）知道这个临界的层是第几层

[知乎解答](https://www.zhihu.com/question/31855632)

### 九、HTTPS 加密过程

[参考答案](https://www.trayvonren.top/other/network/tls.html)

### 十、写代码如何保持代码风格

eslint

#### 如何检查 git commit 格式

pre-commit

#### 有没有使用过前端自动化测试

无

#### 项目如何发布，有没有使用过 CL/CD

打包之后直接 copy 给后端 😂，无

<!-- ### 十、按顺序发送一系列请求 -->
