---
title: 长度单位
comments: true
date: 2019-11-9
categories: 
- css
tags:
- css
---

## 绝对长度单位

### px

px(pixel)其实应该算是我们最熟悉的长度单位了，是相对屏幕分辨率而言，也是经常被作为其他单位的基准。这个`px`和物理设备的像素是有区别的，为了保证在不同设备上视觉效果基本相同，`px`是采用参考像素的,根据css的规范上来看，`1px`在电脑显示器上看，大概是1/97英寸长。



### in

`in`是`inches`的简写，在CSS中， 它与px的换算关系为

```css
1in == 96px
    
```



### cm

厘米是在现实生活中，运用的比较广泛的单位，与px的换算关系是

```css
1cm == 37.8px
```


### mm

比`cm`小一个数量级，换算关系为

```css
1mm == 0.1cm == 3.78px
```



## 相对长度单位

*相对长度单位，顾名思义，它的长度是根据其他长度计算出来的。 `viewport`相关的单位本来也是属于这一部分的，但是为了区别对待，把它单拎出来了。*



### em

`em`(font size of the element) 是相对于当前元素的字体大小(font-size)属性值计算出来。由于浏览器默认字体大小是16px，则在默认情况下`1em = 16px`。如果当前元素没有设置字体大小就依赖其父元素的大小。如果其父元素的大小也没有显式的`font-size`，则向上寻找直至找到能进行计算的元素。这个单位一个比较常见的使用场景是在中文段落的首段缩进两个字。即：

```css
p {
  text-indent: 2em;
}
```

建议在设置字体单位和行距的时候采用em，这样用户在缩放网页的时候，能保证字体的正常缩放。



### rem

`rem`(font size of the root element)和`em`有点类似，不过是相对根元素进行计算的。只要在`html`元素上指定了其`font-size`大小，后面的元素都将使用这个大小作为基准进行计算。兼容性方面，目前除了IE8之外，所有浏览器基本都已支持`rem`了。不过有时候为了兼容性，会采用这种写法：

```css
p {
  font-size: 16px;
  font-size: 1rem;
}
```

这样，当浏览器不支持该属性的时候，会自动忽略掉`rem`设定的大小。

这个单位目前也经常被用来做屏幕适配。可以利用媒体查询或者js代码来动态设置根元素的`font-size`，后续的元素采用`rem`单位，这样就可以保证在不同设备下的显示效果。具体可以参考  

 http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/ 


### em

相对于元素字体的`x-height`， 这个`x-height`取自字符`x`的高度的意思。与`em`有所区别的是，当你改变字体`font-family`的时候，使用`em`单位的其大小不会受到影响，而`ex`会根据字体重新计算出新的大小。



### ch

与`ex`单位有点类似，不过是基于'0'这个字符字体的宽度，而不是`x`这个字符字体的高度进行计算的。



## 基于viewport视区的长度单位

视区（viewport)，就是浏览器可视化的区域，这个可视区域是`window.innerWidth/window.innerHeight`的大小。而CSS中，和视区相关的单位有四个，分别为vw,vh,vmin和vmax。这些单位都依赖屏幕的可视区域，因此也可以用于响应式排版和布局。


### vw/vh

`vw`是viewport's width的简写，表明它的值是根据视口的宽度计算而来的，换算关系是1`vw`等于百分之一的`window.innerWidth`。与`vw`类似，`vh`是根据视口高度计算出来的。


### vmin/vmax

这个单位是根据视区中长度偏大的那个维度值计算出来的，就是如果`window.innerHeight > window.innerWidth`则`vmin`取百分之一的`window.innerWidth`，`vmax`取百分之一的`window.innerHeight`计算。



## 参考资料

 https://www.jianshu.com/p/5d1f811082f2 

[你真的了解css像素嘛？](https://juejin.im/post/5b95a8186fb9a05cd7772455)

