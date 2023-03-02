/* 


       session是存储在服务端的
          就相当于一柜子，柜子中每一格存储一个session的东西，每一个格子都有一把钥匙，只把钥匙给客户端，不会将格子里的东西给到客户端。
          客户端请求过来时带上钥匙（如带在cookie中），服务端根据钥匙取出格子东西进行判断。
    
        
        cookie和session的区别
           cookie是存储在客户端的，session是存储在服务端的
           cookie存储空间有限，session存储空间理论上是无限的
           cookie只能存储字符串，session可以存储任何类型数据
           cookie容易被获取，session难以被获取


        如何消除session
           过期时间 
               当客户端长时间没有传递sessionid（钥匙）时，服务器可以将其清除掉
           客户端主动通知
               如关闭页面时，发出请求通知服务器清除session

        
        session一般都是存储临时的东西



*/