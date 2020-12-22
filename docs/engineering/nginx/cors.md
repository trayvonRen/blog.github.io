当项目前后端分离部署时，就需要配置 Nginx 反向代理解决跨域问题

```s
server {
    listen xx;
    server_name xx.xxxx.xxx;

    # 静态资源服务器部署的目录
    location / {
        root   /erp/frontend;
        index  index.html index.htm;
    }

    # 转发接口请求的服务器地址
    location /erpn {
        proxy_pass       http://47.97.214.211:81/erpn;
        proxy_redirect   off;
    }

}
```
