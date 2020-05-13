## React 元素
元素是构成 React 应用的最小砖块
>与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。  

可以使用 `React.createElement()` `React.cloneElement()` 来创建 React 元素。   
`JSX` 也会被编译成 `React.createElement()`, 也就是说，所有的 `JSX` 都是 React 元素。

#### DOM元素
```js
const element = <h1>Hello, world</h1>;
```
等价于
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
#### 组件元素
```js
const element = (
  <MyButton color="blue" shadowSize={2}>
    Click Me
  </MyButton>
)
```
等价于
```js
const element = React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```