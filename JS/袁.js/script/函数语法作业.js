//# 通用函数编写
//新建一个js文件，编写以下函数

//1. 写一个函数，该函数用于判断某个数是不是奇数

//函数名参考：isOdd

/**
 *  判断是否为奇数
 * @param {number} 实参的类型
 * @returns {boolean} 
 */
function isOdd(qishu) {
    if (qishu % 2 === 1) {
        return true
    } else {
        return false
    }
    //简化 版: return qishu%2 !== 0
    //如果为1，1不等于0 就返回true, 否则为true
}









//
//2. 写一个函数，该函数用于判断某个数是不是素数
//
//函数名参考：isPrime
/**
 *  判断是不是质数
 * @param {number} 实参类型
 * @returns {boolean} 
 */
function isPrime(zhishu) {
    var coun = 0
    for (var i = 1; i <= zhishu; i++) {
        if (zhishu % i === 0) {
            coun++
        }
    }
    if (coun === 2) {
        return true
    } else {
        return false
    }
    //简化版: return coun === 2 
}




//
//3. 写一个函数，该函数用于对数组求和
//
//函数名参考：sumOfArray
/**
 * 数组的求和
 * @param {arr} 实参的类型,必须为数组
 * @returns {number} 
 */
function sumOfArray(shuzhu) {
    var sum = 0
    for (var i = 0; i < shuzhu.length; i++) {
        sum += shuzhu[i]
    }
    return sum
}




//
//4. 写一个函数，该函数用于得到数组中的最大值
//
//函数名参考：maxOfArray
/**
 * 得出数组中最大的值
 * @param {arr} 实参类型为数组
 * @returns {number}
 */
function maxOfArray(max) {
    if(max.length===0){
        return
    }
    var str = max[0]
    for (var i = 0; i < max.length; i++) {
        if (str < max[i]) {
            str = max[i]
        }
    }
    return str
}







//5. 写一个函数，该函数用于得到数组中的最小值
//
//函数名参考：minOfArray
/**
 *  得出数组中的最小值
 * @param {arr} 实参为数组
 * @returns {number}
 */
function minOfArray(min) {
    if(min.length===0){
        return
    }
    var str = min[0]
    for (var i = 0; i < min.length; i++) {
        if (str > min[i]) {
            str = min[i]
        }
    }
    return str
}










//6. 写一个函数，该函数用于判断数组是否是稀松数组
//
//函数名参考：hasEmptyInArray
/**
 *  判断是否为稀松数组
 *  @param {arr} 实参为数组
 *  @returns {boolean}
 */
function hasEmptyInArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === undefined) {
            return false
        }
    }
    return true
}

/**
 *  更灵活的方式
 */
  function xishoushuz(arr){
      for(var i=0; i<arr.length; i++){
          if(!(i in arr)){ //要用括号括起来,相当于对整个表达式的结果取反,不然系统会认为是对i取反
             return false //是稀松
          }
      }
      return true //不是稀松
  }






//7. 写一个函数，判断该某年是否是闰年
//  4年一闰,百年不闰;400百年一闰
//函数名参考：isLeap
/**
 * 判断是否为闰年
 * @param {number} 实参为数据年份
 * @returns {number}
 */
function isLeap(nian) {
    return nian % 4 === 0 && nian % 100 !== 0 || nian % 400 === 0
}




//8. 写一个函数，得到某年某月的天数
//平年和闰年各月份的天数，只有一个月不相同其余各月的天数都是一样．概况如下:
//平年365天,其中2月28天,
//闰年366天,其中2月29天.
//
//函数名参考：getDays
/**
 * 得出某年某月的天数
 * @param {number} nian年
 * @param {number} yue月
 * @returns {number} 天数
 */
function getDays(nian, yue) {
    var str = nian % 4 === 0 && nian % 100 !== 0 || nian % 400 === 0
    if (str) { //闰年
        if (yue === 2) {
            return 29
        }
        return yue % 2 === 0 ? 30 : 31
    } else { //平年
        if (yue === 2) {
            return 28
        }
        return yue % 2 === 0 ? 30 : 31
    }
}

/** 
 * 得出某年某月的天数,更灵活的方式 
 */











//9. 写一个函数，得到某个数字数组中出现次数最多的数字和频率
//
//函数名参考：getTopFreqInArray
//
//# 函数使用
/**
 * 数组中出现最多的数字和频率
 * @param {arr} 参数为数组
 */
function getTopFreqInArray(shuzhu) {
    var obj = {}
    for (var i = 0; i < shuzhu.length; i++) {
        if (!obj[shuzhu[i]]) {
            obj[shuzhu[i]] = 1
        } else {
            obj[shuzhu[i]]++
        }
    }
    var str
    for (var prop in obj) {
        if (!str || str.zhi < obj[prop]) {
            str = {
                mian: prop,
                zhi: obj[prop]
            }
        }
    }
    return str
    //上面只能打印第一个出现最多的,下面的都能打印  
    //    var stro = ""
    //    for(var prop in obj){
    //        if(obj[prop]===str.zhi){
    //           stro += prop+','+obj[prop]+','
    //        }
    //    }
    //    return stro
}









//1. 利用上面的某些函数，实现哥德巴赫猜想
//
//任何一大于2的偶数都可写成两个质数之和，比如：8 = 3 + 5
//
//让用户输入一个大于2的整数，输出其等于哪两个素数相加
/** 
 * 输入一个大于2的整数，输出其等于哪两个素数相加<这个代码不太完美>
 * 
 */
function hanshu() {
    var nuder = +prompt(`请输入大于2的遇数`)
    if (nuder > 2 && nuder % 2 === 0) {
        var arr = []
        for (var i = 1; i < nuder; i++) {
            var coun = 0
            for (var j = 1; j < nuder; j++) {
                if (i % j === 0) {
                    coun++
                }
            }
            if (coun === 2) {
                arr.push(i)
            }
        }
        console.log(arr)
        for (var prop in arr) {
            for (var pop in arr) {
                if (arr[prop] + arr[pop] === nuder) {
                    console.log(`${nuder}=${arr[prop]}+${arr[pop]}`)
                }
            }
        }
    } else {
        console.log('你输入的错误')
    }
}


/**
 *  更灵活的方式
 */
   function test(){
       var zhishu = +prompt('哥德巴赫猜想')
       if(zhishu<=2 || isNaN(zhishu) || zhishu%2===1){
           console.log('你的输入有误,请重新输入')
           return
       }else{
           for(var i=2; i<zhishu-2; i++){ //因为2是质数,‘先去掉’
              var j = zhishu - i
              if(isPrime(i) && isPrime(j)){
                  console.log(``)
                 // return
              }
           }
       }
   }




//2. 让用户输入一个年份，输出该年每个月的天数
/**
 * 不完美
 */
function tianshu() {
    var tian = +prompt('请输入年份')
    if (!isNaN(tian)) {
        var str = tian % 4 === 0 && tian % 100 !== 0 || tian % 400 === 0
        for (var i = 1; i <= 12; i++) {
            if (i === 2) {
                var kpj = i === 2 && str === true ? `${i}月有29天` : `${i}月有28天`
                if(str){
                      console.log(`闰年:${i}月为29天`)
                }else{
                      console.log(`平年:${i}月为28天`)
                }
            }
            var njm = i % 2 === 0 ? `${i}月有31天` : `${i}月有30天`
           if(i%2===1){
             console.log(`${i}月为31天`)
           }else{
             console.log(`${i}月为30天`)
           }
        }
    } else {
        console.log('你的输入有误,请重新输入')
    }
}


/**
 *  更灵活的方式
 */
