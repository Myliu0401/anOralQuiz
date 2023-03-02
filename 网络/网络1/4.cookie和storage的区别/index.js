/* 

     cookie、seesionStorage、localStorage 都是保存在本地的
     
     cookie的兼容性好，所有浏览器都支持，而且浏览器会针对cookie做出一些默认行为。
     但是这些默认行为会带来受恶意攻击的机会，CSRF攻击就是一个典型的利用cookie的攻击方式。

     H5新增了 seesionStroage和localStroage，前者用于保存会话级别的令牌，后者用于保存更持久的令牌。
     浏览器不会对这两个有任何的默认行为，这样一来，保存令牌，读取令牌、附带令牌 的工作就只能手动完成，这
     就让恶意攻击者难以针对登陆状态进行攻击。

     cookie是有大小限制的，一般存储总量为4M，而seeionStroage和localStroage没有大小限制。

     cookie会与domain、path关联，而seeionStroage、localStroage只与domain关联（只能用同个网站下的）



     什么情况用cookie什么情况用其他的
        后端如果响应为 set-cookie 则不管，这种情况就用cookie
        如果为其他方式没有用set-cookie,则可以读出来，放进seeionStroage或localStroage中



*/