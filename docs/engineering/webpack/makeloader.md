## 编写一个简单的 loader

```js
const loaderUtils = require('loader-utils')

module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  return source.replace('console', options.name)
}
```

## 编写一个简单的 Plugin

```js
class CopyrightWebpackPlugin {
  constructor(options) {
    console.log('plugin used')
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      compilation.assets['copyright.txt'] = {
        source: function() {
          return 'copyright by rcw'
        },

        size: function() {},
      }
      cb()
    })
  }
}

module.exports = CopyrightWebpackPlugin
```
