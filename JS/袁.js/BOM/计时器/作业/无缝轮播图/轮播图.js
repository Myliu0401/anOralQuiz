//总信息
var zhong = {
    doms: {
        div: document.querySelector('.subject'),
        imgs: document.querySelector('.subject .imgs'),
        xians: document.querySelector('.subject .qiehuan'),
        qiehuan: document.querySelector('.subject .xiaodian')
    },
    weizhi: 0, //位置 索引 0 ~ 4 //实际图片的索引
    tirem: { //以毫秒为单位
        Millisecond: 16,
        Totaltime: 500,
        id: null
    },
    //自动移动
    naishi: null
}
//图片的宽
zhong.width = parseFloat(getComputedStyle(zhong.doms.imgs).width)
zhong.nuder = zhong.doms.imgs.children.length //实际中数




/**
 * 初始化装图片的容器
 */
function zhuantu() {
    //因为要多两个空间出来,装头尾
    zhong.doms.imgs.style.width = (zhong.width * zhong.doms.imgs.children.length) + (zhong.width * 2) + 'px'
    zhong.Width = (zhong.width * zhong.doms.imgs.children.length) + (zhong.width * 2)
}
zhuantu()


/**
 * 初始化小点
 */
function zhuandian() {
    Array.from(zhong.doms.imgs.children).forEach(function () {
        var dian = document.createElement('span')
        zhong.doms.xians.appendChild(dian)
    })
    //装小点的div宽度由小点的个数和css设置的宽度决定
    var k = zhong.doms.xians.firstElementChild
    var w = parseFloat(getComputedStyle(k).width)
    var l = parseFloat(getComputedStyle(k).marginLeft)
    var r = parseFloat(getComputedStyle(k).marginRight)
    zhong.doms.xians.style.width = (w + l + r) * zhong.doms.xians.children.length + 'px'
}
zhuandian()


/**
 * 初始化创建的头尾图片空间
 */
function chuanjiantu() {
    var zi = zhong.doms.imgs.children
    var Imgsi = zi[0]
    var imgst = zi[zi.length - 1]
    zhong.doms.imgs.appendChild(Imgsi.cloneNode(true))
    zhong.doms.imgs.insertBefore(imgst.cloneNode(true), zi[0])
}
chuanjiantu()

/**
 * 初始化图片位置
 */
function tupianweizhi() {
    //位置由最开始图片个数的索引决定
    zhong.doms.imgs.style.marginLeft = (-zhong.weizhi - 1) * zhong.width + 'px'
}
tupianweizhi()

/**
 * 初始化图片选中时小点的样式
 */
function xuanzhongxiaodian() {
    Array.from(zhong.doms.xians.children).forEach(function (xian, i) {
        if (i === zhong.weizhi) {
            xian.className = 'xuanzhong'
        } else {
            xian.className = ''
        }
    })
}
xuanzhongxiaodian()




/**
 * 判断的移动位置信息 
 * @param {*} index 索引,实际图片的索引
 * @param {*} direction 方向,图片运动的方向
 */
function hanshu(index, direction) {
    if (index === zhong.weizhi) {
        return
    }
    if (!direction) {
        direction = 'right'
    }

    //目标的marginLeft
    var newLeft = (-index - 1) * zhong.width
    console.log(newLeft)
    /**
     * 创建计时器移动marginLeft
     */
    function hanshumargin() {
        tiaojian()
        //计算每运动一张图片的循环器执行次数
        /* 每2秒一张图,每16毫秒执行一次 */
        var shijian = Math.ceil(zhong.tirem.Totaltime / zhong.tirem.Millisecond)

        var count = 0 //当前运动次数
        var juli //总距离 
        left = parseFloat(getComputedStyle(zhong.doms.imgs).marginLeft) //当前距离
        console.log(left)
        zhongjuli = zhong.width * zhong.nuder
        console.log(zhongjuli)
        if (direction === 'right') { //按右键
            if (newLeft < left) {
                juli = newLeft - left
                console.log(juli)
            } else {
                juli = -(zhongjuli - Math.abs(newLeft - left))
                console.log('进来了')
            }
        } else { //按左键
            if (newLeft > left) {
                juli = newLeft - left
            } else {
                juli = zhongjuli - Math.abs(newLeft - left)
            }
        }
        var every = juli / shijian
        console.log(every)
        zhong.tirem.id = setInterval(function () {
            console.log(left += every) //因为js数字储存的特殊性,导致小数点17位进1,所以从倒数第二张
            //到最后一张 ,计算后超过了边界
            if (direction === 'right' && Math.abs(left) > zhongjuli) {
                left += zhongjuli
            } else if (direction === 'left' && Math.abs(left) < zhong.width) {
                left -= zhongjuli
            }
            zhong.doms.imgs.style.marginLeft = left + 'px'
            count++
            if (count === shijian) {
                console.log(zhong.doms.imgs.style.marginLeft)
                tiaojian()
            }
        }, zhong.tirem.Millisecond)

    }


    zhong.weizhi = index
    xuanzhongxiaodian()

    hanshumargin()

}




/**
 * 条件成立清除计时器
 */
function tiaojian() {
    clearInterval(zhong.tirem.id)
    zhong.tirem.id = null
}


window.onclick = function (e) {
    if (e.target.classList.contains('left')) {
        dianji()
    } else if (e.target.classList.contains('reigth')) {
        dian()
    }
}
zhong.doms.xians.onclick = function (e) {
    if (e.target.tagName === 'SPAN') {
        var index = Array.from(this.children).indexOf(e.target)
        console.log(index)
        hanshu(index, index > zhong.weizhi ? 'right' : 'left')
    }
}

function dianji() {
    var index = zhong.weizhi - 1
    if (index < 0) {
        index = zhong.nuder - 1
    }
    hanshu(index, 'left')
}

function dian() {
    console.log('312')
    var index = (zhong.weizhi + 1) % zhong.nuder
    hanshu(index, 'right')
}


//自动移动
zhong.naishi = setInterval(dianji, 2000)


zhong.doms.div.onmouseenter = function () {
    clearInterval(zhong.naishi);
    zhong.naishi = null;
}

zhong.doms.div.onmouseleave = function () {
    if (zhong.naishi) {
        return;
    }
    zhong.naishi = setInterval(dianji, 2000);
}