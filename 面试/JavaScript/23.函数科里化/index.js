/* 
      什么是柯里化
        就是把多参函数变成单参函数。就是利用闭包的特性固定参数





*/


function currying(callback, ...surplus) {
    return (...collect) => {
        const arr = surplus.concat(collect);
        if (arr.length >= callback.length) {
            return callback(...arr)
        } else {
            return currying(callback, ...arr)
        }
    }
};



// 面试题
add(1)(2)(3) === 6
add(1, 2, 3)(4) === 10


function add(...collect) {
    let arr = collect;
    regular.count = () => {
        return arr.reduce((a, b) => { return a + b })
    };
    function regular(...collect1) {
        arr = arr.concat(collect1);
        return regular;
    };
    return regular;
};




