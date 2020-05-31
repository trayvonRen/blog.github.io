## 文件和目录

### 目录切换
```
cd /home 绝对路径
cd path 相对路径
cd ..  返回上一级目录
```

### 查看文件
```
ls  查看目录中的文件
ls -a  显示隐藏文件
ls -l  显示详细信息
```

### 复制文件
```
将文档 file1复制成file2，复制后名称被改file2
cp file1 file2 
```

## 端口
### Centos查看端口占用
比如查看80端口占用情况使用如下命令：
```
lsof -i tcp:80
```
### 列出所有端口
```
netstat -ntlp
```

## 进程
### 关闭进程
```
kill PID
```
### 杀死 node 进程 
```
pkill node
```