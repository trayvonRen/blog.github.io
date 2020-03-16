## render 简介

render 函数即渲染函数，它是个函数，render 函数的返回值是 VNode（即：虚拟节点，也就是我们要渲染的节点）

在 vue 2.0 以后所有的模板最终都会编译成 render 函数来进行渲染，直接使用 render 函数渲染模板可以最大化利用 js 的编程能力，更接近 vue 编译器

## render 函数的使用

*首先 render 函数生成的内容相当于 template 的内容，故使用 render 函数时，在 .vue 文件中需要先把 template标签去掉。只保留逻辑层*



createElement 是 render 函数的参数，它本身也是个函数，并且有三个参数。接来下我们重点介绍这三个参数 

示例：

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  //createElement 第二个参数是选填的，一个与模板中属性对应的数据对象 
  //常用的有class | style | attrs | domProps | on
  //style: 样式
  //attrs: 用来写正常的 html 属性 
  //domProps:用来写原生的 dom 属性
  //on:：用来写原生方法
  {
   'class': {
          foo: true,
          bar: false
        },
        style: {
          color: 'red',
          fontSize: '14px'
        },
        attrs: {
          id: 'foo'
        },
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```



示例：

```js
render: h => h('ul', {
    style: {
      color: 'blue',
      fontSize: '20px'
    },
    attrs: {
      id: 'foo'
    },
  }, [
    h('li', ['html']),
    h('li', ['css']),
    h('li', ['js'])
  ])
```



##  参考资料

[官方文档](https://cn.vuejs.org/v2/guide/render-function.html#createElement-参数)

https://juejin.im/post/5d5b4379518825637965eb6a 