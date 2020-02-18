## 几种定位方式
[position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

## 对于定位的理解
### relative (相对定位)
在一个相对定位（position属性的值为relative）的元素上设置 top 、 right 、 bottom 和 left 属性会使其偏离其正常位置。其他的元素的位置则不会受该元素的影响发生位置改变来弥补它偏离后剩下的空隙。  
**相对定位的元素是在文档中的正常位置偏移给定的值，但是不影响其他元素的偏移。**

### absolute (绝对定位)
相对定位的元素并未脱离文档流，而绝对定位的元素则脱离了文档流。在布置文档流中其它元素时，绝对定位元素不占据空间。绝对定位元素相对于最近的非 static 祖先元素定位。当这样的祖先元素不存在时，则相对于ICB（inital container block, 初始包含块）。   
**当一个元素指定了 absolute 定位，但为没有 left，top 等值时，该元素脱离文档流，但位置不改变**