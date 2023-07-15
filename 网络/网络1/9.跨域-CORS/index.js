/* 


     CORS 是基于 http1.1 的一种跨域解决方案
     思路是：如果浏览器要跨域访问服务器的资源，需要获得服务器的允许。

     CORS规定了三种不同的交互模式：
        简单请求
        需要预检的请求
        附带身份凭证的请求
      这三种模式从上到下层层递进，请求可以做的事越来越多，要求也越来越严格

        简单请求 
          请求方法只能是 get、post、head 这三种的其他中一种
          请求头只能包含安全的字段
             如：Accept、Accept-Language、Content-Language、Content-Type、DPR、Downlink、Save-Data等
          请求头如果包含 Content-Type,那么值只能是以下三种的其中一种
             text/plain（披0）、multipart/form-data、application/x-www-form-urlencoded
         同时满足上面三个条件则为 简单请求


       简单请求的交互规范
         当浏览器发出跨域简单请求时，会发生以下事情
            请求头中会自动添加 Origin（哦另值） 字段，值为 页面的源
          
          如果服务器允许简单请求的跨域访问，则需要在响应头中添加 Access-Control-Allow-Origin （啊可生坑凑饿捞哦另值）字段
           值为如下
              *           表示允许所有的源跨域访问
             具体的源      表示只允许该源跨域访问
             
            浏览器接收到响应时，就会取该字段然后跟页面的源进行判断


       需要预检的请求
         浏览器发送预检请求，询问服务器是否允许
         服务器允许
         浏览器发送真实的请求
         服务器完成真实的响应

         1.浏览器发出预检请求，询问服务器是否允许
            请求方法 为 OPTIONS （哦可顺）
            没有请求体
            请求头不会附带改动请求头的信息
            请求头中包含
              Origin: 页面的源
              Access-Control-Request-Method: 后续真实请求将使用的请求方法
              Access-Control-Request-Headers: 后续真实请求会改动的请求头

            如果服务器允许，则需要响应给预检请求时添加请求头
              Access-Control-Allow-Origin: 允许的源
              Access-Control-Allow-Methods: 真实请求的方法
              Access-Control-Allow-Headers: 允许改动的请求头 (如果有一些头部属性没有被允许，后续也不会发送真实的请求)
              Access-Control-Max-Age: 多少秒内，对于同样的请求源、方法、头，都不需要再发出预检请求
      
            浏览器收到预检响应后，会根据这4个属性进行判断

            浏览器发出真实请求，同样需要再请求头中添加属性 Origin
            服务器响应时同样需要再响应头中添加属性 Access-Control-Allow-Origin


       附带身份令牌的请求
           当发生跨域请求时，浏览器不会附带 cookie
           当手动添加上cookie后，预检请求的请求头中 Access-Control-Allow-Headers会多了一个值为 cookie

           服务器预检响应时需要在响应头中添加 Access-Control-Allow-Credentials: true 即可，否则浏览器则会拒绝


       在跨域请求时，js只能拿到一些最基本的响应头，如果要拿到特殊的响应头，则需要再响应头上加上
         Access-Control-Expose-Headers: 允许被拿到的属性
         设置后，js才能拿到特殊的响应头

*/