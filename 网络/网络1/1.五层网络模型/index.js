/* 
      分层的意义
          可以把复杂的问题，使用分层进行简单化

       
          每层相对独立，只需要解决自己的问题
          每层无需考虑上层的交互，仅需把自己的结果交给下层即可
          每层有多种方案可供选择，选择不同方案都不会对上下层造成影响
          每一层会在上一层的基础上增加一些额外信息



        应用层
          规定了相关消息格式   http、FTP、DNS解析等
          主要面向互联网中的应用场景 如 网页、邮件、文件等等，它的代表协议有 http、smtp、DNS等
        
        传输层
          规定了如何保证消息的可靠传递   TCP、UDP
          主要面向传输过程，如 TCP协议是为了保证可靠的传输

        网络层
          规定了如何在互联网中找到对方    IP地址、路由器
          主要解决如何定位目标以及如何寻找最优路径的问题 如 IP协议。
          会将目标设备的ip地址添加到数据包的头部，然后路由器会根据数据包头部的ip地址来确定“走那条路线最近”，并将数据包发送到目标设备所在的路径（也就是网络），然后由下一层数据链路层进行处理。

        数据链路层
          规定了如何在一个子网中找到对方   MAC、交换机。
          将数据在一个子网内有效传播 如 MAC地址。
          每台设备在网络中都会有一个唯一的MAC地址，用于在局域网中标识和定位设备。
          当接收到网络层的数据包时，数据链路层会使用ARP来解析数据包头部的ip地址和MAC地址（局域网地址）之间的映射关系。
          如何确定： 源设备会发送一个ARP广播到局域网中，当目标设备监控到有人发送信息到局域网中，会判断是否是“找自己”，如果
            是，则会向局域网中发送一个ARP响应，将其在局域网中的MAC带上。源设置会在数据包头上加上目标设备的MAC地址，然后交给物理层。

        物理层
          如何用信号表示   光纤、集线器等
          解决二进制数据到信号之间的互转问题  如  集线器

      发出一个请求（http）消息格式 *应用层* ---> TCP进行保证消息可靠 *传输层*---> IP（如何在互联网中找到目标）*网络层* ---> 数据链路层（如何在子网中找到对方）*数据链路层*---> 光纤进行传输 *物理层*


      数据的封装和解封装
           发送请求 （应用层协议对数据添加一个头部）---> （传输层继续添加一个头部）---> (网络层继续添加一个头部)
                    ---> （数据链路层添加一个头部和尾部）---> （物理层把处理后的数据变成信号进行传输）

           接收请求 （物理层对信息解析成数据）---> （数据链路层解析掉头部和尾部）---> （网络层继续解析掉另外一个头部）
                    ---> （传输层继续解析掉另一个头部）---> （应用层继续解析掉另一个头部）---> 服务器接收到原始数据
*/


/* 
       网络层，会将目标设备的ip地址添加到数据包的头部，然后路由器会根据数据包头部的id地址来确定“走那条路线最近”，并将数据包发送到目标设备所在的路径（也就是网络），然后有下一层数据链路层进行处理。

       数据链路层，每台设备在网络中都会有一个唯一的MAC地址，用于在局域网中标识和定位设备。
          当接收到网络层的数据包时，数据链路层会使用ARP来解析数据包头部的ip地址和MAC地址（局域网地址）之间的映射关系。
          如何确定： 源设备会发送一个ARP广播到局域网中，当目标设置监控到有人发送信息到局域网中，会设置是否是“找自己”，如果
            是，则会向局域网中发送一个ARP响应，将其在局域网中的MAC带上。源设置会在数据包头上加上目标设备的MAC地址，然后交给传输层。



*/