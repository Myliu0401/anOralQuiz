/* 
        http协议不能作为实时通信的原因：
           http是请求-响应，请求在前，响应在后。请求必须由客户端发出，然后服务端进行响应，链接断开。
           这就导致服务器无法主动发送消息给客户端，还有每次响应结束链接就断开了。

        
        websocket出现以前解决实时通信的方案：
           轮训：
              每隔一段时间，客户端请求一次服务，询问有没有新消息。
              缺点：
                会产生大量的无意义的请求。
                会频繁打开和关闭链接。
                实时性不高（时间太短，请求过于频繁，太耗效率，时间太长，实时性不高）

           长链接：
              客户端发出请求后，服务器先不响应，等到有新消息时再响应给客户端。
              收到消息，链接断开后，又重新发送请求给服务端。
              缺点：
                客户端长时间收不到响应，会自动断开链接。（虽然可以控制，断开后立即重新发送请求）
                服务器长时间的挂起请求会长时间占用资源（浪费内存空间等）

        
        webScoket
            webscoket跟http一样也是建立在TCP基础上的，利用了TCP的全双工通信能力。
            webscoket会经历两个阶段：webscoket握手阶段、通信阶段
            缺陷：
              只有高版本的浏览器才支持webscoket
              长时间的维持链接通道需要消耗资源（占用内存空间等）

        webscoket握手
           当TCP建立链接通道后，会使用http进行一次完整的请求  请求-响应，这次请求称为 webscoket握手。
           客户端向服务端发送一个请求：
              使用的协议为  ws:// 或  wss://

              请求头中带有：
                 Connection: Upgrade   表示升级协议
                 Upgrade: webscoket    使用webscoket协议
                 Sec-WebScoket-Version: 版本号    表示使用的webScoket版本
                 Sec-WebScoket-Key: .....  表示秘钥

            服务端响应时
                响应行变成   HTTP/1.1 101  Switching Protocols   101状态码  表示换协议通信
                响应头带上：
                   Connection: Upgrade  表示已经升级协议
                   Upgrade: webscoket   升级成webscoket协议
                   Sec-WebSocket-Accept: ...   表示秘钥

            握手完成后，后续不再根据http规定来。


        
       面试题 
         webScoket是什么
           webSocket是html5新增的协议，是一个持久性的链接协议，它是建立在tcp协议基础上的，当tcp协议经过三次握手后
           建立链接通道后，会以http协议发出一个 请求-响应，称为 webscoket握手。
           客户端会发出请求 请求头中带有  Connection: Upgrade、 Upgrade: webscoket、 Sec-WebScoket-Version: 版本号、Sec-WebScoket-Key:秘钥
           这4个额外键值对，服务端响应 响应行中状态码为 101 表示换协议通信。
           响应头中带有三个额外键值对：Connection: Upgrade、Upgrade: webscoket、Sec-WebScoket-Key:秘钥
           握手完成后，后续通信就不用受http规定，客户端和服务器都可以随意收发数据。

        
         webScoket与传统的http有什么优势
            http只能由客户端发出请求，服务端进行响应，断开链接，服务端无法主动告知客户端。
            当需要实时通信时，http只能由客户端发出请求，询问服务端。次数都了会造成大多无意义请求，太耗效率、无法实时知道数据。
            如果使用长链接又会导致请求长时间被挂起，浪费资源。
            webscoket解决了上面的问题，可以持久性链接，客户端和服务端可以只有的收发数据。


         前端实现实时通讯的方式
             轮训
             长连接
             webscoket





*/