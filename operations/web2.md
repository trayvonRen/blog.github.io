## 安装vsftpd
```
m install -y vsftpd
```

## 启动服务
- systemctl enable vsftpd.service //设置开机自启动

- systemctl start vsftpd.service //启动ftp服务

- systemctl restart vsftpd.service //启动ftp服务

- netstat -antup | grep ftp //查看ftp服务端口

## 修改配置文件
使用匿名FTP，用户无需输入用户名密码即可登录FTP服务器，vsftpd安装后默认开启了匿名ftp的功能，用户无需额外配置即可使用匿名登录ftp服务器。

这个时候任何用户都可以通过匿名方式登录ftp服务器，查看并下载匿名账户主目录下的各级目录和文件，但是不能上传文件或者创建目录。   
**由于匿名登录有风险，这里禁止匿名登录**

### 配置文件目录
vsftpd 的配置目录为/etc/vsftpd，包含以下文件
- ftpusers   
此文件中的用户不允许进行FTP登录；
- user_list  
作用根据vsftpd.conf中userlist_deny={YES/NO}配置而定，如果配置userlist_deny=NO，则只允许此文件中的用户；如果userlist_deny=YES(默认值)，不允许此文件中的用户登录，甚至都不会要求提供密码就直接拒绝；当然也会综合/etc/vsftpd/ftpusers配置来决定是否能够登录。
- vsftpd.conf
核心配置文件

### 修改配置文件
```s
anonymous_enable=NO # 静止匿名访问
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
xferlog_std_format=YES

listen_ipv6=NO
pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES
pasv_enable=YES  # 使用被动模式
pasv_min_port=1000 
pasv_max_port=2000 # 端口范围
userlist_deny=NO # 只允许 user_list  文件下的用户访问
```
随后在 user_list 文件里添加用户，在 ftpusers 里删除黑名单用户
开放 1000/2000 端口