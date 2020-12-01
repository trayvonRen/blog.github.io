## 资源压缩

- 减少文件大小

## 文件合并

- 多个小文件合并成一个文件  
  减小请求数

#### 缺点

- 不利于浏览器缓存，一旦某部分更新需要重新加载所有文件

## 图片优化

### 选择正确的格式压缩

JPG 压缩比较高  
PNG 画质较好/文件较大

### 响应式图片

```html
<img
  srcset="elva-fairy-320w.jpg 320w, elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

### 使用懒加载

```html
<img src="image.jpg" alt="..." loading="lazy" />
```

### 渐进式 JPG

## 字体优化

大多数浏览器在自定义字体还未下载之前会先隐藏文本。这就是大家所说的 FOIT（Flash of Invisible Text）。

### 使用 font-desplay

font-display 属性决定了一个@font-face 在不同的下载时间和可用时间下是如何展示的。

```css
/* 关键字值 */
font-display：auto;
font-display：block;
font-display：swap;
font-display：fallback;
font-display：optional;
```

## 图标优化

### IconFont

### SVG

- 保持图片的能力，支持多色彩
- 独立矢量图形
- 有利于 SEO 和 无障碍阅读

### base64

把字体或者图片进行转码，嵌入 css，js

#### 缺点

资源缓存问题
