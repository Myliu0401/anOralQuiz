

// ### 1. 根据下面 *ES6* 构造函数的书写方式，要求写出 *ES5* 的

class Example {
    constructor(name) {
        this.name = name;
    }
    init() {
        const fun = () => { console.log(this.name) }
        fun();
    };
    static jintai() {

    }
}
const e = new Example('Hello');
e.init();


/* 
    1.  class中所有代码都是严格模式

    2.  class原型上所有函数都不能被new

    3.  class原型上所有函数都不能被遍历到

    4.  class必须使用new来调用

*/

"use strict"

const Example = (() => {
    function Example(name) {
        if (!(this instanceof Example)) {
            throw new Error('只能使用new')
        }
        this.name = name;
    };

    setPrototypeAndStatic(Example, [{
        key: 'init',
        value: function init() {
            if (new.target === init) {
                throw new Error('原型上的方法不能使用new')
            }
        }
    }], [{
        key: 'jintai',
        value: function jintai() {
            if (new.target === jintai) {
                throw new Error('原型上的方法不能使用new')
            }
        }
    }]);

    return Example;
})();

/**
 * 设置静态上的和原型上的
 * @param {*} Func      目标函数
 * @param {*} protots   原型上属性
 * @param {*} statics   静态上属性
 */
function setPrototypeAndStatic(Func, protots, statics) {
    if (protots) {
        _defineProperties(Func.prototype, protots);
    }
    if (statics) {
        _defineProperties(Func, statics);
    }
};

/**
 * 
 * @param {*} target  目标
 */
function _defineProperties(target, props) {
    for (let item of props) {
        const ties = {
            enumerable: false, // 设置不能被枚举
            configurable: false
        }
        Object.defineProperties(target, item.key, ties);
    }
};


// ### 2. 数组去重有哪些方法？（美团 *19* 年）

function qichong(data) {
    const arr = [];
    const obj = {};
    for (let i = 0; i < data.length; i++) {
        arr.includes(data[i]) || arr.push(data[i]);
        // 或者
        // obj[data[i]] || (obj[data[i]] = true)  
    };

    return arr // 或者 Object.keys(obj)
};

[...new Set([1, 2, 3, 4, 5, 5, 5, 5, 5])]


// ### 3. 描述下列代码的执行结果
foo(typeof a);
function foo(p) {
    console.log(this);  // window
    console.log(p); // undefined
    console.log(typeof b);  // 报错 因为访问到了暂时性死区里的东西
    let b = 0;
};


// ### 4. 描述下列代码的执行结果
class Foo {
    constructor(arr) {
        this.arr = arr;
    }
    bar(n) {
        return this.arr.slice(0, n);
    }
}
var f = new Foo([0, 1, 2, 3]);
console.log(f.bar(1));  // [0]
console.log(f.bar(2).splice(1, 1)); // [1]
console.log(f.arr); // [0,1,2,3]



// ### 5. 描述下列代码的执行结果

function f(count) {
    console.log(`foo${count}`);
    setTimeout(() => { console.log(`bar${count}`); });
}
f(1);
f(2);
setTimeout(() => { f(3); });

// 1. foo1  2. foo2  3. bar1  4. bar2  5. foo3  6. bar3 



// ### 6. 描述下列代码的执行结果
var a = 2;
var b = 5;
console.log(a === 2 || 1 && b === 3 || 4); // true


// ### 7. 描述下列代码的执行结果

export class ButtonWrapper {
    constructor(domBtnEl, hash) {
        this.domBtnEl = domBtnEl;
        this.hash = hash;
        this.bindEvent();
    }
    bindEvent() {
        this.domBtnEl.addEventListener('click', this.clickEvent, false);
    }
    detachEvent() {
        this.domBtnEl.removeEventListener('click', this.clickEvent);
    }
    clickEvent() {
        console.log(`The hash of the button is: ${this.hash}`); // 考查dom绑定事件的this, this此时指向dom元素，元素上没有该属性则为undefined
    }
};



// ### 8. 箭头函数有哪些特点

/*
   1. 没有 function 关键字
   2. this指向定义函数时该区域的作用域
   3. 箭头函数不能作为new使用
   4. 箭头函数没有原型
   5. 箭头函数没有 new.taget、arguments、this
   6. 箭头函数不能作为 生成器


*/


