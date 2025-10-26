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

    class 中所有代码都处于严格模式
    类中原型上得属性不可枚举
    class里中定义的原型上属性和静态属性不可以用new, 因为只能用速写的写法，没有原型
    class必须用new来调用

*/

const Example = (() => {
    function Example(name) {
        if (!(new.target === Example)) {
            throw Error('构造函数必须使用new');
        }
        this.name = name
    }

    handlingS(Example, [{
        key: 'init',
        value: function init() {
            if (this instanceof init) {
                throw Error('不能使用new');
            }
        }
    }], [{
        key: 'jintai',
        value: function jintai() {
            if (this instanceof jintai) {
                throw Error('不能使用new');
            }
        }
    }]);

    return Example;
})();


function handlingShuxin(tagert, props) {
    for (let item of props) {
        const tis = {
            enumerable: false, // 不可以被枚举
            configurable: false, // 不能设置特性
        }
        Object.defineProperties(tagert, item.key, tis);
    }
}

function handlingS(tagert, protots, statics) {
    if (protots) {
        handlingShuxin(tagert.prototype, protots);
    }
    if (statics) {
        handlingShuxin(tagert, protots);
    }
}


// 2. 数组去重的方式有哪些

function a(data){
    const arr = [];
    for(let i = 0; i < data.length; i++){
       arr.includes(data[i]) || arr.push(data[i]);
    }
    return arr;

}

[...new Set([1,1,2,2,2,2,2,2,3,3,3])]


// ### 3. 描述下列代码的执行结果
foo(typeof a); 
function foo(p) {
    console.log(this);  // window
    console.log(p);  // 'undefined'
    console.log(typeof b);  // 报错，此时变量还没有赋值，还在暂时性死区
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
console.log(f.arr); // [0, 1, 2, 3]


// ### 5. 描述下列代码的执行结果

function f(count) {
    console.log(`foo${count}`);
    setTimeout(() => { console.log(`bar${count}`); });
}
f(1); 
f(2);
setTimeout(() => { f(3); });

/* 
    `foo1`   `foo2`  `bar1`   `bar2`  `foo3`   `bar3`
*/


// ### 6. 描述下列代码的执行结果
var a = 2;
var b = 5;
console.log(a === 2 || 1 && b === 3 || 4);

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
        console.log(`The hash of the button is: ${this.hash}`); // this指向绑定的dom元素，dom没有该属性所以为unedifned
    }
};


// ### 8. 箭头函数有哪些特点


/* 
   1.  箭头函数的this 取决是定义时所在的this
   2.  箭头函数没有原型，所以不能用new 
   3.  没有function 关键字
   4.  箭头函数不能作为生成器
   5.  箭头函数 没有new.taget、arguments、this,  如果用了则取决于定义时所在的


*/

// ### 9. 说一说类的继承  


// ### 10. *new* 操作符都做了哪些事？

/*
    1. 生成一个对象
    2. 该对象的隐私原型  指向  该函数的原型
    3. 将this指向该对象
    4. 将该对象返回出去
*/


// ### 11. *call、apply、bind* 的区别 ？

/*
   这三个都是改变函数的this

   call和apply是直接执行函数   bing是返回一个执行this的函数
   call的参数是每一项  
   apply的参数是数组

*/

// ### 12. 事件循环机制（宏任务、微任务） 

/*
   js线程负责执行js代码，其他交由其他线程负责（比如：渲染线程、http异步线程、监听线程、定时器线程），会将其他到达条件的处理函数加入到队列中
   而队列又分为宏微队列，promise进入微队列。当js执行栈为空时，会先看微队列有没有需要处理的函数，有则拿到js执行栈中执行，没有则看宏队列
   只要执行栈为空时，才会看队列，形成一个事件循环
*/

// ### 14. 什么是函数柯里化？

/**
 * 科里化是利用闭包的特点，来固定参数，返回一个函数该函数固定上一个函数的参数，只有达到某个条件时才会运行真正的函数，并且传入前面所固定的参数
 * 
 * 
 * function currying(callback, ...collect){
 
 *     retrun (...residue)=>{
 *         const arr = [...collect, ...residue];
 *         if(arr.length >= callback.length){
 *            return callback(...arr)
 *          }else {
 *            retrun currying(callback, ...arr);
 *         }
 *     }  
 * 
 * }
 */

// ### 15. *promise.all* 方法的使用场景？数组中必须每一项都是 *promise* 对象吗？不是 *promise* 对象会如何处理 ？

/**
 *      需要同时处理多个异步的情况下，并且需要所有promise都有结果之后，才会有结果的情况下可以使用 all
 * 
 *      不是每一项都必须是peomise，如果不是promise，则会调用promsie.resolve()并且将值传进去，使其返回一个promise
 */

