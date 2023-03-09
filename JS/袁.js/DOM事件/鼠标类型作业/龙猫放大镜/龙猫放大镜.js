/* (function (){ //利用立即执行函数,避免污染全局 */


//总信息
var zhong = {
    xiaodiv: document.getElementById('xiao'),
    yidongdiv: document.getElementById('yidong'),
    dadiv: document.getElementById('da'),
    xiaotu: "./龙猫小图.jpg",
    datu: "./龙猫大图.jpg",
    xiaodivxinxi: {
        kuan: 300,
        gao: 300,
    },
    dadivxinxi: {
        kuan: 500,
        gao: 500,
    },
    datuxinxi: {
        kuan: 800,
        gao: 800,
    }
}
zhong.width = zhong.dadivxinxi.kuan / zhong.datuxinxi.kuan * zhong.xiaodivxinxi.kuan
zhong.height = zhong.dadivxinxi.gao / zhong.datuxinxi.gao * zhong.xiaodivxinxi.gao


//总初始化
function zhongchushi() {




    /**
     * 初始化图片
     */
    function tupian() {
        zhong.xiaodiv.style.background = `url(${zhong.xiaotu}) no-repeat left top/100% 100%`
        zhong.dadiv.style.background = `url(${zhong.datu}) no-repeat`
    }
    tupian()

    /**
     * 初始化移动div
     */
    function yindong() {
        zhong.yidongdiv.style.width = zhong.width + 'px'
        zhong.yidongdiv.style.height = zhong.height + 'px'
    }
    yindong()




    /*
     * 初始化事件
     */
    function shijain() {
        zhong.xiaodiv.onmouseenter = function () {
            zhong.yidongdiv.style.display = 'block'
            zhong.dadiv.style.display = 'block'
        }
        zhong.xiaodiv.onmouseleave = function () {
            zhong.yidongdiv.style.display = 'none'
            zhong.dadiv.style.display = 'none'
        }
        zhong.xiaodiv.onmousemove = function (e) {
            var naishi = zuobiao(e)
            jisuan(naishi)
            dadivzhi()
        }
    }
    shijain()


    /**
     * 计算移动div的坐标
     * @param {MouseEvent} e
     */
    function zuobiao(e) {
        if (e.target === zhong.xiaodiv) {
            return {
                x: e.offsetX,
                y: e.offsetY
            }
        } else {
            var style = getComputedStyle(zhong.yidongdiv)
            var left = parseFloat(style.left)
            var top = parseFloat(style.top)
            return {
                x: left + e.offsetX,
                y: top + e.offsetY
            }

        }

    }

    /**
     * 计算坐标进行赋值移动div
     */
    function jisuan(e) {
        var left = e.x - zhong.width / 2
        var top = e.y - zhong.height / 2
        if (left < 0) {
            left = 0
        }
        if (top < 0) {
            top = 0
        }
        if (left > zhong.xiaodivxinxi.kuan - zhong.width) {
            console.log('进来')
            left = zhong.xiaodivxinxi.kuan - zhong.width
        }
        if (top > zhong.xiaodivxinxi.gao - zhong.height) {
            console.log('进来了')
            top = zhong.xiaodivxinxi.gao - zhong.height
        }
        zhong.yidongdiv.style.left = left + 'px'
        zhong.yidongdiv.style.top = top + 'px'

    }


    /**
     * 计算大div坐标进行赋值
     */
    function dadivzhi() {
        var style = getComputedStyle(zhong.yidongdiv)
        var left = parseFloat(style.left)
        var top = parseFloat(style.top)
        left = left / zhong.xiaodivxinxi.kuan * zhong.datuxinxi.kuan
        top = top / zhong.xiaodivxinxi.gao * zhong.datuxinxi.gao
        console.log(left)
        zhong.dadiv.style.backgroundPosition = `-${left}px -${top}px`
    }

}
zhongchushi()





/* }()) */