// ### 9. 说一说类的继承

/*
  原型继承、盗用构造函数继承、伪经典继承、圣杯模式继承

  继承是面向对象的三大特征之一

  原型继承
    function zi(){

    }
    function fu(){
       this.colors = [1,2,3]
    };

    zi.prototype = new fu()

    const a = new zi()
    const b = new zi()
    a.colos.push(4)

    缺点：因为原型上是共享的，原型继承会将基类实例中的东西也在原型中，所有会导致其他new出来的实例也会跟着改变。


   盗用构造函数继承
      function zi(){ fu.call(this, 123) }
      function fu(name){ this.name = name }
      fu.prototype.test = ()=>{}
      const a = new zi();

    缺点：只是盗用构造函数，没有盗用构造函数的原型，所以子类实例原型上没有基类的原型



   组合式继承/伪经典

      function zi(){
         this.call(this, 123)
      }

      function fu(name){
         this.name = name
      }

      fu.prototype.test = ()=>{}
      zi.prototype = new fu()

      const a = new zi()

     缺点： 效率问题，基类函数被执行了两次，一次在赋值给子类的原型，一次在子类函数中执行，基类被执行了两次

     组合式继承本质上是子类原型上拥有基类实例的所有属性，所有在执行子类时改变其原型即可。



    圣杯模式
       function auxiliary(zi, fu){
           function F(){

           }

           F.prototype = fu.prototype

           zi.prototype = new F()
           zi.prototype.constructor = zi;
       }

       auxiliary(zi, fu)

       function zi(){
          fu.call(this, ...)
       }

       function fu(){

       }




*/


// ### 10. *new* 操作符都做了哪些事？

/*
   1. 生成一个对象
   2. 对象的原型指向 函数/类型 的原型
   3. 函数/类 中的this指向该对象
   4. 最后将该对象返回出去
*/


// ### 11. *call、apply、bind* 的区别 ？

/*
    1. 这三个都是改变this指向
    2. call 参数为每一项
    3. apply 参数为数组
    4. bind 为返回一个新函数，新函数的this指向指定参数
*/

// ### 12. 事件循环机制（宏任务、微任务）

/*
     js只有js线程负责执行js，其他线程负责监听（如：定时器线程、事件线程），当达到条件时，会将处理函数添加进行任务队列中，任务队列又分为
       宏队列和微队列，定时器、事件、http这些异步都会进入宏队列。promise则进入微队列，当js执行栈为空时，会看任务队列中是否有函数需执行。
       先看微队列，如果微队列有则拿到js执行栈中执行，微队列为空时，则处理宏队列，每次处理宏队列时都会看一眼微队列，微队列有则执行微队列，再执行宏队列。

*/

// ### 14. 什么是函数柯里化？

/*
   柯里化，是固定函数的参数，利用闭包的特性，返回一个函数将上一个执行的函数的参数固定，当条件达到时，才会执行真正的函数，并且传入前面固定的参数。


   function currying(callback, ...residue){

        return (...residue1)=>{
           const arr = [...residue, ...residue1]
           if(callback.length <= arr.length){
              retrun callback(...arr)
           }else{
             retrun currying(callback, ...arr);
           }
        }
   }

*/


// ### 15. *promise.all* 方法的使用场景？数组中必须每一项都是 *promise* 对象吗？不是 *promise* 对象会如何处理 ？

/*
     all 在需在多个异步同时进行的情况下，并且会等待所有异步都有结果之后，才会有结果的情况下可以使用promise.all

     数组的每一项不必全是promise，如果数组的某一项不是promise，则promise会调用promise函数静态属性的resolve，并且将值传进去，
     会变成一个成功状态的promise,值为该数组项。

*/


// ### 16. *this* 的指向哪几种 ？

/*
    普通函数直接调用 this 指向window对象
    严格模式普通函数直接调用 this 为undeifned
    对象去调用自己属性的函数 this 指向该对象
    当使用 new 时，this 指向新创建的对象，该对象的原型执行该函数的原型
    call 可以改变函数的this,使this指向call函数的第一个参数，call函数重第二个参数开始会作为参数传给目标函数
    apply 可以改变函数的this,使this指向apply函数的第一个参数，appl函数的第二项为数组，会把数组的每一项作为参数传给目标函数
    bind 会返回一个新函数,该函数的功能与目标函数一模一样，但是该新函数的this，指向bind的参数。
    箭头函数的 this 指向，定义箭头函数时外层作用域

*/


