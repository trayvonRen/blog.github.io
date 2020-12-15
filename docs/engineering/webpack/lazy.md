延迟加载（即“按需”加载）是优化站点或应用程序的好方法。
这种做法本质上涉及在逻辑断点处分割代码，然后在用户完成需要或将需要新代码块的操作后加载代码。
由于某些块甚至可能从未加载过，因此这加快了应用程序的初始负载并减轻了其总重量。

```js
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['DELL', 'LEE'], '-----')
    return element
  })
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
```
