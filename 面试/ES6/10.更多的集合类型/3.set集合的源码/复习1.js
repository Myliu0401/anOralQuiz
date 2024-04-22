


class MySet{
    constructor(arr = []){
        this._arr = MySet.init(arr);
    };


    // 可迭代对象,返回一个迭代器
    [Symbol.iterator](){
           return {
               i: 0,
               next(){
                    return {
                        value: this._arr[i++],
                        done: i.length >= this._arr
                    }
               }
           }
    };

    static init(arr){
        // 先去重      
        arr = arr.filter((item, index, self)=>{ return self.indexOf(item) === index });

        const arrs = [];
        for(let item of arr){
             arrs.push(item);
        };

        return arrs;
    };


    get size(){
         return this._arr.length;
    };

    add(data){
        if(this.has(data)){
            return;
        };
        this._arr.push(data);
        return this;
    };

    has(data){
        return this._arr.some((item)=>{
            return Object.is(data, item);
        });
    };


    delete(data){
        const index = this._arr.findIndex((item)=>{
          return Object.is(data, item);
        });
        if(index === -1){
            return false
        };
        this._arr.splice(index, 1);
        return true;
    };


    clear(){
       this._arr.length = 0;
    };


    forEach(callback){
        for(let item of this._arr){
            callback(item, item, this._arr);
        }; 
    };
};