// ### 17. *JS* 中继承实现的几种方式

/*

   原型链继承、盗用构造函数、组合式继承、圣杯模式

   原型链继承
     重点： 子类原型直接等于基类实例
     特点： 子类继承基类的所有属性。如 基类的实例属性、原型属性
     缺点： 继承时没办法向基类传递参数，从而使继承单一、继承时使基类所有属性都继承在原型上，将一些不必继承在
           原型上的属性也继承了进去，从而使所有属性都共享了。

   盗用构造函数
      重点： 在子类构造函数中执行基类从而实例上拥有基类实例属性
      特点： 只继承了基类实例，解决了原型链继承时所有属性都被共享的问题
            继承基类时，可以传递参数，解决了原型链继承不能传递参数的问题
            只继承基类的属性，没有继承基类的原型
            可以在子类中继承多个基类，解决了原型链继承单一的问题
      缺点： 只能继承基类的属性，没办法继承基类的原型
             每次调用子类构造函数时都会调用基类

    组合继承
       重点：结合了原型链继承和盗用构造函数的优点
       特点：可以在子类中执行基类时传递参数，并且可以继承多个基类的属性
            每个属性都是私有的，不像原型链继承哪样都是共享的
       缺点：执行了两次基类，浪费效率

    圣杯模式
       重点：解决了 原型链继承、盗用构造函数、组合继承 的缺点

*/


// ### 18. 什么是事件监听

/*
    事件监听器就是当绑定dom事件时，需要绑定一个处理函数，该处理函数就是事件监听器
    js的事件线程会监听dom事件，监听用户是否触发，该系统叫做事件监听
    W3C中规定了事件的三个阶段  事件捕获、目标阶段、事件冒泡

    事件捕获：从最顶层的dom或widnow,沿着dom树一层层的往下传递
    目标阶段：当事件捕获传递到触发事件的dom，在该dom时，处理目标阶段
    事件冒泡：从目标dom，沿着dom树一层层往上冒，冒到最顶层dom或window


*/

// ### 19. 什么是 *js* 的闭包？有什么作用？

/*
    闭包是一种现象，作用域链是实现闭包的基础。
    当函数中的函数使用外部的变量时就会形成闭包，相当于该内部函数的作用域中就会有引用指向外部作用域，使其成为该内部函数的私有属性。
    当闭包过多时会导致内存泄露，因为保存过多的作用域。

    但一些需要私有变量时就可以使用闭包，如 函数防抖、函数节流


*/


// ### 20. 事件委托以及冒泡原理
/*
    事件委托是将事件绑定在目标dom的祖先dom,当触发目标dom时就会冒泡到绑定的dom上，从而实现事件委托。
    事件冒泡是从目标dom沿着dom树一层层往上传递事件的过程。
    事件冒泡的好处就是可以利用其实现事件委托


*/

// ### 21. *let const var* 的区别？什么是块级作用域？如何用？

/*

  let和const 不会有变量提升，有暂时性死区。也有块级作用域，不能跨块访问。
  const 必须初始化，就是声明变量时必须赋值且不能更新变量值。
  var 有变量提升，没有块级作用域，也不存在暂时性死区

  大括号内用 let、const 声明，就是块级作用域。


*/

// ### 22. *ES5* 的方法实现块级作用域（立即执行函数） *ES6* 呢？

/*

   ES5想实现块级作用域只能利用函数作用域来当成块级作用域
   (()=>{  })() 立即执行函数

   ES6直接在大括号中用 let或const 声明变量，就拥有块级作用域

*/


// ### 23. *ES6* 箭头函数的特性

/*
    1. 箭头函数没有arguments，所以形参和实参不映射
    2. 箭头函数没有原型，不能当成构造函数使用
    3. 箭头函数没有 this、new.taget、arguments 如果使用了，则会使用外层作用域的
    4. 箭头函数没有原型，不能当成继承函数使用，所以也不能被ES6类的super
    5. 箭头函数不能当做生成器
    6. 箭头函数都是匿名函数


*/

// ### 24. 箭头函数与普通函数的区别 ？

