## 文件状态

![](/img/engineer/concept.png)

## snapshot

每次 commit 会产生一个 commit 对象（也被成为快照），  
每个 commit 对象对应一次文件的修改，git 内部用一个 hash 值来区分这些对象。

## branch

branch 本质上是指向某个 commit 对象的指针。

### 经典分支模型

![](/img/engineer/branch.png)

## HEAD

HEAD 指针指向当前 git 工作区。  
HEAD 是一个特殊的指向，它既可以指向 branch，又可以指向 commit 对象。  
几乎所有的 git 操作都是在 HEAD 指针上完成的。
