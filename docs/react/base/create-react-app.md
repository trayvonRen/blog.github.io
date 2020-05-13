
create-react-app 是 react 官方提供的一款创建 react 应用的脚手架工具
## 创建应用程序
### npx
```
npx create-react-app my-app
```

### npm
```
npm init react-app my-app
```

### Yarn
```
yarn create react-app my-app
```

## Scripts

在开发模式下运行应用程序。
```
npm start 或 yarn start
```

将生产环境的应用程序构建到 build 目录。 它能将 React 正确地打包为生产模式中并优化构建以获得最佳性能。
```
npm run build 或 yarn build
```

[文件夹结构](https://www.html.cn/create-react-app/docs/folder-structure/)

## 使用 typescript
要使用 TypeScript 启动新的 Create React App 项目，你可以运行
```
$ npx create-react-app my-app --typescript
$ # 或者
$ yarn create react-app my-app --typescript
```

要将 TypeScript 添加到 Create React App 项目，请先安装它：
```
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
$ # 或者
$ yarn add typescript @types/node @types/react @types/react-dom @types/jest
```