/*
    普通函数能当成构造函数使用
    普通函数拥有 this、new.taget、arguments
    普通函数拥有原型
    普通函数形参和实参会映射
    普通函数能作为继承函数使用，所以能被ES6类的super


*/

// ### 25. *JS* 的基本数据类型有哪些？基本数据类型和引用数据类型的区别

/*
     string、number、null、undefined、boolean、symbol

     基本类型数据不能往下继续拆分而引用类型数据可以继续往下拆分
     基本类型数据大小是固定的所以存到栈中，而引用类型大小不固定所以存到堆中


*/

// ### 26. NaN

/*

    NaN 表示非数，它属于数字类型
    任何涉及NaN的操作都返回NaN
    NaN不等于任何东西，包括它自己

*/

// ### 27. *JS* 的作用域类型

/*

     全局作用域   当代码执行时，最先的就是全局作用域
     函数作用域   当函数执行时，在函数内部会产生一个函数作用域
     块级作用域   ES6新增的作用域，在大括号内用 let、const 声明的变量就拥有块级作用域
     eval作用域   当使用eval函数时，会产生一个eval作用域

*/

// ### 28. *undefined==null* 返回的结果是什么？*undefined* 与 *null* 的区别在哪？

/*
     undefined==null  为true

     undefined表示没有，undefined如果被当作数学运算会被转化为NaN
     null表示为空，null如果被当作数学运算会被转化为0

     当访问一个没有的变量或者属性为，为undefined
     null会作为原型链的终点

*/


// ### 29. 写一个函数判断变量类型

/*
     function typeJudgment(data){
          const type = Object.prototype.toString.call(data);
          retrun type.slice(0, type.length - 1)
     }


*/

// ### 30. *js* 的异步处理函数

/*

    js最早的异步是通过回调函数的方式来处理异步，但是容易产生回调地狱

    ES6新增了 Promise的异步解决方案，该方案消除了回调地狱，没有消除回调，写起来代码也变多了，不好阅读

    ES6同时也新增了 生成器 来处理异步，通过 yield 关键字来停止执行函数。但是外部必须写执行器，代码写起来也不简单不好阅读

    最终有了 async await 关键字  async函数会返回一个promise, await则会等待promise有结果之后才会往下执行。
     相当于 async await 是promise和生成器的结合

*/

// ### 31. *defer* 与 *async* 的区别



// ### 32. 浏览器事件循环和任务队列
/*
   在第12道中有回答
*/


// ### 33. 原型与原型链 （美团 19年）
/*
     对象没有prototype属性，只有__prop__属性，函数拥有prototype和__prop__属性

     每个函数（除箭头函数外）都有一个 prototype 属性，该属性表示该函数的原型，原型中有一个constructor属性指向构造函数本身
     每个通过构造函数生成的对象都有一个 __prop__ 属性，该属性指向构造函数的原型（创造该对象的函数的原型）

     函数的prototype为对象，该对象中的__prop__指向创建该对象的函数的原型（也就是Object函数的原型），Object函数的原型的__prop__指向null,也就是原型链的终点
     函数的__prop__指向创建该函数的原型（也就是Function函数的原型），Function函数的__prop__指向Object函数的原型

     当new一个函数时会返回一个对象 该对象的__prop__指向函数的原型，函数的原型的__prop__指向Object的原型，Object原型的__prop__指向null

     最终会形成一条原型链


*/


// ### 34. 作用域与作用域链 （美团 19年）

/*
    作用域是代码的某些特定部分，作用域决定了某些变量的可访问性。

    每个函数都有一个作用域，该作用域中会指向外层作用域，最外层作用域为全局作用域

    当访问某一个属性时，会先查找本作用域，如果本作用域中没有则会沿着作用域链往上一级找，找到全局作用域中如果没有则返回undefined

*/


// ### 35. 闭包及应用场景以及闭包缺点 （美团 19年）

/*
    闭包是一种现象，函数内部函数使用外部变量时就会产生闭包
    应用场景 需要将变量变成私有变量的  如 函数防抖 函数节流
    闭包过多会导致内存泄露

*/

// ### 36. 继承方式 （美团 19年）
/*
   第17道题有回答
*/


// ### 37. 原始值与引用值 （美团 19年）

