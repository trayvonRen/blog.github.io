
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# push 到 github
git add .
git commit -m'add note'
git push

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'


# 如果发布到 https://<USERNAME>.github.io/<REPO>
git remote add origin root@123.57.137.244:/web/repo/blog.git
git push -f origin  master

cd -