var obj = {
    naishi: document.getElementById('naishi'),
    input: document.querySelector('input'),
    zIndex: 1,
    kuan: 180,
    gao: 200,
    arr: ['奈斯', '耶屎', '迷死']
}



/**
 * 总初始化
 */
function chushihua() {
    var MaxLeft = document.documentElement.clientWidth
    console.log(MaxLeft)
    var MaxTop = document.documentElement.clientHeight


    /**
     * 注册事件
     */
    function shijian() {


        window.onmousedown = function (e) { //拖拽功能
            if (e.target.parentElement) {
                if (e.target.parentElement.className === 'condt' || e.target.parentElement.className === 'kapian') {
                    var left = e.clientX
                    var top = e.clientY
                    var style = getComputedStyle(e.target.parentElement.className === 'condt' ? e.target : e.target.parentElement)
                    var div = e.target.parentElement.className === 'condt' ? e.target : e.target.parentElement
                    var l = parseFloat(style.left)
                    var t = parseFloat(style.top)
                    window.onmousemove = function (e) { //鼠标移动事件
                        var LEFT = e.clientX
                        var TOP = e.clientY
                        div.style.zIndex = obj.zIndex
                        div.style.left = LEFT - left + l + 'px'
                        div.style.top = TOP - top + t + 'px'
                        //===========================================================//   
                        //---------规定拖拽最大值和最小值的范围----------// 
                        var zhi = parseFloat(div.style.left)
                        var gao = parseFloat(div.style.top)
                        var maxkuan = document.documentElement.clientWidth - obj.kuan
                        var maxgao = document.documentElement.clientHeight - obj.gao - 80
                        if (zhi < 0) {
                            div.style.left = '0px'
                        } else if (zhi > maxkuan) {
                            div.style.left = maxkuan + 'px'
                        }
                        if (gao < 0) {
                            div.style.top = '0px'
                        } else if (gao > maxgao) {
                            div.style.top = maxgao + 'px'
                        }
                        //==========================================================//
                    }
                    window.onmouseup = function (e) { //鼠标抬起事件
                        if (e.button === 0) {
                            window.onmousemove = null
                        }
                    }
                    obj.zIndex++
                }
            }
        }

        window.onclick = function (e) { //点击事件,删除功能
            if (e.target.tagName === 'SPAN') {
                e.target.parentElement.remove()
            }
        }

        window.onresize = function () { //视口功能
            var left = document.documentElement.clientWidth - MaxLeft
            var top = document.documentElement.clientHeight - MaxTop
            Array.from(obj.naishi.children).forEach(function (imgs) {
                var l = parseFloat(imgs.style.left)
                var t = parseFloat(imgs.style.top)
                var k = l / (MaxLeft - obj.kuan) * left
                var y = t / (MaxTop - obj.gao) * top
                imgs.style.left = k + l + 'px'
                imgs.style.top = y + t + 'px'
            })
            MaxLeft = document.documentElement.clientWidth
            MaxTop = document.documentElement.clientHeight
        }

    }
    shijian()



    /**
     * 随机颜色功能
     */
    function shuijiys(div) {
        div.style.backgroundColor = `rgb(${Math.floor(Math.random() * (200 - 100) + 100)},${Math.floor(Math.random() * (200 - 100) + 100)},
       ${Math.floor(Math.random() * (200 - 100) + 100)})`
    }


    /**
     * 随机位置功能
     */
    function shuijiweizhi(div, maxleft, maxtop) {
        div.style.left = Math.random() * (maxleft - 0) + 0 + 'px'
        div.style.top = Math.random() * (maxtop - 0) + 0 + 'px'
    }


    /**
     * 许愿点击功能
     */
    function kaipian() {
        obj.input.onkeypress = function (e) {
            if (e.code === 'Enter' && this.value) {
                shengc(this.value)
                this.value = ''
            }
        }
    }
    kaipian()


    /**
     * 生成卡片功能
     */
    function shengc(Tx) {
        var div = document.createElement('div')
        div.className = 'kapian'
        div.innerHTML = `<p>${Tx}</p><span>X</span>`
        obj.naishi.appendChild(div)
        shuijiys(div)
        var maxleft = document.documentElement.clientWidth - obj.kuan
        var maxtop = document.documentElement.clientHeight - 190 - obj.gao
        shuijiweizhi(div, maxleft, maxtop)
    }

    /**
     * 最开始页面的三个卡片
     */
    for (var i = 0; i < 3; i++) {
        shengc(obj.arr[i])
    }


}
chushihua()