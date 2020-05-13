在 centos 安装 mongodb 并开启远程登录
## 安装
### 配置 yum
创建文件 yum 配置文件
```YAML
vi /etc/yum.repos.d/mongodb-org-4.2.repo
```
保存以下内容
```YAML
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

```

### 安装 mongodb

```YAML
sudo yum install -y mongodb-org
```
### 验证安装结果
```
rpm -ql mongodb-org-server
```

## 启动
```YAML
# 启动
sudo systemctl start mongod 
# 重启
sudo systemctl restart mongod
# 停止
sudo systemctl stop mongod
```

## 配置
### 开放防火墙端口  
默认是 `27017` 端口

### 修改配置文件
vi /etc/mongod.conf    
```YAML
## 启用基于角色的访问控制 
security:
  authorization: enabled
```

### 创建数据库用户  
打开 `mongo` `shell` 界面
```shell
mongo
```
连接数据库  
```shell
use admin
``` 
用户认证  
*在未认证的情况下也可以连接数据库，但是无法进行任何操作*
```shell  
db.auth("username", "password")
```
创建用户
```shell  
db.createUser({user: "username", pwd: "password", roles:[{role: "read", db: "db1"}, {role:"readWrite", db: "db2"}]})
```

## 远程连接
### 使用 ssh
```shell
mongo host:port/database -u username -p password
```

### 使用 studio 3T
## 参考资料
[Install MongoDB Community Edition on Red Hat or CentOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/)  
[Configuration File Options](https://docs.mongodb.com/manual/reference/configuration-options/)