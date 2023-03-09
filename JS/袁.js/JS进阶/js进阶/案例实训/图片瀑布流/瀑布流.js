if (!this.Toconfigure) {
    Toconfigure = {}
}
Toconfigure.Waterfallflowmixing = function (object1) {
    var Objects = {
        minGap: 10, //最小间隙
        minV: 10, //为垂直的间隙
        imgSrcs: [], //图片路径的数组
        imgWidth: 220, //单张图片的宽度
        container: document.body //容器
    }
    var imgsarr = Object.assign({}, Objects, object1)
    var imgs = []
    console.log(imgsarr)

    /**
     * 创建img元素
     */
    function img(imgg) {
        //函数防抖
        var fando = Antishake(zuobiao, 30)

        //循环图片路径
        imgg.imgSrcs.forEach(function (imgh) {
            var ig = document.createElement('img')
            ig.src = imgh
            ig.style.width = imgg.imgWidth + 'px'
            ig.style.position = 'absolute'
            ig.style.transition = ".5s"
            imgg.container.appendChild(ig)
            ig.onload = fando

            //得到所有的img元素
            imgs.push(ig)
        })
    }
    img(imgsarr)


    /**
     * 设置父元素相对定位
     */
    function fuyuansu() {
        var style = getComputedStyle(imgsarr.container)
        if (style.position === 'static') {
            imgsarr.container.style.position = 'relative'
        }
    }
    fuyuansu()

    /**
     * 得到图片水平的信息
     */
    function shuipian() {
        var obj = {}
        //为div的内容区宽度
        obj.containerWidth = imgsarr.container.clientWidth;
        //计算出每列图片数量
        obj.umder = (obj.containerWidth + imgsarr.minGap) / (imgsarr.imgWidth + imgsarr.minGap)
        obj.umder = Math.floor(obj.umder)
        console.log(obj.containerWidth)
        //计算每个水平间隙的宽度
        //因为优先级问题所以要注意
        obj.naishi = (obj.containerWidth - obj.umder * imgsarr.imgWidth) / (obj.umder - 1)
        console.log(obj)
        return obj
    }



    /**
     * 设置图片的坐标
     */
    function zuobiao() { //因为涉及到图片异步加载的问题所以要到页面所有资源加载完成后调用
        console.log('进来了')
        var duixian = shuipian()
        var arr = new Array(duixian.umder)
        arr.fill(0) //第一行图片的top值都为0
        console.log(arr)
        imgs.forEach(function (img) {
            var zuixiaozhi = Math.min.apply(this, arr)
            //纵坐标
            img.style.top = zuixiaozhi + 'px'
            var i = arr.indexOf(zuixiaozhi)
            arr[i] += img.clientHeight + duixian.naishi

            //横坐标
            img.style.left = i * (imgsarr.imgWidth + duixian.naishi) + 'px'
        })

        //设置总边框
        var MAX = Math.max.apply(this,arr)
        console.log(MAX)
        imgsarr.container.style.height = MAX - duixian.naishi + 'px'

    }

    /* window.onload = function (){ //因为考虑到有可能页面有很多图片,导致隐患,所以为每个img元素都添加,加载完成时间
        zuobiao()                   //因为考虑到调用过多次问题,所以用函数防抖
    } */
    
    window.onresize = Antishake(zuobiao,300)

    /**
     * 函数防抖
     */
    function Antishake(fanshu, tigm) {
        var trimg
        return function () {
            clearTimeout(trimg)
            trimg = setTimeout(function () {
                fanshu()
            }, tigm)
        }
    }
}