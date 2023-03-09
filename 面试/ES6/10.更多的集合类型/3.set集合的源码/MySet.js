class MySet {
    constructor(diedai = []) { //如果没传参就使用默认值
        //判断参数是否为迭代对象
        if (typeof (diedai[Symbol.iterator]) !== 'function') {
            throw new TypeError(`${diedai}不是一个迭代对象`)
        } else {

            this._arr = []; //用于装每一项
            for (let prop of diedai) {
                this.add(prop)
            }

        }

    }

    add(sum) {
        if (!this.has(sum)) {
            this._arr.push(sum)
        }
        return this;
    }


    has(sum) {
        for (let prop of this._arr) {
            if (this.Fuzhu(sum, prop)) {
                return true;
            }
        }
        return false;
    }

    delete(sum) {
        this._arr.forEach((ele, index) => {
            this.Fuzhu(ele, sum) && this._arr.splice(index, 1)
        });
        return this;
    }

    clear() {
        this._arr.length = 0;
    }

    get size(){
        return this._arr.length;
    }


    //用于辅助,因为+0于-0的问题
    Fuzhu(a, b) {
        if (a === 0 && b === 0) {
            return true
        } else {
            return Object.is(a, b)
        }
    }


    forEach(func) {
        for (let prop of this._arr) {
            func(prop, prop, this._arr)
        }
    }


    *[Symbol.iterator]() {
        for (let prop of this._arr) {
            yield prop;
        }
    }
}