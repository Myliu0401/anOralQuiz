if (!this.Animationplug) {
    Animationplug = {}
}
Animationplug.Mixedobject = function (configuration) {
    //进行混合对象(配置)
    //默认的配置
    var Modeconfiguration = {
        //以毫秒为单位
        totaltime: 1000, //默认总时间
        timeinterval: 16, //默认每隔一段时间
        initial: {}, //默认初始值
        target: {}, //默认目标值
    }
    this.obj = Object.assign({}, Modeconfiguration, configuration)
    this.obj.trmg = null; //计时器的id

    //总运动次数
    this.obj.generalmovement = Math.ceil(this.obj.totaltime / this.obj.timeinterval)
 
    //当前运动次数
    this.obj.current = 0

    //当前状态,于初始值一样,但不能地址一样,因为每次运动后当前状态都不一样
    //利用克隆
    this.obj.currentstate = Clone(this.obj.initial, true)

    //运动的总距离
    //所有属性
    this.obj.Totaldistance = {}
    for (var prop in this.obj.target) {
        this.obj.Totaldistance[prop] = this.obj.target[prop] - this.obj.initial[prop]
    }

    //所有属性每次运动的距离
    this.obj.Eachdistance = {}
    for (var prop in this.obj.Totaldistance) {
        this.obj.Eachdistance[prop] = this.obj.Totaldistance[prop] / this.obj.generalmovement
    }

    console.log(this.obj)
}
//动画的开关：开
this.Animationplug.Mixedobject.prototype.open = function () {
    if (this.obj.trmg || this.obj.generalmovement===this.obj.current) {
        return;
    };

    if (this.obj.start){
       this.obj.start()
    }

        //因为this在计时器里的问题所以可在外面获取this给计时器里面使用
        var Mythis = this
    this.obj.trmg = setInterval(function () {
        this.naishi.obj.current++
        //改变当前状态
        for (var prop in Mythis.obj.currentstate) {
            if (Mythis.obj.current === Mythis.obj.generalmovement) {
                //最后一次运动
                Mythis.obj.currentstate[prop] = Mythis.obj.target[prop]
            }
            else {
                Mythis.obj.currentstate[prop] +=  Mythis.obj.Eachdistance[prop];
               
            }
           
        }

        
        if (this.naishi.obj.current === this.naishi.obj.generalmovement) {
            this.naishi.shut()
            Mythis.obj.current = 0

            //变为最终准确的值
           /*  for (var prop in Mythis.obj.currentstate) {
                Mythis.obj.currentstate[prop] = Mythis.obj.Totaldistance[prop]
            } */
        }
        
        if(Mythis.obj.Motionfunc){
            Mythis.obj.Motionfunc.call(Mythis.obj.currentstate)
        }

    }, this.obj.timeinterval)
    /* console.log('开') */
}

//关
this.Animationplug.Mixedobject.prototype.shut = function () {
    if(this.obj.Close){
      this.obj.Close()
    }
    clearTimeout(this.obj.trmg)
    this.obj.trmg = null
    /* console.log('关') */
}


/**
 * 克隆
 */
function Clone(obj, boolean) {
    console.log('aa')
    if (typeof (obj) === 'object') {
        if (Array.isArray(obj)) {
            var arr = []
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr[prop] = boolean ? Clone(obj[prop], boolean) : obj[prop]
                }
            }
            return arr
        } else {
            var obj1 = {}
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    obj1[prop] = boolean ? Clone(obj[prop], boolean) : obj[prop]
                }
            }
            return obj1
        }
    } else {
        return obj
    }
}