/*
    原始值为不可再细分的,以最底层或最简单的形式呈现 分为 string、number、boolean、null、undefined、symbol
     由于原始值不可再细分，大小固定所以存在内存的栈中

    引用值可以再细分 为 object，且大小不固定所以存在内存的堆中

    访问方式
       原始值：访问的是值
       引用值：访问的是引用

    比较方式
       原始值：比较的是值
       引用值：比较的是引用

    动态属性
       原始值：没法添加属性
       引用值：可以添加属性

    变量赋值
       原始值：赋的是数据
       引用值：赋的是引用地址


*/

// ### 38. 描述下列代码的执行结果

/* 

3 7 10 4、5 2、7 1 2 6 9 8

const first = () => (new Promise((resolve, reject) => {
    console.log(3);  
    let p = new Promise((resolve, reject) => {
        console.log(7);
        setTimeout(() => {
            console.log(1);
        }, 0);
        setTimeout(() => {
            console.log(2);
            resolve(3);
        }, 0)
        resolve(4);
    });
    resolve(2);
    p.then((arg) => {
        console.log(arg, 5); 
    });
    setTimeout(() => {
        console.log(6);
    }, 0);
}))

first().then((arg) => {
    console.log(arg, 7); 
    setTimeout(() => {
        console.log(8);
    }, 0);
});

setTimeout(() => {
    console.log(9);
}, 0);

console.log(10);


*/

// ### 39. 如何判断数组或对象（美团 19年）

/* 

 1. Object.prototype.toString.call(data)

 2. instanceof
    如 data instanceof Object/Array

 3. constructor
    data.constructor === Object/Array

 4. Array.isArray(data)


*/

// ### 40. 对象深拷贝与浅拷贝，单独问了 *Object.assign*（美团 19年）

/* 
    Object.assign  是用来对象混入的 会将从第二个参数开始，混入到第一个参数中。该混入只是进行浅混入。

    浅拷贝  只是对对象中属性直接进行复制
    深拷贝  会对对象中引用值属性再进行拷贝


    function deepAndLightCopies(data, deep = true){
          if(typeof(data) !== 'object'){
             retrun data
          };
          const newData = Object.prototype.toString.call(data) === '[object Object]' ? {} : [];
          for(let name in data){
              
               newData[name] = deep ? deepAndLightCopies(data[name], deep) : data[name]

          }

          retrun newData
    };


*/


// ### 42. 说说 *instanceof* 原理，并回答下面的题目（美团 19年）

/* 
function A(){}
function B(){}
A.prototype = new B(); 
let a = new A(); 
console.log(a instanceof B)  true 



instanceof 关键字 是用于判断数据中是否有某个函数的原型

ES6出了知名符号后，可以操作instanceof关键字的判断

// 通过属性描述符的方式修改函数中的该属性
Object.defineProperty(函数, Symobl.hasInstance, {
    value(){
        retrun boolean
    }
})

*/

// ### 43. 内存泄漏（美团 19 年）

/* 
    内存泄露是由于 程序中的变量数据 需要在内存中开辟空间存储，到数据过多时，内存中空间会被开辟满，js垃圾回收机制没有回收
    就会导致内存泄露

    js常用垃圾回收机制   引用计数、标记清除

    引用计数 当引用数据被创建并赋值时 该变量的标记1 当被复制时会加1 删除时会减1，当为0时会被垃圾回收机制清除掉
            优点： 实时，当引用为0时即可被垃圾回收机制回收掉
            缺点： 函数中和循环引用时，引用没办法为0，所以没办法被清除掉

    标记清除 当js线程空闲时，会循环堆中数据并且标记为0，然后从全局开始循环获取变量，标记为1，最终循环堆中数据
            将标记为0的数据回收掉
            优点：简单，只标记0和1，能够解决函数中和循环引用的问题
            缺点：需要js线程去执行，所以需要js线程处于空闲状态否则会出现卡顿
    
        以上都会产生内存碎片，所以又出现了标记整理算法
    标记整理  就是标记清除完成后，会将内存中所以变量往左靠，然后清理边界

*/

// ### 44. *ES6* 新增哪些东西？让你自己说（美团 19 年）

