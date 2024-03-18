


class MyMap {
    constructor(data = []) {
        if (typeof (data[Symbol.iterator]) !== 'function') {
            throw new Error('参数必须是一个可迭代数据')
        };

        this._data = [];

        for (let item of data) {
            this.set(item[0], item[1])
        }
    };


    // 获取数量
    get size() {
        return this._data.length
    };


    // 添加和修改
    set(key, value) {
        const bool = this.has(key); 

        if(!bool){
           this._data.push([key, value]) 
        }else {
            const index = this._data.findIndex((item)=>{ return item[0] === key });
            this._data[index][1] = value;
        }

    };


    // 获取该项的值
    get(key) {
       const index = this._data.findIndex((item)=>{ return item[0] === key });
       return index > -1 ? this._data[index][1] : undefined
    };

    // 判断该项是否存在
    has(key) {
        const index = this._data.findIndex((item)=>{ return item[0] === key });

        return index > -1
    };


    // 删除指定项
    delete(key) {
         const index = this._data.findIndex((item)=>{ return item[0] === key });

         index > -1 && this._data.splice(index, 1);
         
         return index > -1;
    };


    // 清空数据
    clear() {
        this._data.length = 0;
    };



    *[Symbol.iterator]() {
        for (let item of this._data) {
            yield item
        }
    }
} 