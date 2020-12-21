## 水平垂直居中的方案

### 绝对定位+margin 反向偏移

position 元素已知宽度

```html
  <style>
      .wrap {
        position: relative;
        background-color: orange;
        width: 300px;
        height: 300px;
      }
      .example2 {
        background-color: red;
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -50px 0 0 -50px;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="example2"></div>
    </div>
  </body>
```

### flex 布局

```css
.warp {
  background-color: #ff8c00;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center; /*使子项目水平居中*/
  align-items: center; /*使子项目垂直居中*/
}
```

### 绝对布局

```css
.example3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
  width: 100px;
  height: 100px;
  margin: auto;
}
```

### 给子元素相对定位，在通过 translaY（）得到垂直居中

```css
.example3 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: red;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
```

## DOCTYPE 的作用是什么？

DOCTYPE 声明中指出阅读程序应该用什么规则来解释文档中的标记。在 Web 文档的情况下，阅读程序通常是浏览器或者校验器这样的一个程序，规则是 W3C 所发布的一个文档类型定义 DTD 中包含的规则。制作一个符合标准的网页，DOCTYPE 声明是是不可缺少的，它在 Web 设计中用来说明你用的 XHTML 或者 HTML 是什么版本，如果不做 DOCTYPE 声明或声明不正确的情况下，将有可能导致你的标识与 CSS 失效，从而令你网页的布局变乱，造成网页在浏览器中不能正常的显示。我们还可以通过 W3C 提供的验证工具来检查页面的内容是否符合在 DOCTYPE 中声明的标准。
