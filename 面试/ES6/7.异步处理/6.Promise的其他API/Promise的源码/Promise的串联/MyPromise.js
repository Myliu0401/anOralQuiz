let obj, obj1, obj2;

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


    //创建作业队列
    const thenablearr = Symbol('thenable'),
        catchablearr = Symbol('catchable');


    //这个符号用于调用then和catch函数返回的promise对象
    const linkPromise = Symbol('linkPromise');



    //封装作业队列
    const Arr = Symbol('Arr');

    return class MyPromise {
        /**
         *  
         * @param {*} tonbu   未决阶段(pending状态)下的处理函数 
         */
        constructor(tonbu) {

            //promise对象中的两个属性
            this[PromiseStatus] = PENDING; //状态
            this[PromiseValue] = undefined; //属性

            //添加作业队列
            this[thenablearr] = []; //resolved状态的作业队列
            this[catchablearr] = []; //rejected状态的作业队列


            //两种状态的函数
            const resolved = (data) => {
                obj1 = this
                this[chulizhuantai](RESOLVED, data, this[thenablearr])
            };
            const rejected = (err) => {

                this[chulizhuantai](REJECTED, err, this[catchablearr]);
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
        /**
         *
         *
         * @param {*} zhuantai  状态类型
         * @param {*} shuju     传进来的值,推向什么类型传进来的参数
         * @param {*} duilie    作业队列
         * @returns
         */
        [chulizhuantai](zhuantai, shuju, duilie) {
            if (this[PromiseStatus] !== PENDING) {
                //只能'pending'可以改变
                return;
            } else {
                this[PromiseStatus] = zhuantai; //状态
                this[PromiseValue] = shuju; //值

                //以防在同步代码中,有异步代码
                duilie.forEach((ele) => {
                    ele(this[PromiseValue])
                })
            }
        };


        //创建then函数和catch函数
        then(thenable, catchable) {

            return this[linkPromise](thenable, catchable);

        }

        catch (catchable) {

            return this[linkPromise](undefined, catchable);
        };

        //封装返回的新对象
        [linkPromise](thenable, catchable) {
            //封装对象
            function exct(func, data, resolved, rejected) {
                try {
                    const shuju = func(data)
                    if (shuju instanceof MyPromise) { //判断是否返回的值对象
                        shuju.then((data) => {
                            resolved(data)
                        }, (data) => {
                            resolved(data)
                        })
                    } else {
                        resolved(shuju)
                    }

                } catch (err) {
                    rejected(err)
                }
            }

            obj2 = this;
            //这个对象是返回的promise对象,所以内部自己操作辅助
            return new MyPromise((resolved, rejected) => {
                this[Arr](RESOLVED, (data) => {
                    if (typeof (thenable) !== 'function') {
                        resolved(data)
                        return;
                    }
                    exct(thenable, data, resolved, rejected)
                }, this[thenablearr]);

                obj = this
                this[Arr](REJECTED, (data) => {
                    if (typeof (catchable) !== 'function') {
                        resolved(data)
                        return;
                    }
                    exct(catchable, data, resolved, rejected)
                }, this[catchablearr])
            })
        }





        //封装作业队列
        [Arr](leixin, func, duilie) {
            //判断Ptomise对象的状态,以防每次无论什么状态进来都能执行
            if (this[PromiseStatus] === leixin) {
                //模拟异步
                setTimeout(() => {
                    //将Promise对象值,传进来    
                    func(this[PromiseValue])
                }, 0)
            } else { //状态不同进push进作业队列
                duilie.push(func)
            }
        }


    }



})();