/* 
     块级作用域
        增加 let、const 声明变量，这两个在大括号中声明会有块级作用域
        这两个都没有变量提升。const必须初始化，并且不能修改

     字符串和正则表达式
        增加了字符串原型上的方法 
           includes  判断是否拥有某一项
           startsWith 判断是否以某一项开头
           endsWith   判断是否以某一项结尾
           repeat    会对字符串进行拼接几次后才会（参数为次数）
        
        增加了正则表达式标记名 y

        增加了 `` 号字符串


     函数
       增加了函数默认值，当函数使用默认值后，该函数将会变成严格模式
       增加了剩余参数，剩余参数只能放到形参的最后一个，最终会以数组的形式呈现
       增加了展开运算符，对象只能在对象中展开，数组也能在对象中展开，如果对象在数组中展开那么该展开对象必须是一个可迭代对象
       增加了箭头函数，箭头函数没有 this、new.tagert、arguments, 如果使用了则会是外层的作用域的，箭头函数也没有原型、不能作为new使用、箭头函数只能是匿名的


     对象
      增加了 成员速写、方法速写、计算属性名
      Object增加了api 
         is 判断两个数据是否严格相等 
         assign  混入
         ...
      增加了类 （calss）
         类中所有代码都处于严格模式。原型上的所有属性都不会被遍历到，类中的所有方法都不能作为构造函数使用，没有原型。
         类必须使用new，否则会报错


     解构
       对象解构  const { a, b } = {a:123, b:456}
       数组解构  const [b, c] = [1,2,3,4,5]
       参数解构 (a:{adsa})=>{}

     符号
       共享符号  Symbol.for(描述)   只要描述一致，则会返回同一个符号
       普通符号  Symbol(描述)   无论描述是否一致都会返回唯一的符号
       知名符号  Symbol.xxx     原型上的属性，使我们可以参数某些关键字的判断

     promise
       为了解决回调地狱
       原型上的方法  then、catch、finally
       静态上的方法  resolve、reject、race、all、allSettled

     迭代器、生成器
       迭代器是一个对象 对象中必须拥有 next方法且返回一个对象，对象中有两个属性 value: 此次迭代的值 dong: 迭代是否结束
       可迭代协议 当一个数据中有一个 Symbol.iterator 属性，值为函数，并且返回一个迭代对象。那么该数据就是可迭代的
       但一个函数加上*号后，那么该函数会返回一个生成器，生成器也是一个可迭代对象和迭代器
       执行带有*号的函数就会返回一个生成器，yield关键字会停顿函数，该关键字只能在生成器函数中

     反射和代理
       Proxy代理
         new Proxy(目标, 配置对象)  会返回一个代理
    
       Reflect反射  用于修改目标


     增强数组功能
        isArray  判断是否是数组

        from     将伪数组变成数组


    
     更多集合类型
        增加了 set数据类型  用于存放不会重复的数据 
          new Set(可迭代数据)  会返回一个可迭代对象

        增加了 map数据类型  键可以是任何类型
          new Map(可迭代对象) 会返回一个可迭代对象

        


*/


// ### 45. *weakmap、weakset*（美团 *19* 年）


// ### 46. 为什么 *ES6* 会新增 *Promise*（美团 19年）

/* 
    
    ES6以前处理异步只有回调的方式，当回调嵌套过多会导致回调地狱，所以ES6出了Promise用来解决回调地狱


*/


// ### 47. *ES5* 实现继承？（虾皮）

/* 
  
    原型链继承

       function a(){}
       function b(){}

       a.prototype = new b()

       缺点：会导致基类所有属性都处于共享状态，基类的实例属性也处于共享状态，会导致改动一个a实例，其他也会跟着改动

    
    盗用钩子函数

       function a(){
           b.call(this, ...)
       }
       function b(){}

       缺点：只继承了基类的实例属性，没办法继承基类的原型，导致继承单一


    组合式继承
      
       function a(){
          b.call(this, ...)
       }
       function b(){}
       a.prototype = new b()

       缺点：基类构造函数被执行了两次，浪费效率。
       
       组合式继承本质上是继承基类的所有属性，所以在重置子类的原型即可

    
    圣杯模式
      
       function ab(a, b){
            function c(){

            }
            c.prototype = b.prototype

            a.prototype = new c();

            a.prototype.constructor = a
       }


*/


// ### 48. 科里化？（搜狗）

/* 

    柯里化  用来固定参数，利用闭包的特性将传入的参数变成私有变量，返回一个新函数，该新函数会固定前面传入的参数，当条件达到时
            则不会返回新函数，而是执行功能函数，并且会将前面所有固定的参数一并传入。

    
    function kelihua(callback, ...residue){
      retrun (...residue1)=>{
          const arr = [...residue, ...residue1]
          if(callback.length <= arr.length){
            retrun callback(...arr)
          }else{
            retrun kelihua(callback, ...arr)
          }
      }

    }

*/


