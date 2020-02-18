## width
### auto(默认值)
块级元素的margin、border、padding以及content宽度之和等于包含块 width。使用 auto 属性在包含块的宽度变化的时候，该元素的宽度也会随之变化。

### 百分比
要计算 height 百分值，是通过包含块的 height 的值。如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 0。

## height
### auto(默认值)
根据内容多少自动计算

### 百分比
要计算 width, left, right, padding, margin 这些属性由包含块的 width 属性的值来计算它的百分值。