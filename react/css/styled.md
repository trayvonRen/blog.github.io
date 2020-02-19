为了应对越来越复杂的 web 应用，组件化应运而生，React、Vue 等组件化框架使我们的程序更简单更加可维护。在一个组件内会将结构、样式和逻辑写在一起，虽然这违背了关注点分离的原则，但是这有利于组件间的隔离。为了顺应组件化的潮流，人们开始考虑使用 JS 上编写 CSS，styled components 就是其中一种解决方案。styled components 是一个 React 第三方库，作用是可以将样式写成组件的形式，实现在 JS 上编写 CSS。

## 安装
```js
yarn add styled-components
```

## 基本用法
```js
const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;
 
class App extends React.Component {
    render() {
        return (
            <Title>Hello world</Title>
        )
    }
}
```

## 基于props做样式判断
```js
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

## 作用于后代元素
```js
export const LoginForm = styled.form`
    display: block;
    width: 100%;
    height: 100%;
    padding: 30px;
    .loginButton {
        width: 100%;
    }
`
```



