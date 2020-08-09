React Router 中有三种类型的组件： router components, route matching components，和 navigation components。

你在 Web 应用程序中使用的所有组件都应该从 react-router-dom 中导入。

## router components(路由器组件)

每个 React Router 应用程序的核心应该是路由器组件。  
对于 Web 项目，react-router-dom 提供`<BrowserRouter>`和`<HashRouter>`路由器。  
两者之间的主要区别在于它们存储 URL 和与 Web 服务器通信的方式。

- `<BrowserRouter>`使用常规 URL 路径。
  这些通常是外观最好的 URL，但是它们要求正确配置服务器。
  具体来说，您的 Web 服务器需要在所有由 React Router 客户端管理的 URL 上提供相同的页面。
  Create React App 在开发中即开即用地支持此功能，并附带有关如何配置生产服务器的说明。
- `<HashRouter>`将当前位置存储在 URL 的哈希部分中，因此 URL 看起来像 http://example.com/#/your/page。
  由于哈希永远不会发送到服务器，因此这意味着不需要特殊的服务器配置。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return <h1>Hello React Router</h1>
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
```

## Route Matchers Components(路由匹配组件)

有两个路由匹配组件：`<Switch>` 和 `<Route>`。  
呈现`<Switch>`时，它将搜索其子`<Route>`元素以查找其路径与当前 URL 匹配的元素。当找到一个时，它将呈现该`<Route>`并忽略所有其他路由。  
如果没有`<Route>`匹配，则`<Switch>`不会呈现任何内容（空）。

需要注意的重要一件事是`<Route path>`只匹配 URL 的开头。  
因此，`<Route path ="/">`将始终与任何 URL 匹配。  
所以，我们通常将此`<Route>`放在最后的`<Switch>`中。  
我们也可以使用 exact 与整个 URL 匹配的`<Route exact path="/">`。

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Switch>
        {/* If the current URL is /about, this route is rendered
            while the rest are ignored */}
        <Route path="/about">
          <About />
        </Route>

        {/* Note how these two routes are ordered. The more specific
            path="/contact/:id" comes before path="/contact" so that
            route will render when viewing an individual contact */}
        <Route path="/contact/:id">
          <Contact />
        </Route>
        <Route path="/contact">
          <AllContacts />
        </Route>

        {/* If none of the previous routes render anything,
            this route acts as a fallback.

            Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
```

## Navigation Components(导航组件)

React Router 提供了一个 `<Link>` 组件来在您的应用程序中创建链接。  
如果你想要强制导航，可以使用`<Redirect>`。

```jsx
<Link to="/">Home</Link>
// <a href="/">Home</a>

<NavLink to="/react" activeClassName="hurray">
React
</NavLink>

<Redirect to="/login" />
```
