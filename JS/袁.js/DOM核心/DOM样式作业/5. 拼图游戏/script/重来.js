//总框架的基本信息
var total = {
    width: 500, //总宽度
    height: 500, //总高度
    hang: 3, //行
    lie: 3, //列
    boolean:false,
    div: document.getElementById('naishi'), //选中div标签
    dizhi: "./img/lol.png" //图片地址
}
total.xiaofan = total.hang * total.lie //小方块的总数
total.Blockheight = total.height / total.lie //小方块的高度
total.Blockwidth = total.width / total.hang //小方块的宽度

//===========================================================

/**
 * 初始化游戏
 */
function Chushi() {
    //----------------------------------------
    /**
     * 游戏的框架,最外层的div信息
     */
    function zuiDiv() {
        total.div.style.width = total.width + 'px' //宽度
        total.div.style.height = total.height + 'px' //高度
        total.div.style.border = 'solid 2px #008c8c' //边框
        total.div.style.margin = 'auto' //居中
        total.div.style.position = 'relative' //绝对定位
    }
    zuiDiv()
    //----------------------------------------
    var arr = [] //声明一个数组,用来装小方块
    var boolean //声明一个开关
    //----------------------------------------
    /**
     * 记录小方块的信息,并push进数组
     */
    function jilu() {
        for (var i = 0; i < total.hang; i++) { //行
            for (var j = 0; j < total.lie; j++) { //列  
                if (i === total.hang - 1 && j === total.lie - 1) {
                    boolean = true
                }
                //j表示横坐标       i表示纵坐标
                arr.push(new gozhao(total.Blockheight * j, total.Blockwidth * i, boolean))
                console.log('进来了')
            }
        }
    }
    jilu()
    //-----------------------------------------

    //-----------------------------------------
    /**
     * 构造函数,生成东西
     */
    function gozhao(weizhiX, weizhiY, boolean) {
        this.left = weizhiX //横坐标
        this.top = weizhiY //纵坐标
        this.Left = weizhiX //固定横坐标
        this.Top = weizhiY //固定纵坐标

        this.boolean = boolean
        this.dom = document.createElement('div') //创建每个小方块的div
        this.dom.style.width = total.Blockwidth + 'px' //每个小方块的宽度
        this.dom.style.height = total.Blockheight + 'px' //每个小方块的高度
        this.dom.style.background = `url('${total.dizhi}') -${this.Left}px -${this.Top}px` //每小块分割的图片
        total.div.appendChild(this.dom)
        this.dom.style.position = 'absolute'
        this.dom.style.left = weizhiX + 'px'
        this.dom.style.top = weizhiY + 'px'
        this.dom.style.border = 'solid 1px #008c8c'
        this.dom.style.boxSizing = 'border-box'
        this.dom.style.cursor = "pointer";
        this.luan = function (left, top) {
            this.dom.style.left = this.left + 'px'
            this.dom.style.top = this.top + 'px'
        }
        if (boolean) {
            this.dom.style.display = 'none'
        }
        this.naihsi = function () {
            return zhuanhuan(this.left, this.Left) && zhuanhuan(this.top, this.Top)
        }

    }
    //------------------------------------------

    //------------------------------------------
    /**
     * 交换两个方块的left和top
     * @param {*} b1 
     * @param {*} b2 
     */
    function exchange(b1, b2) {
        var temp = b1.left;
        b1.left = b2.left;
        b2.left = temp;

        temp = b1.top;
        b1.top = b2.top;
        b2.top = temp;

        b1.luan();
        b2.luan();
    }
    //--------------------------------------------

    //------------------------------------------
    /**
     * 生成随机数
     */
    function getRandom(min, max) {
        var dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }

    /**
     * 把数组里的dom对象里的div的位置打乱
     */
    function luanx() {
        for (var i = 0; i < arr.length; i++) {
            var index = getRandom(0, arr.length - 1)
            console.log(index)
            exchange(arr[i], arr[index]); //调用打乱的函数
        }

    }
    luanx()
    //--------------------------------------------

    //--------------------------------------------
    function zhuanhuan(D, G) {
        return parseInt(D) === parseInt(G)
    }
    //------------------------------------------

    //--------------------------------------------
    /**
     * 给每个div添加事件
     */
    function dianji() {
        var kop = arr.find(function (niu) {
            return niu.boolean
        })
        console.log(kop)
        arr.forEach(function (dian) {
            dian.dom.onclick = function () {
                if(total.boolean){
                    return
                }
                if (
                    dian.top === kop.top && zhuanhuan(Math.abs(dian.left - kop.left), total.Blockheight) ||
                    dian.left === kop.left && zhuanhuan(Math.abs(dian.top - kop.top), total.Blockwidth)
                ) {
                    exchange(dian, kop)
                }
                shif()
            }
        })


    }
    dianji()
    //---------------------------------------------

    //----------------------------------------------

    /**
     * 判断游戏是否结束
     */
    function shif() {
        var opl = arr.filter(function (ims) {
            return !ims.naihsi()
        })
        console.log(opl.length)
        if (opl.length === 0) {
            total.boolean = true
           arr.forEach(function(ims){
               ims.dom.style.display = 'block'
               ims.dom.style.border = 'none'
           })
        }
    }

    //-----------------------------------------------

    console.log(arr)
}
Chushi()