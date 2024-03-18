/* 

        CSRF攻击原理: 利用用户的身份信息，执行了用户非本意的操作
           如
             用户访问一个银行网站，并登陆了账号，服务器会把令牌通过 set-cookie 给到浏览器。
             用户如果去点击其他链接，进入到钓鱼网站，钓鱼网站中会，用标签请求到银行网站，因为保存了cookie，所以浏览器会自动带过去
        
        CSRF攻击是跨站请求伪造，是一种利用用户在当前已登陆的网站存储过cookie。
        当用户访问一个危险网站时，网站会发出请求到被攻击的站点，这次请求会携带用户的cookie发送，因此就利用了用户
        的身份信息完成攻击。

        防御
          1.不使用cookie, 使用sessionStorage、loaclStorage存储令牌，因为浏览器不会带上这两个
          2.为表单添加校验的token校验 （csrf token）
          3.cookie中使用sameSite字段 
          4.服务器检查referer字段
             


          sameSite:  是在响应时，在cookie中添加sameSite。如 set-cookie: cookieName=cookieValue; sameSite=value;
                     sameStie有三个可选值   strict、lax、noen

                     strict: 表示严格，完全禁止第三方获取cookie, 跨站时，不会附带cookie，只有当前网站的url与请求时的url一致时，该请求才会附带该cookie。
                             由于过于严格，导致可能出现某种影响，如：当利用a标签点击跳转到其他页面时，该页面不会附带cookie。

                     lax: 防范跨站，大多数情况下会紧张获取cookie，只有跨站的请求时get或是表单发出的请求时，该请求才会附带cookie。

                     none: 表示没有限制。


          csrf token: 用户访问一个网站时，服务器生成一个随机token，保存到session中，并将cookie给到客户端，当有重要请求时会带上该cookie,服务端验证后销毁该token。
                      当有跨站请求时，没有该cookie或者在该服务端中该cookie已经过期，则验证不通过。
                      弊端：可以在恶意网站中先请求拿到临时token，再发起重要请求，就可以附带该临时cookie过去。
          
          
          
          referer: 请求时，浏览器会在请求头上带上该属性，值为当前网站的源，服务器就可以根据请求头中该属性进行判断，但是目前已有漏洞，
                    当利用iframe标签链接到其他页面，将该iframe标签的src属性链接到一个页面，该页面进行bs64编码后，直接放到该
                    iframe标签的src中，当执行时，iframe链接的页面中的请求，请求头不会附带referer属性
          
             
           




*/