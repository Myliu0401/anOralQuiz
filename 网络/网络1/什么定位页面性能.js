/**
 * 使用 DevTools Network 面板查看耗时分布（DNS、SSL、TTFB、下载时间）；
   检查阻塞的资源（尤其是同步 JS）。


   http1与http2 其中的一个区别就是  http1 每次请求都会创建新TCP链接  http2是多个请求共享一个链接(多路复用)
 */