// ### 16. *this* 的指向哪几种 ？

/**
 *    1. 普通模式下直接调用函数 this指向window
 *    2. 严格模式下直接调用函数 this指向undefined
 *    3. 通过对象调用函数 this指向对象
 *    4. 箭头函数的this，指向定义箭头函数时所在作用域的this
 *    5. 通过call、apply、bind 调用时可以绑定指定的this
 *    
 */


// ### 17. *JS* 中继承实现的几种方式

/**
 *    原型链继承、盗用函数继承、伪继承/组合式继承、圣杯模式
 *     
 *    原型链继承
 *       重点：子类原型直接等于基类实例
 *       特点：子类继承基类所有属性  如：基类的属性和原型上的属性
 *       确定：继承时没办法向基类传递参数，使继承比较单一，基类所有东西都是在子类的原型上，把一些不必继承上原型上的也继承进去了
 *             
 *    盗用构造函数
 *       重点：在子类函数中执行基类，从而时子类实例拥有基类实例的属性
 *       特点：只继承了基类的实例，解决了原型链继承时所有属性都被共享的问题
 *             继承时也可以传递参数 解决了原型链继承不能传递参数的问题
               只继承基类的属性，没有继承基类的原型
         缺点：只继承了基类的属性，没有继承基类的原型，每次调用时都会执行基类

      组合式继承
         重点：组合了原型链继承和盗用构造函数
         特点：可以在继承时传递参数，继承基类属性私有
         缺点：执行了两次基类，浪费效率

      圣杯模式
         解决了  原型链继承、盗用构造函数、组合式继承的缺点
 */


// ### 18. 什么是事件监听

/**
 *     dom需要绑定事件时，需要一个事件处理函数，该处理函数就是事件监听器
 *     事件线程会负责监听用户行为等
 *     W3C规定了事件流由三部分组成  事件捕获 目标阶段 事件冒泡
 * 
 *     事件捕获：从最顶层window沿着dom树一层层往下传递
 *     目标阶段：当事件捕获传递到触发事件的目标dom，此时处于目标阶段，该阶段也可以看做是时间冒泡的一部分
 *     事件冒泡：从目标阶段沿着dom树一层层往上传递到window
 *
 */
   

// ### 19. 什么是 *js* 的闭包？有什么作用？

/**
 *   闭包是一种现象，作用域链是实现闭包的基础
 *   当函数中的函数使用了外部的数据后就会形成闭包，内部函数就拥有了外部函数的作用域，该作用域就变成私有的了
 *   闭包过多时容易导致内存泄漏
 *   清除闭包的方式是将返回出来的函数赋值为null,会被垃圾回收
 *   
 *   但有需要变量私有时就可以使用闭包：如 防抖、节流、科里化等
 *   
 */

// ### 20. 事件委托以及冒泡原理

/**
 *   事件委托就是将事件绑定在外层指定标签上，当事件一层层沿着dom树往上达到时触发
 *   事件冒泡的好处就是可以利用其实现事件委托
 */

// ### 21. *let const var* 的区别？什么是块级作用域？如何用？

/**
 *    let和const 不会有变量提升，存在暂时性死区，声明前访问时会报错，不会被提进window中，
 *    const 生命时必须赋值
 *    let和const有块级作用域
 *    
 *    var有变量提升  会被提进window中，没有块级作用域
 * 
 *    大括号中使用let const 就会有块级作用域
 */

// ### 22. *ES5* 的方法实现块级作用域（立即执行函数） *ES6* 呢？

/**
 * (()=>{})()
 * 利用立即执行函数来实现块级作用域
 * 
 * ES6直接在大括号中用 let 或 const  声明变量就行
 */


// ### 23. *ES6* 箭头函数的特性

/**
 *    1. 箭头函数没有arguments，所以形参和实参不映射
 *    2. 箭头函数没有 this、new.tagert、arguments 如果使用了，则是定义时所在作用域的
 *    3. 箭头函数没有原型所以不能作为new使用，所以也不能被ES6类进行super
 *    4. 箭头函数不能作为生成器
 *    5. 箭头函数只能是匿名函数
 */


// ### 24. 箭头函数与普通函数的区别 ？

/**
 *   1. 普通函数有原型所以能当成构造函数使用
 *   2. 普通函数有 this、new.tagert、arguments
 *   3. 普通函数有arguments，所以形参和实参映射
 *   4. 普通函数能作为生成器
 *   5. 普通函数能被class进行super
 */


// ### 25. *JS* 的基本数据类型有哪些？基本数据类型和引用数据类型的区别

