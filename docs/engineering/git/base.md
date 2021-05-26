## 基础命令

### git lg

查看分支的详细信息和提交记录。  
使用之前需要配置别名。

```git
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### git branch xxx

在当前 HEAD 指向的区域新建一个 branch。  
**git branch 命令仅仅创建 一个新分支，并不会自动切换到新分支中去。**

### git checkout xxx

切换分支：切换当前 HEAD 指针到 xxx branch/commit 上。

- git checkout -b xxx

新建 xxx 分支并切换。

### git rebase xxx

将当前分支剪切到 xxx 分支上。

### git merge xxx

把 xxx 分支合并到当前分支上。

### git stash

把当前分支工作区内容先保存下来。

- git stash pop

恢复工作区内容。

## 远程仓库操作

### git clone xxx

克隆 xxx 仓库到本地。

### git fetch

更新 remote 中所有的远程 repo 到本地。

- git fetch xxxx

只更新 xxx 分支到本地。

- git fetch remote_repo

只更新 remote 中 remote_repo 分支到本地。

### git push

把本地的当前分支推送到远程分支。

### git pull

将远程的当前分支拉取过来，并与本地的当前分支合并。

- git pull origin xxx

将远程的 xxxx 分支拉取过来，并与本地的当前分支合并。

等同于

```git
git fetch xxx
git merge xxx
```

- git pull origin xxx --rebase

使用 rebase 的方式进行分支合并。

等同于

```git
git fetch xxx
git rebase xxx
```

## 误操作还原

### git checkout -- demo.html

在还没有 add 之前，还原工作区的内容。  
某个文件还原到最后一次 commit 的状态。
