## 安装
### 1、使用yum安装nginx需要包括Nginx的库，安装Nginx的库
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
### 2、使用下面命令安装nginx
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
server {
    listen 443;
    server_name  woyasuohen6.cn;
    access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /web/root;
        index  index.html index.htm;
    }
    ssl on;
    ssl_certificate ../ssl.pem;
    ssl_certificate_key ../ssl.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
    ssl_prefer_server_ciphers on;

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
server {
    listen 80;
    server_name woyasuohen6.cn;
    rewrite ^(.*)$ https://$host$1 permanent;
}
```

为了开启 ssl 证书, 首先要把证书文件下载到相应的目录下  
nginx 监听了两个端口，并把 http 协议转发到 https 协议下
