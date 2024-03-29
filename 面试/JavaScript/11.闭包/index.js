/* 

     什么是闭包 
       闭包不是一个具体的计数，而是一种现象，是指在定义函数时，周围环境中的信息可以在函数中使用
       换句话说就是 执行函数时，内部函数使用了外部函数变量时就会产生闭包
       而作用域链，是实现闭包的手段


     什么是闭包
        闭包是一种现象，作用域链是实现闭包的基础，只有在函数中的内部函数用到外部变量时才会产生闭包。
        因为函数中的内部函数用到了外部变量，内部函数的作用域中就会有引用指向外部作用域。所以就能通过作用域链访问到外部作用域中的变量
        所有如果闭包多了，没有清除会导致内存泄漏。
        清除闭包的方法就是将内部返回出来的函数重新赋值，js垃圾回收机制就会将其回收掉。
        
        如果函数中的内部函数没有用到外部变量的话，js引擎不会将外部作用域的引用存到内部函数的作用域中。也就是内存中不会存着外部作用域，提高执行效率。

        所以只有函数中的内部函数用到外部的变量才会产生闭包。

*/