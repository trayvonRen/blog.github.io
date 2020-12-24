## 多人协作最佳实践

- 规范 git commit 格式，可以使用 Commitizen 工具辅助。
- 合理分工，尽量不要多人同写一个模块。
- 可以使用 github 等远程仓库集中管理稳定版的代码
- 开发者每开发一个 feature 就新建一个 dev 分支，开发完成后 push 到远程仓库并 pull request 请求 merge
- 管理员进行 code review 后把 dev 分支 merge 到 master 分支中
- 如果 merge 遇到了冲突，先把远程分支的 master 分支 pull 下来，再修改冲突并 push
- master 分支应该是非常稳定的，也就是仅用来发布新版本，平时不能直接在上面开发
