---
prev: ./
next: ./mysql.md
---

# SpringBoot项目实现不停机更新

## 思路
通过Nginx的负载均衡策略实现不停机方案


## 行动

假设原SpringBoot项目使用8080端口，备用服务使用8081端口

demo就写个简单的示例

```java
@RestController
public class TestController {


    @Autowired
    Environment environment;

    public String getPort(){
        return environment.getProperty("local.server.port");
    }

    @GetMapping("/test")
    public String test() {
        return "端口号: " +  getPort();
    }

}
```

8080端口（旧版本）

![](https://raw.githubusercontent.com/lzwcyd/images/master/202208311445872.png)

请求结果：

![](https://raw.githubusercontent.com/lzwcyd/images/master/202208311445875.png)

8081端口（新版本）

![](https://raw.githubusercontent.com/lzwcyd/images/master/202208311445873.png)

请求结果：

![](https://raw.githubusercontent.com/lzwcyd/images/master/202208311447954.png)


1. 配置Nginx


```xml
location /xx {
            proxy_read_timeout 600;
            proxy_pass http://xx_manage; ##这个地方配置了负载均衡
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout http_500 http_404 http_502 http_503  non_idempotent;
}
# server外层
upstream xx_manage {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}
```
2. 启用备用服务

   ```shell
   java -jar .\demoTest-8081.jar
   ```

   此时访问http://localhost/test

   会轮询返回8080和8081服务的结果


3. 更新主服务
    先停止主服务，此时访问http://localhost/test，会自动切换成8081服务，此时保证了服务不会中断。
    然后启动新的主服务。
4. 停用备用服务
    然后停止备用服务，此时访问http://localhost/test，会自动切换成8080服务。