/* 
    在进行递归操作的时候，我们需要满足一下几个条件
       递归调用必须有结束条件
       每次调用的时候都需要根据需求改变传递的参数内容


    递归需要注意的事项
       递归函数的优点是定义简单，逻辑清晰，理论上，所有的递归函数都可以用循环的方式来实现。
       使用递归时需要注意防止栈的益出，函数调用是通过栈这个数据结构实现的。

    

    function accumulation(n){
        if(n <= 1){
           retrun 1
        }
      retrun n + accumulation(n - 1)
    }

    accumulation(5)


    function factorial(n){
       if(n <= 1){ retrun 1 }
       retrun n * factorial(n - 1)
    }



*/