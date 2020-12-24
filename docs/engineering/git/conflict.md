## 合并冲突产生的原因

合并本质上就是把两个分支合并到一起，但两个分支的**同时**修改**同一个文件**时，就会产生冲突。

![](/img/other/branch.png)

## 解决冲突方法

### git pull

发送冲突时，需要先将远程分支先 pull 下来，然后在产生冲突的地方进行修改, 然后再 push 上去。

![](/img/other/merge.gif)

### git rebase

git rebase 命令复制当前分支的提交，然后把这些提交放到指定分支之上。

![](/img/other/rebase.gif)

与 merge 相比，最大的区别是 Git 不会去找出哪些文件需要保留，哪些文件不需要保留。我们要 rebase 的分支总是包含了我们想要保留的最新改动。这种方式不会有合并冲突，并且保持了良好的线性 Git 历史记录。

当你在特性分支上开发时，master 分支有更新的时候，rebase 很有用。这样你在当前分支就能拿到所有更新，避免了将来可能的合并冲突。

:::warning
git rebase 命令会修改项目历史记录，因为复制的提交会产生新的 hash。
:::

## 参考资料

[彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)
