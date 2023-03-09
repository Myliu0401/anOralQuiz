//1.将之前的函数语法.js改造成单对象模式

var MyFunctions = {
    //1. 写一个函数，该函数用于判断某个数是不是奇数
    //函数名参考：isOdd
    /**
     *  判断是不是奇数
     * @param {number} Odd 为实参
     * @returns {number}
     */
    isOdd: function (Odd) {
        return Odd % 2 !== 0
    },


    //2. 写一个函数，该函数用于判断某个数是不是素数
    //函数名参考：isPrime
    /**
     * 判断是否为质数
     * @param {number} Prime 为实参
     * @returns {number}
     */
    isPrime: function (Prime) {
        var count = 0
        for (var i = 1; i <= Prime; i++) {
            if (Prime % i === 0) {
                count++
            }
        }
        return count === 2
    },


    //3. 写一个函数，该函数用于对数组求和
    //函数名参考：sumOfArray
    /**
     * 对数组的求和
     * @param {Array} arr 为实参
     * @returns {number}
     */
    sumOfArray: function (arr) {
        var sum = 0
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i]
        }
        return sum
    },


    //4. 写一个函数，该函数用于得到数组中的最大值
    //函数名参考：maxOfArray
    /**
     * 求数组中的最大值
     * @param {Array} arr 为最大值
     * @returns {number}
     */
    maxOfArray: function (arr) {
        var max = arr[0]
        for (var i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i]
            }
        }
        return max
    },

    //5. 写一个函数，该函数用于得到数组中的最小值
    //函数名参考：minOfArray
    /**
     *  求数组的最小值
     *  @param {Array} arr 为实参
     *  @returns {number}
     */
    minOfArray: function (arr) {
        var min = arr[0]
        for (var i = 0; i < arr.length; i++) {
            if (min > arr[i]) {
                min = arr[i]
            }
        }
        return min
    },


    //6. 写一个函数，该函数用于判断数组是否是稀松数组
    //函数名参考：hasEmptyInArray
    /**
     * 用于判断是否为稀松数组
     * @param {Array} arr 为实参
     * @returns {boolean} 
     */
    hasEmptyInArray: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === undefined) {
                return false
            }
        }
        return true
    },

    //更灵活的方式
    hasEmptyInArraylinhuo: function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!(i in arr)) {
                return true
            }
        }
        return false
    },


    //7. 写一个函数，判断该某年是否是闰年
    //  4年一闰,百年不闰;400百年一闰
    //函数名参考：isLeap
    /**
     * 用于判断是否为闰年
     * @param {number} Leap 为实参
     * @returns {boolean}
     */
    isLeap: function (Leap) {
        return Leap % 4 === 0 && Leap % 100 !== 0 || Leap % 400 === 0
    },

    //8. 写一个函数，得到某年某月的天数
    //平年和闰年各月份的天数，只有一个月不相同其余各月的天数都是一样．概况如下:
    //平年365天,其中2月28天,
    //闰年366天,其中2月29天.
    //函数名参考：getDays
    /**
     * 求某年某月的天数
     * @param {number} num 为实参  (年)
     * @param {number} der 为实参  (月)
     * @returns {string}
     */
    getDays: function (num, der) {
        var boolean = num % 4 === 0 && num % 100 !== 0 || num % 400 === 0
        if (der === 2) {
            return boolean ? 29 : 28
        } else if (der >= 8 && der % 2 === 0 || der < 8 && der % 2 === 1) {
            return 31
        } else {
            return 30
        }
    },


    //9. 写一个函数，得到数组中出现次数最多的数字和频率
    //函数名参考：getTopFreqInArray
    /**
     *  得到数组中出现次数最多的数字和频率
     *  @param {Array} arr 为实参
     *  @returns {object} 把数字和它出现的频率都装进对象
     */
    getTopFreqInArray: function (arr) {
        var obj = {}
        for (var prop in arr) {
            if (!obj[arr[prop]]) {
                obj[arr[prop]] = 1
            } else {
                obj[arr[prop]]++
            }
        }
        var obj1
        for (var pop in obj) {
            if (!obj1 || obj[pop] > obj1.ci) {
                obj1 = {
                    zhi: pop,
                    ci: obj[pop]
                }
            }
        }
        return obj1
    },


    //1. 利用上面的某些函数，实现哥德巴赫猜想
    //任何一大于2的偶数都可写成两个质数之和，比如：8 = 3 + 5
    //让用户输入一个大于2的整数，输出其等于哪两个素数相加
    /**
     * 一个大于2的偶数,可以是两个质数之和
     * @returns {string}
     */
    GdeBa: function () {
        var GO = +prompt('请输入大于2的偶数')
        if (GO > 2 && GO % 2 === 0) {
            for (var i = 2; i <= GO - 2; i++) { //必须减2因为 2是质数
                var str = GO - i //一方增加一方减少,然后进行判断
                if (isPrime(str) && isPrime(i)) {
                    console.log(`${str}+${i}=${GO}`)
                }
            }
        } else {
            console.log('你的输入有误,请重新输入')
        }
    },

    //2. 让用户输入一个年份，输出该年每个月的天数 (一年12个月)
    /**
     * 输出该年每个月的天数
     */
    Days: function () {
        var Da = +prompt('请输入年份')
        if (!isNaN(Da)) {
            var nian = Da % 4 === 0 && Da % 100 !== 0 || Da % 400 === 0
            for (var i = 1; i <= 12; i++) {
                console.log(`${Da}年${i}月:${getDays(Da,i)}`) //让上面已经写好的,自己进行判断
            }
        } else {
            console.log('你的输入有误,请重新输入')
        }
    },


    //---- 下面都是回调函数 ----//

    //10.写一个函数,为数组排序要考虑到这个数组的所有可能
    //sore
    /**       // 为数组里面的对象排序 //
     *  为数组排序,如果是引用类型那就排在最后面,如果是字符串就按照长度升序
     *  @param {*} arr 为实参
     *  @param {Function} func 为实参 ,比较大小
     *  @returns {Array} 
     *   该函数中有两个参数,带代表数组中的两个元素
     *  如果为整数则第一个元素比的二个元素大
     *  如果为负数则第一个元素比的二个元素小
     *  0则相等
     */
    sore: function (arr, func) { //要求以怎样排序可以自己写在第二个函数
        if (!func) { //如果没写就按照这样排序
            func = function (a, b) { //根据数组里面的对象要求进行修改
                return a - b > 0 ? 1 : -1
            }
        }
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i; j++) {
                if (func(arr[j], arr[j + 1]) > 0) { //如果大于0,为升序
                    var str = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = str
                } else { // 如果小于0位降序

                }
            }
        }
        console.log(arr)
    },

    //11.写一个函数,按照指定的条件对某个数组进行筛选
    //filler
    /**
     * 按照上面条件,自己定,然后按条件进行筛选,装进一个新的数组
     * @param {Array} arr 为数组
     * @param {Function} func 为函数
     * @returns {Array} 
     */
    filler: function (arr, func) {
        var screen = func || function (a) { //条件可以自己设置,然后执行函数,就会按照条件进行筛选
            return a % 2 === 1 //这个是没有设置条件,就按照这个条件来筛选
        }
        var arr1 = []
        for (var i = 0; i < arr.length; i++) {
            if (screen(arr[i])) {
                arr1.push(arr[i])
            }
        }
        console.log(arr1)
    },


    //12.写一个函数,按照指定的条件,得到某个数组中第一个满足条件的元素
    //find
    /**
     * 条件自己定在第二个参数,然后根据条件取出第一个满足要求
     * @param {Array} arr 为数组
     * @param {Function} func 为函数
     * @returns {Array} 
     */
    find: function (arr, func) {
        var tiaojian = func || function (arr, i) {
            return arr === 3 && i == 2
        }
        for (var i = 0; i < arr.length; i++) {
            if (tiaojian(arr[i], i)) {
                return arr[i] //条件满足,返回后就不会再进行循环了
            }
        }
    },

    //5.写一个函数,按照指定的条件,得到某个数组中满足条件的元素的数量
    //count
    /**
     *  条件自己定
     *  @param {Array} arr 为数组
     *  @param {Function} func 为函数
     */
    count: function (arr, func) {
        var hanshu = func || function (arr, i) {
            return arr === 6
        }
        var sum = 0
        for (var i = 0; i < arr.length; i++) {
            if (hanshu(arr[i])){
                sum ++
            }
        }
        return sum
    }


}