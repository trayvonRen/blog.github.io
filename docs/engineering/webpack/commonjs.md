## CommonJS

### module 对象

CommonJS 内部会有一个 module 对象用于存放当前模块的信息。

可以理解为模块的逻辑都在 module 对象内部。

```js
var module = {}
module.exports = {}
```

### module.exports

module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。

### require

require 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，会报错。

第一次加载某个模块时，Node 会缓存该模块。  
以后再加载该模块，就直接从缓存取出该模块的 module.exports 属性。

## ES module

ES6 的模块自动采用严格模式，不管你有没有在模块头部加上"use strict";。

### export

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用 export 关键字输出该变量。下面是一个 JS 文件，里面使用 export 命令输出变量。

```js
// profile.js
export var firstName = 'Michael'
export var lastName = 'Jackson'
export var year = 1958
```

### import

使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块。

import 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

### export default

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

```js
// export-default.js
export default function() {
  console.log('foo')
}

// import-default.js
import customName from './export-default'
customName() // 'foo'
```

### import()

动态加载

```js
const main = document.querySelector('main')

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main)
  })
  .catch(err => {
    main.textContent = err.message
  })
```

## CommonJs 和 EsModule 的区别

- commonJs 是被加载的时候运行，esModule 是编译的时候运行
- commonJs 输出的是值的浅拷贝，esModule 输出值的引用
- commentJs 具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值
