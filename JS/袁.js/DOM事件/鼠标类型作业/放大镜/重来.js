//总信息
var total = {
    xiaotuzhi: "./img/mouse.jpg", //小图地址
    datuzhi: './img/mouseBigSize.jpg', //大图地址
    DIV: document.getElementById('DIV'), //小div
    div: document.getElementById('div'), //图的div
    dadiv: document.getElementById('dadiv'), //dadiv
    xiaodivkuan: 300, //小div宽
    xiaodivgao: 300, //小div高
    dadivkuan: 500, //大div宽
    dadivgao: 500, //大div高
    datukuan: 800, //大图宽
    datugao: 800, //大图高
}
//移动div的宽高
total.width = total.dadivkuan / total.datukuan * total.xiaodivkuan //宽
total.height = total.dadivgao / total.datugao * total.xiaodivgao //高


/**
 * 总初始化
 */
function totalchu() {

    //-----------------------------
    /**
     * 初始化移动div
     */
    function yindongdiv() {
        total.div.style.width = total.width + 'px'
        total.div.style.height = total.height + 'px'
    }
    yindongdiv()
    //----------------------------
    //=============================================//
    //-------------------------------
    /**
     * 初始化小和大div的图片
     */ //公式:移动div的公式
    function divtu() {
        total.DIV.style.background = `url(${total.xiaotuzhi}) no-repeat left top/100% 100%`
        total.dadiv.style.background = `url(${total.datuzhi}) no-repeat`
    }
    divtu()
    //--------------------------------

    //================================================//
    //---------------------------------
    /**
     * 事件
     */
    function shijian() {
        total.DIV.onmouseenter = function (e) {
            total.div.style.display = 'block'
            total.dadiv.style.display = 'block'
        }
        total.DIV.onmouseleave = function (e) {
            total.div.style.display = 'none'
            total.dadiv.style.display = 'none'
        }
        total.DIV.onmousemove = function (e) {
            var XY = paduan(e)
            fuzhi(XY)
            dadivhetu()
        }
    }
    shijian()
    //---------------------------------
    //============================================//
    //--------------------------------
    /**
     *  判断事件源
     *  @param {MouseEvent} e
     */
    function paduan(e) {
        if (e.target === total.DIV) {
            return {
                x: e.offsetX,
                y: e.offsetY
            }
        } else {
            var style = getComputedStyle(total.div)
            var x = parseFloat(style.left)
            var y = parseFloat(style.top)
            return {
                x: e.offsetX + x,
                y: e.offsetY + y
            }
        }
    }
    //--------------------------------
    //========================================//
    //--------------------------------
    /**
     * 对移动div进行赋值
     */
    function fuzhi(e) {
        var left = e.x - total.width / 2 //因为除号优先级比将号高,所以先算除号
        var top = e.y - total.height / 2
        if (left < 0) {
            left = 0
        }
        if (top < 0) {
            top = 0
        }
        if (left > total.xiaodivkuan - total.width) { //最大的left不能大于(小div的宽减移动div的宽)
            left = total.xiaodivkuan - total.width //因为要赋值给移动div的left
        }
        if (top > total.xiaodivgao - total.height) {
            top = total.xiaodivgao - total.height
        }
        total.div.style.left = left + 'px'
        total.div.style.top = top + 'px'
    }

    /* 
       原理:
          因为移动的方块面积与小图片div面积的差异所以要先算出小方块面积的中心点
          再用事件源到小图片div的边框距离将掉(小方块的边框到小方块中心点的距离) 
          再赋予left和top距离
    */
    //---------------------------------
    //================================================//
    //-----------------------------------
    /**
     * 对大div和大图进行计算
     */ //公式：计算大div在大图的公式
    function dadivhetu() {
        var style = getComputedStyle(total.div)
        var x = parseFloat(style.left)
        var y = parseFloat(style.top)
        var left = x / total.xiaodivkuan * total.datukuan + 'px'
        var top = y / total.xiaodivgao * total.datugao + 'px'
        total.dadiv.style.backgroundPosition = `-${left} -${top}`;
    }
    //-----------------------------------

}
totalchu()