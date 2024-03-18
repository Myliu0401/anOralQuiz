/*  
    进程与线程
      JS是一门单线程语言，指的是一个进程里只有一个主线程。

      进程是CPU资源分配的最小单位，而线程是CPU调度的最小单位。
    
      一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线。
      一个进程的内存空间是共享的，每个线程都可以用这些共享内存。

      
      多进程：在同一个时间里，同一个计算机系统中允许多个进程处于运行状态。（如，听歌、看新闻同时进行）

      多线程：进程中包含多个执行流。即一个程序中可以同时运行多个不同的线程来执行不同的任务。
             如  渲染线程、JS线程、HTTP请求线程等等

       
        浏览器内核是多线程，在内核控制下各线程相互配合保持同步
           UI渲染线程
           JS线程（负责执行js代码）
           定时器线程
           事件线程
           HTTP请求线程


           UI线程
             主要负责页面的渲染，解析HTML CSS  构建dom树 绘制页面等
             当界面需要重绘或者由于某种操作引发回流是，将执行该线程
             该线程与JS线程互斥，当执行JS线程时，UI线程被挂起，当任务队列空闲时，UI线程才会执行

           JS线程
             负责执行js代码
             该线程和UI线程互斥，当JS线程执行时间过长时，将导致页面渲染阻塞

           定时器线程
             负责执行定时器计时
             js代码执行带有定时器，那么会将定时器交给该线程进行计时处理，计数以到的时候会将处理函数加入到队列

           事件线程
             主要负责监听页面。如 监听用户点击等。触发后同样会将处理函数加入到队列。

           HTTP线程
             负责执行异步请求的函数线程 如  Promise fetch  ajax
             遇到请求，该线程负责请求处理，完毕后将处理函数加入到队列



        浏览器中的事件循环
            宏任务队列和微任务队列
            


     
    Node环境事件循环
       
       node的运行机制 
          v8引擎解析JS代码
          解析后执行调用Node API
          libuv库负责Node API的执行，它将不同的任务分配给不同的线程，形成一个事件循环，以异步的方式将任务执行结果返回给V8引擎
          v8引擎再将结果返回给用户

        libuv引擎将事件循环分为6个阶段，它们会按照顺序反复运行
          外部输入数据 ---> 轮训阶段（poll）---> 检查阶段（check）---> 关闭事件回调阶段（close callback）
                      ---> 定时器检查阶段（timer）---> I/O 事件回调阶段（I/O callbacks）---> 闲置阶段（idle、prepare）
                      ---> 轮训阶段

*/