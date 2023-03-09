class Mymap {
    constructor(data = []) {

        this._data = []; //用于存储数据

        //验证是否为可迭代对象
        if (this.Fudiedai(data)) {
            //再继续判断迭代出来的每一项是不是 可迭代对象
            for (const prop of data) {

                if (this.Fudiedai(prop)) {

                    const diedai = prop[Symbol.iterator]() //拿它的迭代器出来,要用到

                    const key = diedai.next().value; //键 
                    const val = diedai.next().value; //值
                    //相当于一个数组里面有两项,第一次迭代是第一项,第二次迭代是第二项
                    //第一项为 键, 第二项为 值

                    //push进存储数据
                    this.set(key, val);

                } else {
                    throw new TypeError(`${data}里面的${prop}不是可迭代对象`);
                }

            }

        } else {
            throw new TypeError(`${data}不是可迭代对象`);
        }


    }


    //用于添加键值对
    set(jiang, zhi) {
        if (!this.has(jiang)) {
            this._data.push({
                jiang,
                zhi
            })
        } else { //有一样的,就进行覆盖
            this.Fufugai(jiang, zhi)
        }
       return this
    }


    //判断键是否存在
    has(jiang) {
        for (let i = 0; i < this._data.length; i++) {

            if (this.Fubianli(this._data[i], jiang)) {
                return true
            }

        }
        return false;
    }


    //用于辅助has遍历
    Fubianli(obj, jiang) {
        for (const prop in obj) {
            if (obj[prop] === 0 && jiang === 0) {
                return true;
            } else if (Object.is(obj[prop], jiang)) {
                return true;
            }
            break; //只判断对象的第一个值,因为第一个值是 键
        }
        return false;
    }


    //用于辅助进行覆盖
    Fufugai(key, val) {
        let fol = false;
        for (let i = 0; i < this._data.length; i++) {
            if (this.Fubianli(this._data[i], key)) {
                for (const prop in this._data[i]) {
                    if (fol) {
                        this._data[i][prop] = val
                    }
                    fol = true;
                }
            }
        }
        fol = false;
    }



    //用于辅助判断,是不是 可迭代对象
    Fudiedai(data) {
        if (typeof (data[Symbol.iterator]) === 'function') {
            return true;
        } else {
            return false;
        }

    }
}