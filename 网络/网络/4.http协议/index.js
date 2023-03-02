/* 
       HTTP
         表示客户端和服务器对话的方式（用同一种语言标准）
         http规定了客户端和服务器的交流方式

         http规定
           每次 请求---响应  都是独立的，相互之间互不干扰，称之为*无状态协议*
           每次 请求---响应  传递的消息都是纯文本（字符串），而且文本格式必须按照http协议规定的格式来

           请求的消息格式
              请求行：高度概括了客户端要干什么
              请求头：描述了请求的一些额外信息
              请求体：包含了要给服务器传递的正文数据。请求体可以省略

 
              请求行
                包含 请求方法 路径+参数+hash 协议和版本
                    请求方法它表达了客户端【动作】

              请求头
                一系列的键值对，里面包含了诸多和业务无关的信息
                浏览器每次请求都会自动附带很多信息在请求头中
                  Host: url地址中的足迹
                  User-Agent: 客户端的信息描述
                  Content-Type: 请求体的消息是什么格式

              请求体
                理论上，请求体可以是任意格式的字符串


           响应消息格式
              响应行：整个响应字符的第一行



              响应行
                包括 协议版本：表示服务器打算和客户端用什么协议通信
                     状态码、状态消息：表示服务器对当前请求的表态

                     状态码 分类
                       1开头       信息，服务器收到请求，*需要请求者继续执行操作*
                       2开头       成功，操作被成功接收并处理
                       3开头       重定向，需要进一步操作以完成请求
                       4开头       客户端错误，请求包含语法错误或无法完成请求
                       5开头       服务器错误，服务器在处理请求的过程中发生了错误

                       通常 0~399 的状态码都是正常的，其他都是不正常的

                       200 OK   一切正常
                       301      资源被永久重定向
                       302      资源被临时重定向
                       304      文档内容未被修改
                       400      语义有误，当前请求无法被服务器理解
                       403      服务器拒绝执行
                       404      资源不存在

                        301 浏览器会做缓存处理，下次再请求时浏览器会直接取缓存的地址去请求
                        302 浏览器就不会

                        304 请求结果跟之前一样，没有任何变化，所以不给结果。让浏览器取缓存的结果

                     响应头
                        跟请求头一样，响应头也是由多个键值对组成的
                        text/plain:普通文本，浏览器通常会将响应体原封不动的显示到页面上
                        text/html: html文档，浏览器通常会将响应体作为页面进行渲染
                        text/javasciprt: js代码，浏览器通常会使用js执行引擎进行解析执行
                        text/css: css代码，浏览器将其视为样式
                        image/...: 浏览器将其视为图片
                        attachment: 附件，浏览器会触发下载
                        上面这些都是 Content-Type的值，表示请求体的格式


                     响应体
                        响应的主体内容
        
                    
              
                 




*/