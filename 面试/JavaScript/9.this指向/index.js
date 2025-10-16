  /* 
     this的指向规律有几条
       1.在函数体中，非显式或隐式地简单调用函数时，在严格模式下，函数内的this会被绑定为undefined,非严格模式下
         则会被绑定到全局对象上（直接调用函数的情况下）

       2.一般使用 new 调用时，构造函数内的this会被绑定到新创建的对象上

       3.一般通过call/apply/bind方法显式调用函数时，函数体内的this会被绑定到指定参数对象上

       4.一般通过对象调用函数时,函数体内的this会被绑定到该对象上

       5.在箭头函数中，this指向是由外层（函数或全局）作用域来决定的



    this指向绑定事件的元素
      DOM元素绑定事件时，事件处理函数里面的this指向绑定了事件的元素
      这个地方一定要注意它和事件原对象里的target的区别，target是指向触发事件的元素


    改变this指向
      bind、apply、call没传参数或者是null、undefined的话，该函数this指向全局，如果参数是number、string、boolean则会生成对应的包装类传进去
      bind绑定this后返回的函数的this无法再改变
    
    const slice = Function.prototype.call.bind(Array.prototype.slice)
    slice([1,2,3],0,1)
    返回一个新的call函数，该函数的this指向slice。
    call函数的内部是调用this函数，并将this函数的this指向第一个参数



    function f(){cosnole.log(this.v)}
    var o = {v:123}
    var bind = Function.prototype.call.bind(Function.prototype.bind);
    bind(f, o)()
    返回一个新的call函数，该函数的this指向bind。
    call函数内部是调用this函数，call函数的this指向bind，所以会执行bind函数，并且将bind函数的this指向f函数，call
    内部中执行this函数并返回。
    而bind函数的内部会返回一个新的this函数，该函数的this指向参数。

  
*/