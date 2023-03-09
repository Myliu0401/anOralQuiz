/* 
     JS中对象的属性可以分为两种
        数据属性：它的本质就是一个数据
        存取器属性：它的本质是一个函数，但是可以将它当作普通属性来使用，当给该属性赋值时，会运行相应
                   的set函数，当获取该属性的值时，会运行相应的get函数。除了存取器，还有一些其他的关键字，
                   用于表示当前属性是否可写，是否有默认值，是否可枚举等，这些关键字就是属性描述符

     属性描述符是ES5新增的语法，其实就是一个对象，用来描述对象中的属性的特性

     属性描述符的结构
        value: 设置属性值，默认为undefined
        writable: 设置属性值是否可写，默认为true
        enumerable: 设置属性是否可枚举，即是否允许使用 for-in Object.keys 遍历出来，默认为true
        configurable: 设置是否可设置属性特性，默认为true。如果为false，将无法删除该属性，不能够修改属性值，也不能修改属性的属性描述符
        get: 取值函数，默认为undefined
        set: 赋值函数，默认为undefined



     const obj = {}
     用属性描述符的形式来添加属性
     属性描述符是一个对象，作为第三个参数传入
     Object.defineProperty(obj, 'x', { 
        value: 100
     })


     Object.getOwnPropertyDescriptor(obj, 'x')
       获取某一个对象的属性的属性描述符



    const obj = Object.create(Object.prototype, { 
        // 私有变量，不对外
        _x: {
            value:100,  // 初始值
            wrutable: true
        },

        // 对外的，外部可以访问和修改
        x: {  // 访问器属性
            get(){
                return this._x
            },
            set(value){

            }
        }
     })
*/  
