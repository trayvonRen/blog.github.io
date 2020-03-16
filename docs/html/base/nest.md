## 所有元素必须正确嵌套

- 不允许交叉  
```html
<span><dfn>交叉嵌套</span></dfn>
```
- 不允许非法的子元素嵌套  
```html
<ul>
    <h3>xx列表</h3>
    <li>asdasdsdasd</li>
    <li>asdasdsdasd</li>
</ul>
```
修改为
```html
<div>
    <h3>xx列表</h3>
    <ul>
        <li>asdasdsdasd</li>
        <li>asdasdsdasd</li>
    </ul>
</div>
```
- 行内元素一般不能包含块级元素(a 元素除外)   
```html
<span>
    <h1>这是一个块级h1元素</h1>
    <p>这是一个块级p元素</p>
</span>
```
修改为
```html
<div>
    <h1>这是一个块级h1元素</h1>
    <p>这是一个块级p元素</p>
</div>
```
- 块级元素不一定能包含块级元素 
```html
<p>
    <div>13213</div>
</p>
```

[具体规则](http://jkorpela.fi/html/nesting.html)

在 html5 中，在计算嵌套合法性中，a 元素会被视为不存在，所以 a 元素可以包含块级元素