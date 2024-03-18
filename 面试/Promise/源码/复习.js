


// 两个阶段三种状态
const Pending = 'pending';      // 末决阶段的挂起状态
const Rejected = 'rejected';    // 已决阶段的失败状态
const Fulfilled = 'Fulfilled';  // 已决阶段的成功状态


/**
 * 
 */
class MyPromise {
    constructor(callback) {
        this.state = Pending; // 当前proimse状态       
        this.data = null; // 当前proimse数据
        this.queue = []; // proimse队列，用于存储proimse处理数据的回调


        try {
            callback(this.resolve.bind(this), this.reject.bind(this)); // 执行proimse处理主体回调
        } catch (err) {
            // 处理状态的回调中发送错误，则将proimse状态变成失败状态
            this.reject(err);
        }
    };


    /**
     * 返回下一个promise
     * @param {*} resolveCallback 处理成功数据的回调
     * @param {*} rejectCallback  处理失败消息的回调
     * @returns 
     */
    then(resolveCallback, rejectCallback) {
        return new MyPromise((resolve, reject) => {
            // 向上一个promise的队列中添加对象，对象中包含该 数据处理函数、处理函数属于成功/失败的、将下一个promise推向成功/失败的处理函数
            this.queue.push({ state: Fulfilled, callback: resolveCallback, resolve, reject });
            this.queue.push({ state: Rejected, callback: rejectCallback, resolve, reject });
            this._runQueue();
        });
    };


    /**
     * 返回一个promise，并且只能向上一个promise队列中存储失败消息处理函数
     * @param {*} rejectCallback  处理失败消息的回调 
     */
    catch(rejectCallback) {
        return this.then(null, rejectCallback);
    };

    /**
     * 注册一个后续处理函数，该回调只要是已决阶段就会执行，并且没有参数
     * @param {*} callback 
     */
    finally(callback) {
        return this.then((data) => { callback(); return data }, (err) => { callback(); throw err })
    };


    /**
     * 执行队列
     */
    _runQueue() {
        for (let item of this.queue) {

            // 该promise还是未决阶段则结束
            if (this.state === Pending) {
                return
            } else {
                // 循环队列
                while (this.queue.length) {
                    this._runQueueItem(item);
                }
            }
        }
    };


    /**
     * 处理队列中每一项信息对象
     * @param {Object} item 信息
     */
    _runQueueItem(item) {

        // 如果该 数据处理函数类型（成功/失败）不与上一个promise的状态一致则结束
        if (item.state !== this.state) {
            return
        } else if (typeof (item.callback) !== 'function') { // 判断数据处理函数是否不是函数
            // 如果不是函数，则直接将上一个promise的数据给下一个
            item.state === Fulfilled ? item.resolve(this.data) : item.reject(this.data);
        } else {
            try {
                // 执行数据处理函数，并将上一个promise的数据传入，有错误则将下一个promise推向失败状态
                const data = item.callback(this.data);

                // 判断数据处理函数返回的是不是promise，如果不是则该数据会作为下一个promise的数据
                this._isPromise(data) ? data.then(item.resolve, item.reject) : item.resolve(data);
                // 如果返回的是promise,那么该promise会将决定下一个promise的状态


            } catch (err) {
                item.reject(err);
            }
        }
    };


    /**
     * 将promise推向成功
     * @param {*} data 数据
     */
    resolve(data) {
        this._setState(Fulfilled, data);
        this._runQueue();
    };


    /**
     * 将promise推向失败
     * @param {*} err 错误信息
     */
    reject(err) {
        this._setState(Rejected, err);
        this._runQueue();
    };

    /**
     * 修改promise状态和数据
     * @param {*} type 成功/失败
     * @param {*} data 数据
     */
    _setState(type, data) {

        // 如果promise是已决了，则不能再修改状态
        if (this.state !== Pending) {
            return
        };

        this.state = type;
        this.data = data;

    };

    /**
     * 该方法返回promise直接是成功，并且数据是参数
     * @param {*} data 数据
     */
    static resolve(data) {

        if (data instanceof MyPromise) {
            return data;
        };

        return new MyPromise((resolve, reject) => {
            if (this._isPromise(data)) {
                return data.then(resolve, reject)
            } else {
                resolve(data);
            }

        });
    };

    /**
     * 该方法返回promise直接是失败，并且数据是参数
     * @param {*} err 
     * @returns 
     */
    static reject(err) {
        return new MyPromise((resolve, reject) => {
            reject(err);
        })
    };


    /**
     * 
     * @param {*} promises promise数组
     */
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for (let promise of promises) {

                promise.then(resolve, reject)

            }
        });
    };

    static all(promises) {
        const datas = [];
        return new MyPromise((resolve, reject) => {

            for (let promise of promises) {
                datas.push({ isProcessed: false, promise, data: null })
                promise.then((data) => {

                    const index = datas.findIndex((item) => { return item.promise === promise });
                    datas[index].isProcessed = true;
                    datas[index].data = data;

                    const newS = datas.filter((item) => { return item.isProcessed });
                    newS.length === datas.length && resolve(newS.map((item) => { return item.data }));

                }, reject);
            }
        });
    };


    static allSettled(promises) {
        const arr = [];
        const handle = (id, info) => {
            const index = arr.findIndex((item) => { return item.promise === id });
            arr[index].isProcessed = true;
            arr[index].data = info;

            const s = arr.filter((item) => { return item.isProcessed });
            return s.length = arr.length;
        };
        return new MyPromise((resolve, reject) => {
            for (let promise of promises) {
                arr.push({ promise, isProcessed: false, data: null });
                promise.then(
                    (data) => { handle(promise, { status: Fulfilled, value: data }) && resolve(arr.map((item) => { return item.data })) },
                    (err) => { handle(promise, { status: Rejected, value: err }) && resolve(arr.map((item) => { return item.data })) })
            }
        });
    }


    /**
     * 判断参数是否是promise
     * @param {*} target 
     */
    _isPromise(target) {
        return typeof (target) === 'object' && target instanceof MyPromise && typeof (target.then) === 'function';
    }
}