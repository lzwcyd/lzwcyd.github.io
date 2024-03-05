import{_ as n,o as s,c as a,e}from"./app-BZii1ESa.js";const t={},i=e(`<h1 id="springboot项目实现不停机更新" tabindex="-1"><a class="header-anchor" href="#springboot项目实现不停机更新"><span>SpringBoot项目实现不停机更新</span></a></h1><h2 id="思路" tabindex="-1"><a class="header-anchor" href="#思路"><span>思路</span></a></h2><p>通过Nginx的负载均衡策略实现不停机方案</p><h2 id="行动" tabindex="-1"><a class="header-anchor" href="#行动"><span>行动</span></a></h2><p>假设原SpringBoot项目使用8080端口，备用服务使用8081端口</p><p>demo就写个简单的示例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">Environment</span> environment<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> environment<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;local.server.port&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/test&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;端口号: &quot;</span> <span class="token operator">+</span>  <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>8080端口（旧版本）</p><p><img src="https://img.woodli.io/img/202309042006638.png" alt=""></p><p>请求结果：</p><p><img src="https://img.woodli.io/img/202309042010924.png" alt=""></p><p>8081端口（新版本）</p><p><img src="https://img.woodli.io/img/202309042010802.png" alt=""></p><p>请求结果：</p><p><img src="https://img.woodli.io/img/202309042009451.png" alt=""></p><ol><li>配置Nginx</li></ol><div class="language-xml line-numbers-mode" data-ext="xml" data-title="xml"><pre class="language-xml"><code>location /xx {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>启用备用服务</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-jar</span> .<span class="token punctuation">\\</span>demoTest-8081.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时访问http://localhost/test</p><p>会轮询返回8080和8081服务的结果</p></li><li><p>更新主服务 先停止主服务，此时访问http://localhost/test，会自动切换成8081服务，此时保证了服务不会中断。 然后启动新的主服务。</p></li><li><p>停用备用服务 然后停止备用服务，此时访问http://localhost/test，会自动切换成8080服务。</p></li></ol>`,18),p=[i];function o(l,c){return s(),a("div",null,p)}const d=n(t,[["render",o],["__file","springboot1.html.vue"]]);export{d as default};
