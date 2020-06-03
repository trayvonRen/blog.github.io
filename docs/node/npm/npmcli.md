## init

初始化一个 package.json

## install

安装依赖  
在安装时，使用 -g 进行全局安装，否则安装在本地

#### npm install

安装 package.json 所需的所有依赖

#### npm install @scope/name@version

安装指定域中的依赖  
可以设置以下参数

- -P, --save-prod (default)  
  把依赖加入 dependencies 中
- -D, --save-dev  
  把依赖加入 devDependencies.
- --no-save  
  不加入 package.json

## uninstall

删除依赖  
在删除时，使用 -g 进行全局删除，否则删除本地的依赖

-S, --save  
依赖从 dependencies 移除  
-D, --save-dev  
依赖从 devDependencies 移除  
--no-save  
不移除 package.json 中的依赖