/**
 *     基本类型  number string null undefined bollean symbol
 *  
 *     基本类型的数据大小是固定的所以存储在栈中，引用类型数据存储在堆中，栈只存储引用类型的地址
 *     栈的特点  先进后出，后进先出，内存会自动释放。堆的特点是无序动态的，需要垃圾收回机制回收
 *     基本类型不能再细分，如果进行再细分则会变成包装类（number、string、bollean）
 */

// ### 26. NaN

/**
 * NaN 表示非数，它属于数字类型
 * 任何涉及NaN的操作都等于NaN
 * NaN不等于任何东西，包括它自己
 */

// ### 27. *JS* 的作用域类型

/**
 *   全局作用域：当代码执行时，最先的就是块级作用域
 *   函数作用域：当执行函数时，在函数内部会产生一个函数作用域
 *   块级作用域：当执行大括号里面的 let cosnt 声明的变量时会产生一个块级作用域
 *   eval作用域：当使用 eval函数时，会产生一个eval作用域
 */

// ### 28. *undefined==null* 返回的结果是什么？*undefined* 与 *null* 的区别在哪？

/**
 *     为true
 *     undefined表示没有，如果被当做数学运算时会变成NaN
 *     null表示空，如果被当做数学运算时会转换成0
 * 
 *     null作为原型链的终点
 */


// ### 29. 写一个函数判断变量类型

function getVariableType(data){
     const getType = Object.prototype.toString;
     const type = getType.call(data);

     return type.slice(8, type.length - 1);
}

// ### 30. *js* 的异步处理函数

/**
 *   JS最早的异步处理是通过回调方式来处理异步，容易产生回调地狱
 *   ES6新增了Promise来解决异步方案，该方案消除了回调地狱，没有消除回调
 *   ES6还新增了生成器解决异步方案，通过yield关键字来停止执行函数，外部必须先执行生成器
 *   
 *   async await 关键字来优化Promise, async会返回一个Promise,await关键字必须写在async里面
 *   awiat会等待Promise有结果之后才会往下执行
 *   相当于async await是Promise和生成器的结合
 */


// ### 33. 原型与原型链 （美团 19年）

/**
 *    函数的prototype指向一个对象，对象的__proto__指向创建该对象的函数的原型
 *    Object.prototype的对象的__proto__指向null
 */

// ### 34. 作用域与作用域链 （美团 19年）

/**
 *     作用域是某些特定区域，决定了某些变量的可访问性
 *     函数会有一个作用域，该只用于中会有外层的作用域，最外层的作用域是全局作用域
 *     当内部函数作用域寻找变量时，会沿着作用域链一层层往外找，最终如果全局作用域就返回undefined
 *     
 */


// ### 35. 闭包及应用场景以及闭包缺点 （美团 19年）

/**
 * 当内部函数用了外部函数作用域数据时就是产生闭包
 * 闭包会使变量私有化，需要私有化变量的就可以利用闭包 如 防抖、节流、科里化
 * 闭包多了容易导致内存泄漏
 */

// ### 37. 原始值与引用值 （美团 19年）

/**
 *    原始类型  number string undefined null bollean symbol
 *    引用类型  object 
 *    
 *    原始类型的数据大小是固定的，不可在细分，所以数据存放在栈中，栈的特点是: 先进后出，后进先出，内存自动释放
 *    如果原型类型再继续细分访问的话那么会转变成包装类 number string bollean symbol
 *    
 *    引用类型数据大小不固定未知，并且可以再细分，数据存在堆中，堆的特点是无序动态的，栈中只存地址 堆释放内存需要垃圾回收机制
 * 
 *     访问方式： 原型类型访问的是值，引用类型访问的是引用地址
 * 
 *     比较方式： 原型类型比较的是值，引用类型比较的是地址
 * 
 *     动态属性：原始类型没法添加，如果继续添加那么是添加给包装类。引用类型可以继续添加
 * 
 *     变量赋值：原始类型是直接修改值。引用类型则是修改地址
 */

// ### 38. 描述下列代码的执行结果

/**
 *  3  7 10 4,5  2,7  1  2  6  9  8 
  
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

/**
 * 
 
Object.prototype.toString.call

Array.isArray

data.constructor === Object/Array

data  instanceof  Object/Array 判断data对象原型上有没有这个Object或Array的原型

*/

// ### 40. 对象深拷贝与浅拷贝，单独问了 *Object.assign*（美团 19年）

/**
 *   Object.assign 是进行浅混入的 从第二个对象开始混到第一个对象中
 *   
 *   浅拷贝   只对对象的属性进行复制
 *   深拷贝   如果对象属性是引用值，则会继续进行拷贝
 */

