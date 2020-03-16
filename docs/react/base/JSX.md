---
title: 深入理解 JSX
comments: true
date: 2020-3-15
math: true
categories: 
- react
tags:
- react
---

## React.createElement
```js
React.createElement(
  type,
  [props],
  [...children]
)
```

创建并返回指定类型的新 React 元素。其中的类型参数既可以是标签名字符串（如 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。

实际上，JSX 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖。  
如下 JSX 代码：
```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
会编译为：
```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

对于一个包含很多子节点的元素：
```js
function Button(props){
	return <h1>Hello, {props.name}</h1>;
}

function hello() {
  return (
    <div onClick={() => {}} style={ {color: 'red'}}>
      <h1>hello</h1>
      <h2>hello</h2>
      <Button></Button>
    </div>
  )
}
```

会被编译为：
```js
function Button(props) {
  return React.createElement("h1", null, "Hello, ", props.name);
}

function hello() {
  return React.createElement(
     "div",
      {
         onClick: () => {},
         style: {
            color: 'red'
         }
      }, 
      React.createElement("h1", null, "hello"), 
      React.createElement("h2", null, "hello"), 
      React.createElement(Button, null)
   );
}
```
所有的子节点都会被 `React.createElement` 当作 `children` 参数接受

## JSX 中的 Props
对于 JSX 模板上的所有属性，都会被编译成 props  
例如：  
```js
function hello() {
  return (
    <div onClick={() => {}} style={ {color: 'red'}} name={'rcw'}>
    </div>
  )
}
```
会编译成:   
```js
function hello() {
  return React.createElement("div", {
    onClick: () => {},
    style: {
      color: 'red'
    },
    name: 'rcw'
  });
}
```

**可以使用 Props 传递 JSX 元素实现 `VUE` 中的插槽**
```js

class App extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.left
        }     
      </div>
    )
  }
}


ReactDOM.render(
  <App name="rcw"  
    left={(<h1>1</h1>)}
    right={(<h2>2</h2>)}
   >
  </App>,
  document.getElementById('root')
);
```

## JSX 中的子元素
包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件。有几种不同的方法来传递子元素：
### 字符串字面量
```js
<MyComponent>Hello world!</MyComponent>

// props.children: "Hello world!"
```
### JSX 子元素  
子元素允许由多个 JSX 元素组成。
```js
<App name="rcw">
    <div>
      Here is a list:
    </div>
    <h1>titke</h1>
    <button>submit</button>
</App>
```
### JavaScript 表达式作为子元素  
JavaScript 表达式可以被包裹在 {} 中作为子元素

**如果表达式为 JSX 数组，可以实现列表渲染**
```js
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```
**可以使用逻辑运算符实现条件渲染**
```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

### 函数作为子元素
```js
// 调用子元素回调 numTimes 次，来重复生成组件
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
### 布尔类型、Null 以及 Undefined 将会忽略
### 关于子元素的渲染
对于内置的 HTML 元素，JSX 总会渲染它的所有子元素  
对于用户自定义的组件元素，必须手动调用 `this.props.children` 来渲染子元素，当然你可以利用这一特性在渲染之前任意操作子元素。 
```js
class Wrapper extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
        <div>正文</div>
      </div>
    )
  }
}
class App extends React.Component {
  render() {
    return (
      <Wrapper>
        <h1>title</h1>
      </Wrapper>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
```


