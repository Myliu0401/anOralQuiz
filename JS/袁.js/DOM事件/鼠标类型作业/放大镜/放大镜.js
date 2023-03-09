//总信息
var Zhong = {
    div1: document.getElementById('DIV'),
    div2: document.getElementById('div'),
    divyi: document.getElementById('yi'),
    xiaotu: "./img/mouse.jpg", //小图地址
    datu: './img/mouseBigSize.jpg', //大图地址
    xiaodivgao: 300, //小div高
    xiaodivkuan: 300, //小div宽
    dadivgao: 500, //大div高
    dadivkuan: 500, //大div宽
    datugao: 800,
    datukuan: 800,
}
//移动的div的宽高
Zhong.yidivleft = Zhong.dadivkuan / Zhong.datugao * Zhong.xiaodivkuan
Zhong.yidivtop = Zhong.dadivgao / Zhong.datugao * Zhong.xiaodivgao



/**
 * 总初始化
 */
function Zhongnaishi() {




    /**
     * 
     *初始化div
     */
    function chushihoudiv() {
        Zhong.div1.style.background = `url(${Zhong.xiaotu}) no-repeat left top/100% 100%`
        Zhong.div2.style.background = `url(${Zhong.datu}) no-repeat`
    }
    chushihoudiv()



    /**
     * 小div的移入事件
     */
    function initDivSmallEvent() {
        Zhong.div1.onmouseenter = function () {
            Zhong.divyi.style.display = "block";

        }
        Zhong.div1.onmouseleave = function () {
            Zhong.divyi.style.display = "none";
            Zhong.divyi.style.display = "none";
        }

        Zhong.div1.onmousemove = function (e) {
            var offset = getOffset(e);
            zuobiao(offset);
            setBigBgPosition();
        }
    }
    initDivSmallEvent()


    /**
     * 可移动的div
     */
    function yidong() {
       /*  Zhong.divyi.style.display = 'block' */
        Zhong.divyi.style.width = Zhong.yidivleft + 'px'
        Zhong.divyi.style.height = Zhong.yidivtop + 'px'
    }
    yidong()


    /**
     * 最后的坐标
     */
    function zuobiao(naishi) {
        var left = naishi.x - Zhong.yidivleft / 2
        var top = naishi.y - Zhong.yidivtop / 2
        Zhong.divyi.style.left = left + 'px'
        Zhong.divyi.style.top = top + 'px'
    }


    /**
     * 计算鼠标移动距离
     * @param {MouseEvent} e
     */
    function getOffset(e) {
        if (e.target === Zhong.div1) {
            return {
                x: e.offsetX,
                y: e.offsetY
            }
        } else {
            //事件源是divMove
            var style = getComputedStyle(Zhong.divyi);
            var left = parseFloat(style.left);
            var top = parseFloat(style.top);
            return {
                x: e.offsetX + left + 1, //加1是因为边框
                y: e.offsetY + top + 1
            }
        }
    }

}
Zhongnaishi()