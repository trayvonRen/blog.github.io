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

### git --version

查看 git 版本

### git status

查看当前分支文件修改状态

### git init

初始化一个 git 仓库

### git log

查看提交改动

```js
git log --auther='xxx'
```

查看某个人的提交改动

### git rm

删除文件

### git mv

重命名文件

```
git mv 改动之前的文件名 改动之后的文件名
```

### git log --graph --pretty=oneline --abbrev-commit

查看分支的详细信息

## 误操作还原

### 在还没有 add 之前，还原工作区的内容

某个文件还原到最后一次 commit 的状态

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

## git 核心操作操作

### git add

将工作区的文件提交到暂存区

### git commit

将暂存区的文件提交到代码仓库

### git tag

将下次 commit 添加 tag，一般是版本信息

### git branch xxxx

创建 xx 分支

### git checkout xxx

切换到 xxx 分支
:::warning
在切换分支的时候，要把当前分支的工作区和暂存区清空
:::

### git push origin branch

提交某个分支到 origin

### git merge xxx

把 xxx 分支合并到当前分支上

## 高级操作

### git stash

当你临时有急事需要切换到其他分支修改代码时，需要把当前分支代码 commit ，但你又不想 commit 当前分支，就可以使用 git stash 把当前分支工作区内容先保存下来。

```vi
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

然后可以使用 git stash pop 来恢复工作区内容

```
git stash pop
```
