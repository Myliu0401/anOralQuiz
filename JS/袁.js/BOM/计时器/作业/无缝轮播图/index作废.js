var obj = {
    width: 520,
    heigth: 280,
    arr: document.getElementsByTagName('a'),
    but: document.getElementsByClassName('item'),
    img: document.getElementsByTagName('img'),
    div: document.getElementsByClassName('imgs')[0],
    count: 10,
}


/**
 * 总初始化
 */
function zhongchushihua() {



    /**
     * 注册事件
     */
    function shijian() {
        obj.div.style.width = '2600px'
        window.onclick = function (e) {
            var k = parseFloat(getComputedStyle(obj.div).marginLeft)
            var y = k + (document.documentElement.clientWidth - k - obj.width)
            if (e.target === obj.but[0]) {
                var trim = setInterval(function () {
                    if (obj.count === -obj.width) {
                        clearInterval(trim)
                        obj.width = obj.width + obj.width
                    }
                    obj.div.style.marginLeft = obj.count + 'px'
                    obj.count--
                })
            } else if (e.target === obj.but[1]) {
                obj.count = 0
                var trig = setInterval(function () {
                    if (obj.count === obj.width) {
                        clearInterval(trig)
                        obj.width = obj.width - obj.width
                    }
                    obj.div.style.marginLeft = obj.count + 'px'
                    obj.count++
                })
            }
        }
    }
    shijian()

}
zhongchushihua()