/* 


      域名
        域名的作用只是帮助我们更加容易记住网站地址，有了域名，就不用去记住IP地址了。

        www.baidu.com

        根域名：.   一般会省略  www.baidu.com.
        顶级域名：.com
        二级域名：baidu
        三级域名：www
        ...

        从后缀为顶级域名，往前以 .符号 为分界符 越往前级别域名加1

        一般只购买二级域名



      域名解析过程
        首先会查看本机的 hosts文件中是否有映射，如果有则直接取。
        访问本地域名服务器，如果本地域名服务器中有，则直接取。
        本地域名服务器访问根域名服务器，根域名服务器，会根据顶级域名找到顶级域名服务器地址，并响应给本地域名服务器。
        本地域名服务器根据响应的顶级域名服务器，访问到顶级域名服务器，如果顶级域名服务器中找得到 解析的ip地址，则直接响应回去，如果找不到则响应权限域名服务器ip地址。
        本地域名服务器根据响应的权限ip地址，访问到权限域名服务器，权限域名服务器中有则响应 解析的ip地址，如果没有则解析域名失败。

        为了使解析域名速度更快，查询服务器更少，上述每个节点都可能设置高速缓存来加速解析。
          （会缓存解析后的ip地址）



        泛域名解析
            *.baidu.com      会将三级域名（最后一级域名）解析成  设置的ip地址（服务器地址）
    
        指定解析
           根据最后一级域名解析成 指定ip地址

        @ 没有写最后一级域名  解析成指定的ip地址
*/