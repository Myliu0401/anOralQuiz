//单对象模式
var MyFunction = {
    //10.写一个函数,为数组排序要考虑到这个数组的所有可能
    //sore
    /**
     * 排序的所有可能,根据自己定规则
     * @param {Array} arr 为实参,数组
     * @param {function} func 为实参,用来定规则,排序
     * @returns {Array}
     */
    sore: function (arr, func) {
        var sort = func || function (a, b) {
            return b - a > 0 //升序   b-a就是倒序
        }
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                if (sort(arr[j], arr[j + 1])) {
                    var str = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = str
                }
            }
        }
        return arr
    },


    //11.写一个函数,按照指定的条件对某个数组进行筛选
    //filler
    /**
     * @param {Array} arr 为实参 数组
     * @param {function} func 为实参 函数 用来定规则
     * @returns {Array} 
     */
    filler: function (arr, func) {
        var screen = func || function (a) {
            return a % 2 === 1
        }
        var array = []
        for (var i = 0; i < arr.length; i++) {
            if (screen(arr[i])) {
                array.push(arr[i])
            }
        }
        return array
    },

    //12.写一个函数,按照指定的条件,得到某个数组中第一个满足条件的元素
    //find
    /**
     * @param {Array} arr 为实参 数组
     * @param {function} func 为实参 函数  用来定规则
     * @returns {*}
     */
    find: function (arr, func) {
        var diyi = func || function (arr, i) {
            return arr % 2 === 1 && i === 6
        }
        for (var i = 0; i < arr.length; i++) {
            if (diyi(arr[i], i)) {
                return arr[i]
            }
        }
    },

    //5.写一个函数,按照指定的条件,得到某个数组中满足条件的元素的数量
    //count
    /**
     * @param {Array} arr 为实参 数组
     * @param {function} func 为实参 函数 用来定规则
     * @returns {numder}  
     */
    count:function (arr,func){
        var rule = func || function (arr,i){
            return arr === 7
        }
        var sum = 0
        for(var i=0; i<arr.length; i++){
            if(rule(arr[i],i)){
                sum ++
            }
        }
        return sum
    }
}