// ES6新增了那些东西

/* 

    1. 块级作用域
        ES6以前的var声明，会有变量提升和可以重复声明，所以会导致怪异现象
        所以新增了 let、const 声明变量，这两个声明不会有变量提示、不会提升到window中、相同作用域内不能重复声明
        const 声明必须完成初始化，且不能更改。

     
    2.  字符串和正则表达式
         增加字符串原型方法 includes、startsWith、endsWith、repeat
         增加字符串符号 `` 
         增加正则表达式标记名 y    /正则/y

    3.   函数
         参数默认值：  一旦函数使用了参数默认值，那么该函数将变成严格模式。
                      形参与实参不映射、相同形参会报错、没有声明的变量不能使用、形参变量会变成let声明、函数直接调用时this为undefinde
         剩余参数： 剩余参数只能在形参的最后一位，并且只能由一个剩余参数。最终会以数组的形式呈现
         展开运算符：对象和数组都可以展开
                    对象只能在对象中展开，如果不是在对象中展开那么会呈现迭代器的迭代出的值。
                    数组可以在对象或数组中展开。
         箭头函数： 箭头函数没有 this、new.tagret、arguments  如果使用了则是使用外层作用域的。
                   箭头函数没有原型  不能作为构造函数使用也不能当做继承函数也不能被super
                   箭头函数只能时匿名函数
                   箭头函数不能当做生成器
    
    4.   对象
         新增了对象 成员速写、方法速写、计算属性名
         新增了Object的api： is、assign、等等
         新增了calss类  
             calss类中所有代码都为严格模式
             类中原型成员没法被遍历到
             类中的方法必须是速写方法、且没有原型、不能当做new使用
             类必须使用new来调用

    5.   结构
         对象解构  const { a, b } = {a:123,b:456}
         数组解构  const [a,b] = [1,2,3]
         参数解构  (a, b: {c})=>{}

    6.   符号
          共享符号   Symbol.for(描述)   只要描述一样，返回的符号就一样
          普通符号   Symbol(描述)  无论描述是否一致都会的都是唯一的符号
          知名符号   Symbol.xxx   使我们可以操空某些关键字
          有了符号对象属性名多了一种类型就是符号，以前只有一种类型就时字符串

    7.   Promise
          原型上方法  
            then 注册成功和失败的处理回调
            catch 注册失败的处理回调
            finally  注册已决的处理回调，该回调没有参数
          静态上方法
            all  当所有promise都成功时，返回的promise的值为数组，数组中每一项为对应promise的值
                 当有一项为失败时，返回的promise的值为该失败的值
            allSettled  当所有的promise都已决后，返回的promise的值，为数组，每一项为对应的值
            race  当所有的promis有一个已决后，返回的promise的值为该最早已决的值
            reject  返回一个失败的promise，值为参数
            resolve 返回一个成功的promise, 值为参数

    8.   迭代器和生成器
           迭代器为一个对象，且该对象有一个属性，为next函数，该函数返回一个对象，对象中的属性为 value:迭代的值 dong: 是否迭代结束
           可迭代协议 一个数据中有 [Symbol.iterator]属性，值为函数，返回一个迭代器对象。那么该数据就为可迭代的。

           生成器  当一个函数关键字前面或后面加上*号后，那么该函数会返回一个生成器
                   生成器也是一个迭代器和可迭代的数据，那么证明该生成器身上有 next属性和[Symbol.iterator]属性
                   生成器函数中可以用 yield关键字用于停顿函数，等待下次执行next函数
    
    9.   反射和代理
          代理  new Proxy(目标, 配置对象)  会返回一个代理目标
          反射  Reflect.xxx(...)   用于修改代理目标的东西
          
    10.  更多集合类型
          set  用于存储数据，会返回一个数据，该数据为可迭代对象和可迭代协议
               相当于数组

          map  用于存储数据，会返回一个数据，该数据为可迭代对象和可迭代协议
               相当于二维数组，第一项为key，第二项为值
               key可以是任何类型

          weakSet  与set一致，但是保存的数据必须是外部能找到的
                   该数据类型存储的数据只能是引用类型

          weakMap  与map一致，但是保存的数据必须是外部能找到的
                   该数据类型存储的数据，key必须是引用类型的


    11.  增强数组功能
           isAyyar、from




*/

