## 打包库文件

```js
module.exports = {
  output: {
    // path 必须为绝对路径
    // 输出文件路径
    path: path.resolve(\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_dirname, '../../dist/build'),
    // 包名称
    filename: '[name].bundle.js',
    // 块名，公共块名(非入口)
    chunkFilename: '[name].[chunkhash].bundle.js',
    // 打包生成的 index.html 文件里面引用资源的前缀
    // 也为发布到线上资源的 URL 前缀
    // 使用的是相对路径，默认为 ''
    publicPath: '/',
    // 一旦设置后该 bundle 将被处理为 library
    library: 'webpackNumbers',
    // export 的 library 的规范，有支持 var, this, commonjs,commonjs2,amd,umd
    libraryTarget: 'umd',
  },
}
```

## 模仿 webpack 编写一个简单的打包工具

```js
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8')
  const ast = parser.parse(content, {
    sourceType: 'module',
  })

  const dependencies = {}

  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename)
      const newFile = './' + path.join(dirname, node.source.value)
      dependencies[node.source.value] = newFile
    },
  })

  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  })

  return {
    filename,
    dependencies,
    code,
  }
}

// 广度优先搜索分析依赖图
const makeDependenciesGraph = entry => {
  const entryModule = moduleAnalyser(entry)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }

  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code,
    }
  })

  return graph
}

const generateCode = entry => {
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  return `(function(graph) {
    function require(module) {
      function localRequire(relativePath) {
        return require(graph[module].dependencies[relativePath])
      }
      var exports = {};
      (function(require, exports, code) {
        eval(code)
      })(localRequire, exports, graph[module].code)

      return exports
    };
    require('${entry}')
  })(${graph})`
}

const code = generateCode('./src/index.js')
console.log(code)
```
