## 安装

### 1、使用 yum 安装 nginx 需要包括 Nginx 的库，安装 Nginx 的库

rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

### 2、使用下面命令安装 nginx

yum install nginx

### 安装目录:

whereis nginx

```s
nginx: /usr/sbin/nginx /usr/lib64/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

## 命令

启动：systemctl start nginx.service  
重启：systemctl restart nginx.service  
停止：systemctl stop nginx.service

## 修改配置

**全局配置文件**  
/ect/nginx/nginx.conf  
一般不需要修改

**子项目配置**  
/etc/nginx/conf.d/default.conf  
如下修改

```s
# 博客服务
server {
    # 使用  https 协议，开启 http2
    listen  443 ssl http2;
    server_name  www.trayvonren.top;

    # 日志文件
    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;


    # 资源目录设置
    location / {
        root   /web/root;
        index  index.html index.htm;
    }

    # 配置 https 证书
    ssl on;
    ssl_certificate ../4698566_trayvonren.top.pem;
    ssl_certificate_key ../4698566_trayvonren.top.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

# 把 80 端口的 http 请求转发到 https
server {
  listen 80;
  server_name www.trayvonren.top;
  rewrite ^(.*)$ https://$host$1 permanent;
}

# 简历服务的配置
server {
    listen    80;
    server_name resume.trayvonren.top;

    location / {
      root   /web/resume;
      index  index.html index.htm;
    }
}
```

为了开启 ssl 证书, 首先要把证书文件下载到相应的目录下  
nginx 监听了两个端口，并把 http 协议转发到 https 协议下
