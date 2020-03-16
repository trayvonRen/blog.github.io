## 字段详解
### name
项目名称  
如果一个包的名字以 @ 开头，那么它就是一个有范围的包。 范围是 @ 和斜杠之间的所有内容。 
### version  
项目版本  

**如果该项目需要发布在 npm 上，name 字段必须独一无二。对于不需要发布的项目，以上两个字段是可选的**  
### description
项目描述，便于别人在 npm search 搜索你的项目
### keywords
同上
### homepage
项目主页
### bugs
别人发现 bug 时，如何找到你
### license
对外开放的权限证书
### main
项目入口
### repository
项目的代码库  
**对于大部分 npm 的使用者来说，以上字段都没什么卵用，下面才是重点**

### scripts  
定义的运行脚本，使用 npm run 启动  
scripts 存在两个默认值  
```
"start": "node server.js"
"install": "node-gyp rebuild":
```
### dependencies
生产环境所需要的依赖，需要指明其版本范围  
```
>version 
>=version 
<version
<=version
^version 兼容的版本
~version 大约相等的版本，允许细小改动
```

### devDependencies
只用于生产环境的依赖
