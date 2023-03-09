//利用立即执行函数,封闭作用域
const MyPromise = (() => {

    //状态的变量
    const PENDING = 'pending',
        RESOLVED = 'resolved',
        REJECTED = 'rejected';

    //利用符号属性,进行私有化
    const PromiseStatus = Symbol('PromiseStatus'),
        PromiseValue = Symbol('PromiseValue');

    //创建一个给原型用
    const chulizhuantai = Symbol('chulizhuantai');


    return class MyPromise {
        /**
         *  
         * @param {*} tonbu   未决阶段(pending状态)下的处理函数 
         */
        constructor(tonbu) {

            //promise对象中的两个属性
            this[PromiseStatus] = PENDING; //状态
            this[PromiseValue] = undefined; //属性


            //两种状态的函数
            const resolved = (data) => {
                /*  if (this[PromiseStatus] !== PENDING) {
                     //只能'pending'可以改变
                     return;
                 } else {
                     this[PromiseStatus] = RESOLVED; //改变状态
                     this[PromiseValue] = data; //改变属性
                 } */


                this[chulizhuantai](RESOLVED, data)
            };
            const rejected = (err) => {
                /* if (this[PromiseStatus] !== PENDING) {
                    //只能'pending'可以改变
                    return;
                } else {
                    this[PromiseStatus] = REJECTED; //改变状态
                    this[PromiseValue] = data; //改变属性
                } */

                this[chulizhuantai](REJECTED, err);
            }

            //捕获错误
            try {
                //执行传进来的同步函数
                tonbu(resolved, rejected)
            } catch (x) {
                rejected(x) //执行失败函数
            }


        };


        //处理改变状态的代码重合
        [chulizhuantai](zhuantai, shuju) {
            if (this[PromiseStatus] !== PENDING) {
                //只能'pending'可以改变
                return;
            } else {
                this[PromiseStatus] = zhuantai; //状态
                this[PromiseValue] = shuju; //值
            }
        }
    }



})();