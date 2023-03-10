/* 
   事件流 
      事件冒泡，即事件开始时由具体元素接收，然后逐级向上传播到较为不具体的节点
      所有现代浏览器都支持事件冒泡
      IE9、Firefox、谷歌、Safari 将事件一直冒泡到window对象


      事件捕获
        在事件捕获过程中，最顶层首先接收到click事件，然后事件沿着DOM树依次向下，一直传播到事件的实际目标上
        IE9、Firefox、谷歌、Safari 都支持事件捕获，但是也是从window对象开始向下捕获



      标椎DOM事件流
        DOM标椎采用的是捕获＋冒泡得方式
        两种方式都会触发dom的所有对象，从docuemnt开始，也在docuemnt结束
        换句话说，起点和终点都是document元素（很多浏览器可以一直捕获＋冒泡到window对象）


       DOM标椎规定事件流包括三个阶段：事件捕获、处于目标、事件冒泡三个阶段
          事件捕获阶段：实际目标元素在捕获阶段不会触发事件。捕获阶段从window开始，然后到docuemnt、html,最后
                       到目标元素，意味着捕获阶段结束

          处于目标阶段：事件在目标元素上发生并处理，但是本次事件处理会看成冒泡阶段的一部分

          冒泡阶段：事件又传播回到顶层


         事件委托
           事件冒泡最大的好处就是可以实现事件委托



*/