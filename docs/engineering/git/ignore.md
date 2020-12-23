有些时候，你必须把某些文件放到 Git 工作目录中，但又不能提交它们，比如保存了数据库密码的配置文件啦，等等。
在 Git 工作区的根目录下创建一个特殊的.gitignore 文件，然后把要忽略的文件名填进去，Git 就会自动忽略这些文件。
不需要从头写.gitignore 文件，GitHub 已经为我们准备了各种配置文件，只需要组合一下就可以使用了。所有配置文件可以直接[在线浏览](https://github.com/github/gitignore。

忽略文件的原则是：

- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的.class 文件；
- 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

### 前端开发常用的 gitignore 文件

```r
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

config.js
```
