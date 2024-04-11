/* 

        http协议是无状态的，就是服务器不知道这次请求的人是否是已经登陆成功的，因此需要令牌，而cookie就是来管理这些的。


        cookie具备以下功能
           1.能够存放多个令牌，这些令牌可能来自不同网站。
           2.能够自动的带在符合条件的请求中。
           3.能够管理有效期


        cookie的组成
            key: 健
            value: 值
            domain（嘟妹）: 域，表示这个cookie属于那个网站的    
            path（葩是）: 路径，表示这个cookie是属于该网站的那个基路径
            secure（是起额）: 是否使用安全传输
            expire（衣可是摆）: 过期时间，表示该cookie在什么时候过期

            当浏览器向服务器发出请求时，cookie小系统就会看那个cookie符合条件，符合得则会带在请求中。
            条件如下： 
               cookie没有过期
               cookie中的域和这次请求的域是匹配的（yuanjin.tech 能匹配 www.yuanjin.tech、yuanjin.tech等，如果是全称域，那么就必须完全一样）
               cookie中的path和这次请求的path是匹配的（匹配基路径）
               cookie是否安全传输
                  如果secure为true,则请求协议必须是https
                  如果secure为false,则请求协议可以是http、https
              所有条件必须满足，会把cookie附带在请求头中，请求头中就会多了一个键值对为
                Cookie: 键=值; 键=值


            服务器响应cookie
               会在响应头中添加set-cookie键值对，每一个set-cookie的键值对就是一个cookie,浏览器就会保存起来。
               set-cookie: 键=值; path=路径; domain=域; expire=过期日期; max-age=?; secure; httponly
                path    默认是当前请求时网页的路径
                domain  默认是当前请求时网页的域（全称域）
                expire  一个有效的GMT时间，如  Fri 17 Apr 2020 09:25:59 GMT
                max-age 秒（浏览器会以当前时间加上这些秒数后过期）
                  expire、max-age 如果都没设置，则该cookie表示会话结束后过期（关闭窗口），这两个属性只能设置一个。
                httponly  默认为false,true表示该cookie仅用于传输，不允许在客户端通过js获取（防止XSS攻击）
               
            
            客户端设置cookie
                document.cookie = "键=值; path=?; ..."
                没有httponly,因为该属性本来就是为了限制在客户端访问的。
                其他属性都一样


            删除cookie
              将cookie的时间设置过期
              
            cookie有可以 key 相同，域或路径不同，所以无法通过cookie的key来判断哪一个cookie

*/