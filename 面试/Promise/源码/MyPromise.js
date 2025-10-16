// 三种状态
const pending = 'pending';
const fulfilled = 'fulfilled';
const rejected = 'rejected';


/**
 * @param {function}  阶段处理函数
 */
class MyPromise {
    constructor(stageProcessing) {
        this._state = pending; // 状态
        this._value = null; // 数据   
        this._queue = []; // 存储函数的队列数据

        // 执行阶段处理函数，并捕获错误
        try {
            // 绑定指定的this，如果不绑定this，那么单独调用函数，函数的this为null(class类型为null)
            stageProcessing(this._resolve.bind(this), this._rejected.bind(this));
        } catch (err) {
            this._rejected(err);
        }
    };

    /**
     * 推向 fulfilled状态
     * @param {any} data 数据
     */
    _resolve(data) {
        this._setState(fulfilled, data);
    };

    /**
     * 推向 rejected状态
     * @param {any} err  错误信息
     */
    _rejected(err) {
        this._setState(rejected, err)
    };

    /**
     * 修改状态
     * @param {string} stage 状态 
     * @param {any} value  信息
     * @returns 
     */
    _setState(stage, value) {
        // 判断该阶段是否不是未决
        if (this._state !== pending) {
            return
        }
        this._state = stage;
        this._value = value;
        this._runQueue(); // 执行队列
    };


    /**
     * 
     * @param {Function} fulfilledFunc     fulfilled状态是执行的函数
     * @param {Function} rejectedFunc      rejected状态时执行的函数
     */
    then(fulfilledFunc, rejectedFunc) {  // then  吐音 黏

        return new MyPromise((resolve, reject) => {
            this._queue.push({ state: fulfilled, processingFunc: fulfilledFunc, resolve, reject });
            this._queue.push({ state: rejected, processingFunc: rejectedFunc, resolve, reject });
            this._runQueue(); // 执行队列
        });
    };


    /**
     * 执行队列
     */
    _runQueue() {
        for (const item of this._queue) {
            // 判断当前是否还是未决阶段
            if (this._state === pending) {
                return;
            };

            // 循环队列
            while (this._queue.length) {
                this._runQueueItem(this._queue[0]);
                this._queue.shift(); // 截取掉数组的第一项
            };
        }
    };


    /**
     * 执行队列的项
     * @param {object} item 队列里的项
     */
    _runQueueItem(item) {
        //  resolve  reject 函数已经做了固定this，所以不用怕


        // 进入微队列
        weChatQueue(() => {
            // 内部代码中队列至少会有两个状态，所以无论单独cathc,也会状态数据穿透
            if (this._state !== item.state) {
                return; // 不做任务处理
            } else if (typeof (item.processingFunc) !== 'function') {
                // 状态数据穿透
                this._state === fulfilled ? item.resolve(this._value) : item.reject(this._value);
            } else {
                const processingFunc = item.processingFunc; // 使其该this不要指向该对象
                try {
                    const data = processingFunc(this._value);

                    isPromise(data) ? data.then(item.resolve, item.reject) : item.resolve(data);
                } catch (err) {
                    item.reject(err);
                }
            }
        });
    };


    /**
     * 处理失败的场景
     * @param {function} rejectedFunc 
     */
    catch(rejectedFunc) {  // 吐音  客取
        return this.then(null, rejectedFunc);
    };


    /**
     * 无论成功还是失败都会执行回调
     * @param {function} onSettled 
     */
    finally(onSettled) {   // finally 吐音  伐么哩
        return this.then(
            (data) => { onSettled(); return data },
            (err) => {
                onSettled(); throw err
            })
    };


    /**
       * 返回一个已完成的Promise
       * 特殊情况：
       * 1. 传递的data本身就是ES6的Promise对象
       * 2. 传递的data是PromiseLike（Promise A+），返回新的Promise，状态和其保持一致即可
       * @param {any} data
    */
    static resolve(data) {
        if (data instanceof MyPromise) {
            return data;
        };

        return new MyPromise((resolve, reject) => {
            // 判断是否符合 Promise A+ 规范
            if (isPromise(data)) {
                data.then(resolve, reject)
            } else {
                resolve(data)
            }
        });

    };

    /**
      * 得到一个被拒绝的Promise
      * @param {any}} err
      */
    static reject(err) { 
        return new MyPromise((resolve, reject) => {
            reject(err)
        });
    };


    /**
   * 得到一个新的Promise
   * 该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功，则返回的Promise成功，数据为所有Promise成功的数据，并且顺序是按照传入的顺序排列
   * 只要有一个Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
   * @param {iterator} proms
   */
    static all(proms) {  // 吐音 哦
        return new MyPromise((resolve, reject) => {
            try {
                const arr = [];
                let num = 0;
                let fillNum = 0;
                for (const prom of proms) {
                    let i = num++;
                    MyPromise.resolve(prom).then((data) => {
                        arr[i] = data;
                        ++fillNum === num && resolve(arr);
                    }, reject);
                };
                num === 0 && resolve(arr)
            } catch (err) {
                reject(err)
            }
        });
    };


    /**
       * 等待所有的Promise有结果之后
       * 该方法返回的Promise完成
       * 并且按照顺序将所有结果汇总
       * @param {iterator} proms
       */
    static allSettled(proms) {   // allSettled 吐音 哦沙逗
        const arr = [];
        for (const prom of proms) {
            arr.push(MyPromise.resolve(prom).then(
                (data) => { return { status: fulfilled, value: data } },
                (err) => {
                    return { status: rejected, value: err }
                }
            ))
        };

        return MyPromise.all(arr)
    };


    /**
       * 返回的Promise与第一个有结果的一致
       * @param {iterator} proms
       */
    static race(proms) {  // race 吐音 略是
        return new MyPromise((resolve, reject) => {
            for (const prom of proms) {
                MyPromise.resolve(prom).then(resolve, reject)
            }
        });
    };
};


/**
 * 将函数放进微队列
 * @param {Function} callback  
 */
function weChatQueue(callback) {
    // 判断node环境
    // 为了避免「变量未定义」的错误，这里最好加上前缀globalThis
    // globalThis是一个关键字，指代全局对象，浏览器环境为window，node环境为global
    if (process && process.nextTick) {
        process.nextTick(callback);  // node环境
    } else if (MutationObserver) {  // 浏览器环境
        const p = document.createElement('p');
        const observer = new MutationObserver(callback);
        observer.observe(p, {
            childList: true, // 观察该元素内部的变化
        });
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0);
    }
};


/**
 * 判断该数据是否是 Promise对象
 * @param {any} data 
 */
function isPromise(data) {
    return !!(data && typeof (data) === 'object' && typeof (data.then) === 'function');
};