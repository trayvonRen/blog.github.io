## 配置用户名和邮箱

### 配置用户名

```
git config --global user.name '任崇伟'
```

### 配置邮箱

```
git config --global user.email '1669506811@qq.com'
```

### 检查配置信息

```js
git config --global --list
```

## 基础命令

### git status

### git --version

查看 git 版本

### git init

创建一个 git 仓库

### git log

查看提交改动
git log --auther='xxx'
查看某个人的提交改动

### git rm

删除文件

### git mv

重命名文件

```
git mv 改动之前的文件名 改动之后的文件名
```

## 误操作还原

### 在还没有 add 之前，还原工作区的内容

还原到最后一次提交的状态

```
git checkout -- demo.html
```

### add 之后，还没有 commit 之前

首先撤销追踪文件

将文件从暂存区返回工作区

```
git reset HEAD demo.html
```

然后再还原到最后一次提交的状态

```
git checkout -- demo.html
```

### 将项目回退指定版本

HEAD 后面跟一个 ^ 代表回退一个版本

```r
 git reset --hard HEAD^^
```

使用 commit id 回退到指定版本

```git
git reset --hard 64b5e72
```

### 将某个文件回退指定版本

```git
git checkout 02180162850eea88431edb2f650cced7e5f187b0 -- demo1.html
```

### git tag
