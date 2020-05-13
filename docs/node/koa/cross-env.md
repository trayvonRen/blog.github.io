跨平台设置环境变量的执行脚本  
## 安装  
```shell
npm install --save-dev cross-env
```

## 用法
```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```
使用 `cross-env NODE_ENV=production` 把 `NODE_ENV ` 设置为 `production `

## 参考资料
[npm: cross-env](https://www.npmjs.com/package/cross-env)