//总框架信息
var headquarters = {
    width: 500,
    height: 500,
    That: 3, //行
    column: 3, //列
    //获取div标签
    div: document.getElementById('naishi'),
    //图片地址
    address: "./img/1naishi.png"
}
//每小块的宽度
headquarters.Width = headquarters.width / headquarters.That,
    //每小块的高度
    headquarters.Height = headquarters.height / headquarters.column,
    //小块的数量
    headquarters.Numder = headquarters.That * headquarters.column
/* console.log(headquarters) */

//声明数组要来装每个小放块的信息
var information = []
/* console.log(information) */


//构造函数,要来正确坐标位置
function ConstruCtor(left, top, boolean) {
    this.left = left
    this.top = top
    this.CorrectLeft = left //正确位置
    this.CorrectTop = top //正确位置

    this.dom = document.createElement('div')
    this.dom.style.width = headquarters.Width + 'px'
    this.dom.style.height = headquarters.Height + 'px'
    this.dom.style.background = `url('${headquarters.address}') -${this.CorrectLeft}px -${this.CorrectTop}px`
    headquarters.div.appendChild(this.dom)
    this.dom.style.position = 'absolute'
    this.dom.style.border = 'solid 1px #008c8c'
    this.dom.style.boxSizing = 'border-box'
    //每个小方块鼠标移上去都是小手
    this.dom.style.cursor = 'pointer'

    this.absolute = function (boolean) {
        this.dom.style.left = left + 'px'
        this.dom.style.top = top + 'px'
        /* console.log(this.dom.style.left)
        console.log(this.dom.style.top) */
        if (boolean) {
            console.log('来了')
            console.log(left + '@')
            console.log(top + '@')
        }
    }
    this.absolute()
    //最后一个隐藏
    if (boolean) {
        this.dom.style.display = 'none'
    }

}

/**
 * //初始化游戏
 */
function Initialization() {




    /**
     * 设置最外层div
     */
    function Waidiv() {

        //高度
        headquarters.div.style.width = headquarters.width + 'px'
        //宽度
        headquarters.div.style.height = headquarters.height + 'px'
        //边框
        headquarters.div.style.border = 'solid 2px #008c8c'
        //左右居中
        headquarters.div.style.margin = 'auto'
        //绝对定位
        headquarters.div.style.position = 'relative'
    }
    Waidiv()

    /**
     * 记录小方块信息并push进数组
     */
    function Smallcube() {
        //循环行和列,得到每个小方块
        for (var i = 0; i < headquarters.That; i++) { //行
            for (var j = 0; j < headquarters.column; j++) { //列
                //判断最后一个,把最后一个隐藏
                var boolean
                if (i === headquarters.That - 1 && j === headquarters.column - 1) {
                    var boolean = true
                }
                information.push(
                    /* left: headquarters.Width * j, //宽度 (横坐标)
                    top: headquarters.Height * i, //高度 (纵坐标) */
                    new ConstruCtor(headquarters.Width * j, headquarters.Height * i, boolean)
                )
            }
        }
    }
    Smallcube()


    /**
     * 打乱排序
     */
    function test() {
        for (var i = 0; i < information.length - 1; i++) {
            var index = parseInt(Math.random() * (information.length - 0) + 0)
            var temp = information[i].left
            information[i].left = information[index].left
            console.log(information[i].left)
            information[i].left = temp

            temp = information[i].top
            information[i].top = information[index].top
            information[i].top = temp
            information[i].absolute()
        }
    }
    test()

}
Initialization()
console.log(information)