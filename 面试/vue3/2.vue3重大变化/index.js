/* 

    
    vue3   
         1.  不存在构造函数 Vue
             通过 createApp函数来创建vue应用
             const app = createApp(实例);
             app.mount('css选择器');  最终将其挂在到页面  

         2.  没有Vue构造函数，所以注册插件就不同了。

         3.  vue3 是通过ES6的反射代理来代理vue实例，所以this指向代理对象。

         4.  vue3 页面或组件可以拥有多个根节点。

         5.  vue3 没有data函数，所以数据就不是从data函数中返回的
             新增setup函数，该函数返回的数据，就是vue2 data函数返回的数据
             setup函数的this为undefined, setup函数在所有生命周期钩子函数之前调用

         6.  vue3 新增CompositionApi   
             vue2 为optionApi

             vue3数据没有响应式，想要响应式，必须导入vue的 ref函数，通过ref函数返回的对象就会响应式
             vue3通过代理实例，当访问的数据该为数据时ref函数返回的对象，代理就会返回该对象的value。得到数据，该value会响应式。
             如果是通过vue实例访问响应式数据，就直接访问就行，如果是直接访问响应式数据，就必须 ref对象.value
             

       
      
        


*/