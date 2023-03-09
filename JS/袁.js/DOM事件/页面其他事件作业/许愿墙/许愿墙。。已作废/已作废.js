//总信息
var zhong = {
    kaipian: document.getElementById('a1'),
    xti: document.getElementById('xi'),
    DIV: document.getElementById('DIV'),
    ys: 'rgd',
    inp: document.querySelector('input'),
    kati: {
        kapiankuan: 250,
        kapiangao: 300
    },
}

/**
 * 总初始化
 */
function zhongchushihua() {
    var vWidth = document.documentElement.clientWidth
    var vHeight = document.documentElement.clientHeight



    /**
     * 最开始页面的3个卡片
     */
    for (var i = 0; i < 3; i++) {
        kao()
    }


    /**
     * 创建dom节点
     */
    function kao(kpp) {
        var div = document.createElement('div')
        div.className = 'naishi'
        div.innerText = kpp ? kpp : ''
        var div1 = document.createElement('div')
        div1.className = 'nai'
        div1.innerHTML = 'x'
        div.appendChild(div1)
        zhong.DIV.appendChild(div)
        chuanjian(div)
        shijian(div, div1)
        weizhi(div)
    }



    /*
     *注册事件 
     */
    function shijian(div, div1) {
        div1.onclick = function () { //右上角点击删除
            div.remove()
        }

        div.onmousedown = function (e) { //注册拖拽功能
            if (e.button === 0) {
                var x = e.clientX
                var y = e.clientY
                var style = getComputedStyle(div)
                var left = parseFloat(style.left)
                var top = parseFloat(style.top)
                window.onmousemove = function (e) {
                    div.style.left = e.clientX - x + left + 'px'
                    div.style.top = e.clientY - y + top + 'px'
                }
                window.onmouseup = function (e) {
                    if (e.button === 0) {
                        window.onmousemove = null
                    }
                }
            }
        }
    }
    window.onresize = function () {
        var left = document.documentElement.clientWidth
        var top = document.documentElement.clientHeight
        test(left, top)

    }
    /* shijian()
     */


    function test(left, top) {
        Array.from(zhong.DIV.children).forEach(function (imgs) {
            var style = getComputedStyle(imgs)
            var l = parseFloat(style.left)
            var t = parseFloat(style.top)
        }).forEach(function (imo){
            
        })
    }




    /**
     * 随机颜色
     */
    function chuanjian(naishi) {
        naishi.style.backgroundColor = `rgb(${parseInt(Math.random() * (255-0)-0)},
         ${parseInt(Math.random() * (255-0)-0)},${parseInt(Math.random() * (255-0)-0)})`
    }

    /**
     * 随机位置
     */
    function weizhi(div) {
        var l = document.documentElement.clientWidth
        var t = document.documentElement.clientHeight
        var left = zhong.kati.kapiankuan
        var top = zhong.kati.kapiangao
        div.style.left = Math.random() * ((l - left) - 0) - 0 + 'px'
        div.style.top = Math.random() * ((t - top) - 0) - 0 + 'px'
    }




    zhong.inp.onclick = function () {
        zhong.inp.value = ''

        zhong.inp.onkeypress = function (e) {
            var inpt = document.querySelector('input')
            if (e.code === 'Enter' && inpt.value !== inpt.defaultValue) {
                if (inpt.value) {
                    kao(inpt.value)
                    inpt.value = inpt.defaultValue
                }
            }
            zhong.inp.value = ''
            inpt.value = inpt.defaultValue
        }

    }









}

zhongchushihua()