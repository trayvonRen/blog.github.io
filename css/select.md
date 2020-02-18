## 一、基本选择器
### 通配符选择器
通用元素选择器，匹配任何元素
```css
* {

}
```

### 标签选择器
标签选择器，匹配所有使用E标签的元素
```css
div {

}
```

### 类选择器
class选择器，匹配所有class属性中包含info的元素
```css
.info {

}
```

### id选择器
id选择器，匹配所有id属性等于footer的元素
```css
#footer {

}
```

## 二、多元素的组合选择器
### E,F
多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔
```css
.hello, span {
    background: red;
}
```

### E F
后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔
(匹配所有后代，不只是子元素)
```css
.info .hello{
            background: red;
}
```

### E > F
子元素选择器，匹配所有E元素的子元素F
```css
.info > .hello{
    background: red;
}
```

### E + F	
毗邻元素选择器，匹配所有紧随E元素之后的同级元素F  
(仅包含一个同级元素)
```css
p + p { 
    color:#f00; 
}
```

## 三、CSS 2.1 属性选择器
### E[att]
匹配所有具有att属性的E元素，不考虑它的值。  
（注意：E在此处可以省略，比如"[cheacked]"。以下同。）
```css
.hello[id] {
    font-size: 200px;
}
```

### E[att=val]
匹配所有att属性等于"val"的E元素
```css
.hello[id=name] {
    font-size: 200px;
}
```

### E[att~=val]
匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素
```css
.hello[id~=name] {
    font-size: 200px;
}
```

## 四、CSS 2.1中的伪类
### E:first-child
匹配父元素的第一个子元素
```css
.info :first-child {
    background: red;
} 
```

### E:link
匹配所有未被点击的链接
```css
 *:link {
    font-size: 300px;
}
```

### E:active
匹配鼠标已经其上按下、还没有释放的E元素
```css
.hello:active {
    font-size: 300px;
}
```

### E:hover
匹配鼠标悬停其上的E元素
```css
.hello:hover {
    font-size: 300px;
}
```

### E:focus
匹配获得当前焦点的E元素
```css
.input:focus {
    font-size: 300px;
}
```