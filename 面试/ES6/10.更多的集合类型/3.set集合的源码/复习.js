


class MySet {
    constructor(data = []) {
        if (typeof (data[Symbol.iterator]) !== 'function') {
            throw new Error('参数必须是一个可迭代数据')
        };

        this._data = [];

        for (let value of data) {
            this.add(value);
        }
    };

    // 添加数据
    add(data) {
        this.has(data) || this._data.push(data)
        return this._data
    };

    // 判断数据
    has(data) {
        for (let value of this._data) {
            if (data === 0 && value === 0) {
                return
            } else if (Object.is(data, value)) {
                return true
            }
        }

        return false
    };


    // 删除数据
    delete(data) {
        const index = this._data.findIndex((value) => { return data === value });
        index > -1 && this._data.splice(index, 1)
    };


    // 清空数据
    clear() {
        this._data.length = 0
    };

    // 获取数据长度
    get size() {
        return this._data.length
    };

    forEach(callback) {
        for (let value of this._data) {
            callback(value, value, this)
        }
    }

    *[Symbol.iterator]() {
        for (let value of this._data) {
            yield value
        }
    }
}