/**
 * 拷贝
 * @param {*} bollean   是否进行深拷贝
 * @param {*} data      数据
 */
function copy(bollean = true, data = {}){
     if(typeof(data) !== 'object'){
        return data;
     }
     const newData = Array.isArray(data) ? [] : {}
     /**
      *     let type = Object.prototype.toString.call(data[key]);
            type = type.slice(8, type.length - 1);
      */
       
     for(let key in data){
        
        if(typeof(data[key]) === 'object' && bollean){
            
            newData[key] = copy(bollean, data[key]);

        }else{
            newData[key] = data[key]
        }
      

     }

     return newData;
}


// ### 42. 说说 *instanceof* 原理，并回答下面的题目（美团 19年）

/**
    function A(){}
    function B(){}
    A.prototype = new B(); 
    let a = new A(); 
    console.log(a instanceof B)  true  

    instanceof 关键字用于判断某个数据中是否拥有某个函数的原型
    ES6出了知名符号后，可以操作instanceof关键字的判断
    Object.defineProperty(函数, Symobl.hasInstance, {
        value(){
            retrun boolean
        }
    })
    内部就是调用这个方法来进行判断的

 */

// ### 43. 内存泄漏（美团 19 年）

/**
 *   程序中的变量数据存储需要在内存中开辟空间进行存储，数据过多是内存空间开辟满，js垃圾回收机制没有回收就会导致内存泄漏
 *   
 *   js垃圾回收机制   标记清除   引用计数
 *  
 *   标记清除
 *      js线程在空闲时，会循环堆内存中的数据并且标记为0，然后从全局开始循环访问变量，能访问到的将其标记为1，最后将
 *      堆内存中标记为0的数据清除
 *      优点：比较简单，只标记0和1，能解决函数中和循环引用的问题
 *      缺点：需要js线程去执行，只有js线程处于空闲时才会处理，不然会卡顿
 * 
 *   引用计数
 *      当变量被创建或赋值时就会加1，被删除或者清掉时就会减1，当为0时就会被垃圾回收机制清理掉
 *      优点：实时的，计数为0时会被垃圾回收处理掉
 *      缺点：函数中和循环引用时没办法为0，所以没办法处理掉
 * 
 *   这两个会都产生 内存碎片，所有又出现标记整理，再继续发展成分代式垃圾回收
 */

// ### 44. *ES6* 新增哪些东西？让你自己说（美团 19 年）

/**
 *    1.  块级作用域
 *    2.  模板字符串
 *    3.  箭头喊
 *    4.  class类
 *    5.  promise  async  await 
 *    6.  生成器和迭代器
 *    7.  Set  Map  wekSet  wakMap 
 *    8.  代理和反射
 *    9.  符号
 *    10. 解构
 */


// ### 45. *weakmap、weakset*（美团 *19* 年）

/**
 *   weakmap和weakset  返回的都不是可迭代对象
 *   参数都是不可迭代的
 *   只能添加引用类型
 *   并且不会影响垃圾回收 如：let obj = {} obj被添加进去了，外的obj被赋值为null, 那么垃圾会将数据回收掉
 *   没有size值、没有forEach方法  
 */

// ### 46. 为什么 *ES6* 会新增 *Promise*（美团 19年）

/**
 *   ES6以前处理异步只能用回调，容易产生回调地狱， Promise就是用来解决回调地狱的，没有消除回调
 * 
 *   Promsie的缺点
 * 1、 一旦创建并执行，中途没法消除
 *     const p = new Promise((resolve) => {
         setTimeout(() => {
           console.log('任务执行了'); // 无法中断
           resolve();
         }, 3000);
       });

       即使不再需要结果了，但是3秒后仍然会有结果，没办法中断
       这是 Promise 最大的缺陷之一

   2、错误无法捕获到外层
      Promsie.resolve().then(()=>{ throw new Error('错了！') })
      没有写catch没办法捕获到错误，会导致代码报错

   3、不方便调试，堆栈信息不完整
      Promise内部是异步的，如果发生错误 堆栈只会打印到当前任务点，不会显示完整的调用链

   4、嵌套链式写法依然会变复杂
      会让Promise解决了回调地狱，但在多个依赖异步任务场景中，链式 then写法依然会造成可读性差

   5、无法终端链式调用
      Promise.resolve(1)
      .then(val => {
        if (val > 0) return; // 不 return 另一个 Promise，仍会执行下一个 then
      })
      .then(() => console.log('依然执行'));

   6、不适合大量频繁的异步操作
     一旦Promise被调用回调就是马上执行，无法延迟触发
     如果有大量请求或异步任务，会造成性能开销和内存浪费
 */






