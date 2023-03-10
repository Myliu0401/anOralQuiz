/* 

   什么是严格模式
      严格模式是ES5开始新增的一种方式，是采用具有限制性JS变体的一种方式，从而使代码隐式的脱离普通模式

   
   严格模式的特性
      消除JS语法的一些不合理，不严谨，减少一些怪异行为
      消除代码运行的一些不安全之处，保证代码运行的安全
      提高编译器效率，增加运行速度
      为未来新版的JS做好铺垫


    开启严格模式
      'use strict'  是 停（潮汕话）


    严格模式有两种调用方式
      整个脚本文件
         ‘use strict’ 放在脚本文件的第一行，则整个脚本都以 严格模式 运行

      单个函数
         ‘use strict’ 放在函数体的第一行，整个函数中的环境都以 严格模式 运行


      严格模式下
        1.没有声明的变量不能使用，会报错
        2.删除变量和不允许删除的属性会报错
        3.相同的形参会报错
        4.对象不能有重名的属性
        5.进制8进制表示法
        6.函数直接调用时，函数内部this指向undefined
        7.会创建eval作用域
       



*/