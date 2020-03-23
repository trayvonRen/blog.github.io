path 模块提供用于处理文件路径和目录路径的实用工具。 它可以使用以下方式访问：
```js
const path = require('path');
```

## path.basename()
path.basename(path[, ext])  
path.basename() 方法返回 path 的最后一部分，类似于 Unix 的 basename 命令。 
```js
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```

## path.dirname()
path.dirname(path)  
path.dirname() 方法返回 path 的目录名，类似于 Unix 的 dirname 命令。 
```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

## path.extname()  
path.extname(path)  
path.extname() 方法返回 path 的扩展名，从最后一次出现 .（句点）字符到 path 最后一部分的字符串结束。   
```js
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''

path.extname('.index.md');
// 返回: '.md'
```

## path.join()
path.join([...paths])
path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。  
```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```

## path.resolve()  
path.resolve([...paths])  
path.resolve() 方法将路径或路径片段的序列解析为绝对路径。  
如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。  
生成的路径已规范化，并且除非将路径解析为根目录，否则将删除尾部斜杠。  
零长度的 path 片段会被忽略。  
如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径。  
```js
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```