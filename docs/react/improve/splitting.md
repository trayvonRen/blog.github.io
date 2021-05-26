对你的应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。

## import()

在你的应用中引入代码分割的最佳方式是通过动态 import() 语法。

```jsx
import('./math').then((math) => {
  console.log(math.add(16, 26));
});
```

## React.lazy

React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。

```jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const Login = React.lazy(() => import('./container/login'));
export default function App() {
  return (
    <>
      <Router>
        <Link to='login'>login</Link>
        <Switch>
          <Route path='/login'>
            <Suspense fallback={<div>Loading...</div>}>
              <Login></Login>
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </>
  );
}
```

#### 基于路由的代码分割

决定在哪引入代码分割需要一些技巧。你需要确保选择的位置能够均匀地分割代码包而不会影响用户体验。

一个不错的选择是从路由开始。大多数网络用户习惯于页面之间能有个加载切换过程。你也可以选择重新渲染整个页面，这样您的用户就不必在渲染的同时再和页面上的其他元素进行交互。

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

## Loadable Components

React 虽然支持开箱即用 React.lazy 的，但是它有一些限制，这就是为什么 Loadable Components 存在的原因。

```jsx
import loadable from '@loadable/component';
const OtherComponent = loadable(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

#### `Loadable Components` VS `react.lazy`

| Library             | Suspense | SSR | Library splitting | import(`./${value}`) |
| ------------------- | -------- | --- | ----------------- | -------------------- |
| React.lazy          | ✅       | ❌  | ❌                | ❌                   |
| @loadable/component | ✅       | ✅  | ✅                | ✅                   |
