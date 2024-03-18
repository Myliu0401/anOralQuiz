/*
 
    calss和构造函数区别上的细节
      构造函数也是函数，既然是函数，那么就可以通过函数调用的形式来调用构造函数。
      类构造出来的实例中的原型上的属性是不可以被枚举的。
      calss中的所有代码均处于严格模式下。
      类实例原型和静态中的方法不可以 new 调用，因为只能使用ES速写成员的语法，速写的成员没有原型，所以不能使用 new
 
 
 
*/


//Babel中具体的实现

class Computer {
    // 构造器
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    // 原型方法
    showSth() {
        console.log(`这是一台${this.name}电脑`);
    }
    // 静态方法
    static comStruct() {
        console.log("电脑由显示器，主机，键鼠组成");
    }
}

//转换后成如下代码

"use strict"; // 严格模式 --- 类中的代码都是在严格模式下执行的

/**
 * 判断实例是否是通过指定构造函数 new 出来的
 * @param {*} instance    实例
 * @param {*} Constructor 构造函数
 */
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

/**
 * 设置对象属性的属性描述符，设置完成后将属性挂在到target上
 * @param {*} target 
 * @param {*} props 
 */
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        // 进行属性描述符的配置
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;

        if ("value" in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor); 
    }
}

/**
 * 
 * @param {*} Constructor  构造函数 
 * @param {*} protoProps   原型上的属性
 * @param {*} staticProps  静态上的属性
 * @returns 
 */
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Computer = function () {
    // 构造器
    function Computer(name, price) {
        _classCallCheck(this, Computer);

        this.name = name;
        this.price = price;
    } // 原型方法


    _createClass(Computer, [{
        key: "showSth",
        value: function showSth() {
            console.log("\u8FD9\u662F\u4E00\u53F0".concat(this.name, "\u7535\u8111"));
        } // 静态方法

    }], [{
        key: "comStruct",
        value: function comStruct() {
            console.log("电脑由显示器，主机，键鼠组成");
        }
    }]);

    return Computer;
}();