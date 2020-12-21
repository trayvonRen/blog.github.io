## 触发规则

- 根元素，即 HTML 标签
- 浮动元素：float 值为 left、right
- overflow 值不为 visible，为 auto、scroll、hidden
- display 值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- 定位元素：position 值为 absolute、fixed

## 约束规则

浏览器对 BFC 区域的约束规则：

- 生成 BFC 元素的子元素会一个接一个的放置。
- 垂直方向上他们的起点是一个包含块的顶部，两个相邻子元素之间的垂直距离取决于元素的 margin 特性。在 BFC 中相邻的块级元素的外边距会折叠(Mastering margin collapsing)。
- 生成 BFC 元素的子元素中，每一个子元素左外边距与包含块的左边界相接触（对于从右到左的格式化，右外边距接触右边界），即使浮动元素也是如此（尽管子元素的内容区域会由于浮动而压缩）- ，除非这个子元素也创建了一个新的 BFC（如它自身也是一个浮动元素）。

规则解读：

- 内部的 Box 会在垂直方向上一个接一个的放置
- 内部的 Box 垂直方向上的距离由 margin 决定。（完整的说法是：属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠，不同 BFC 不会发生折叠。）
- 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算

## 参考资料

[CSS 中重要的 BFC](https://segmentfault.com/a/1190000013023485)
