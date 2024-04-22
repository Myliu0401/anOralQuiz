

class MyMap {
    constructor(data = []){
       this._arr = [];
       MyMap.init(data);
    };

    get size(){
        return this._arr.length;
    };

    static init(data){
        for(let items of data){
            const iteration = items[Symbol.iterator]();
            this.set(iteration.next(), iteration.next());
        };
    };


    set(key, value){
         if(this.has(key)){
            const index = this._arr.findIndex((item)=>{ return Object.is(item.key, key) });
            this._arr[index].value = value;
         }else {
            this._arr.push({ key, value });
         };
         return this;
    };


    get(key){
        const index = this._arr.findIndex((item)=>{ return Object.is(item.key, key) });
        return index === -1 ? undefined : this._arr[index].value; 
    };

    has(key){
       return this._arr.some((item)=>{ return Object.is(item.key, key) });
    };

    delete(key){
        const index = this._arr.findIndex((item)=>{ return Object.is(item.key, key) });
        this._arr.splice(index, 1);
        return this;
    };

    clear(){
        this._arr.length = 0;
        return this;
    }
};