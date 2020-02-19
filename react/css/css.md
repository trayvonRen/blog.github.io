## style 属性
style 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。这与 DOM 中 style 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞。
```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```
**通常不推荐将 style 属性作为设置元素样式的主要方式，style 在 React 应用中多用于在渲染过程中添加动态计算的样式。**  
[官方文档](https://zh-hans.reactjs.org/docs/dom-elements.html#style)

## className
需要在当前组件开头使用import引入css文件。
```css
import React, { Component } from "react";
import TestChidren from "./TestChidren";
import "@/assets/css/index.css";

class Test extends Component {
  constructor(props, context) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <div className="link-name">123</div>
        <TestChidren>测试子组件的样式</TestChidren>
      </div>

    );
  }
}

export default Test;
```
这种方式引入的css样式，会作用于当前组件及其所有后代组件。

## styled-components
[styled-components](./styled.md)

## css-module
[css-module](./module.md)