// ### 49. 防抖和节流？（虾皮）

/* 
    
    节流和防抖是优化的一种手段，因为频繁的触发某些函数是否节流或防抖进行限制频繁的触发，利用闭包的特性将变量变成私有从而使用节流或防抖

    节流
      function throttle(callback, timer){
          let bool = true
          return (...residue)=>{
            if(!bool){ retrun }
            setTimeout(()=>{
                callback(...residue);
                bool = true
             }, timer);
          }
      }


    防抖 -- 用定时器实现的方式
      function shake(callback, timer){
         let id = null
         retrun (...residue)=>{
             clearTimeout(id)
             setTimeout(()=>{ callback(...residue) }, timer)
         }
      }

    防抖 -- 用时间戳实现的方式

       function shake1(callback, timer){
            let date = null;
            retrun (...residue)=>{
                if(date && ((Date.now() - date) < timer)){
                    retrun 
                }

                callbcak(...residue)
                date = Date.now();
            }
       }

*/

// ### 50. 闭包？（好未来---探讨了 *40* 分钟）

/* 

  闭包是一种现象，作用域链是实现闭包的基础。
  当函数内部的函数使用了外部变量时就会形成闭包，因为内部函数一旦使用了外部变量，该函数的作用域中就会有属性指向外部作用域，形成一条作用域链
  如果闭包过多，内存存储的作用域就会过多，容易导致内存泄漏。
  清除闭包   将返回出来的函数重新赋值，那么垃圾回收机制就会清理掉那办法访问的东西。

*/


// ### 51. 原型和原型链？（字节）

/* 
    每个对象都有一个 __prop__（隐式原型）该属性指向，创建该对象的函数的原型
    每个函数（箭头函数和速写函数成员外）都有两个属性 __prop__（隐式原型）、prototype（原型）
       __prop__ 指向创建该函数的函数的原型    prototype 为对象
    
    当创建一个对面字面量时，该对象的__prop__指向Object函数的原型
    当用new 类 创建出一个对象，该对象的__prop__指向该类的原型

    会形成一条原型链


*/


// ### 54. 闭包的好处
/* 
 
   可以使变量形成私有属性，缓存某些数据、避免污染全局

*/

// ### 55. *let、const、var* 的区别

/* 
    
    let、const 拥有块级作用域、不能重复声明、不会有变量提升、不会污染window
    const 必须完成初始化且不能修改变量
    var 上面那些都可以


*/

// ### 56. 闭包、作用域（可以扩充到作用域链）

/* 
    1. 什么是作用域
       js中有 全局作用域、函数作用域、局部作用域、evel作用域
       作用域决定了某些资源只能在该作用域中才能访问得到，如外层作用域访问不了里层作用域，里层作用域访问不到那么会沿着作用域链往外层作用域找。
       
    2. 什么是作用域链
       如 函数会有一个函数作用域，该作用域中如果使用了外部作用域那么会有属性指向外部作用域，最顶层作用域为全局作用域
          当函数中访问某个数据时，如果该作用域没有该数据，则会沿着作用域链往外找，最外层为全局作用域，如果全局作用域中没有，则为unedfined

    3. 闭包产生的本质
       闭包就是函数中的内部函数使用了外部作用域的数据就会产生闭包。闭包就是该函数作用域中有属性指向外层作用域。

    4. 什么是闭包
        闭包只是一种现象，函数中的函数使用了外部作用域的数据就会产生闭包。

    5. 闭包如何产生
        函数中函数使用了外部作用域的数据，就会产生闭包

    6. 闭包的应用场景
        需要将变量变成私有数据缓存起来时就需要闭包。如  防抖、节流、科里化

*/


// ### 57. *Promise*
/* 
   
    Promise是一种异步解决方案，ES6以前的异步解决方案只有回调，容易产生回调地狱
    ES6增加了Promise用来解决回调地狱，也使处理异步多了一种方案

    特点
      Promise状态不受外界影响
        挂起
        成功
        失败

      Promise状态一旦更改，不能再更改
         一旦Promise变成已决，就无法再更改状态

*/


