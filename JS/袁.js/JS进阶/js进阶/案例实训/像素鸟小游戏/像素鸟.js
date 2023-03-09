//游戏面板
var Game = {
    dom: document.querySelector('.DIVcontainer'), //游戏面板的dom元素
    Width: document.querySelector('.DIVcontainer').clientWidth, //游戏面板的宽度
    Height: document.querySelector('.DIVcontainer').clientHeight, //游戏面板的高度 
    mencheng: document.querySelector('.DIVcontainer .Mongolia'),
    boolean: true, //是否为暂停状态
    isboolean: false, //
    start: function () {
        syk.gozao.start()
        earth.gozao.start()
        littlebird.gozao.start()
        littlebird.fall.start()
        guanli.shengchan.start()
        guanli.yidong.start()
        collision.Coldetection.start()
    },
    suspend: function () {
        syk.gozao.suspend()
        earth.gozao.suspend()
        littlebird.gozao.suspend()
        littlebird.fall.suspend()
        guanli.shengchan.suspend()
        guanli.yidong.suspend()
        collision.Coldetection.suspend()
    },
}


//天空
var syk = {
    dom: document.querySelector('.DIVcontainer .Sky'), //天空的dom元素
    left: 0, //天空当前坐标位置

}

syk.gozao = new structure(16, syk, function () {
    syk.left--;
    if (syk.left === -Game.Width) {
        syk.left = 0
        console.log('到了')
    }
    syk.dom.style.left = syk.left + 'px'
})





/**
 * 构造函数
 * 1. trimg 计时器ID
 * 2. start 开始
 * 3. suspend 暂停
 * 4. who this的指向
 */
function structure(time, who, implement) {
    this.trimg = null; //ID
    this.start = function () { //开始
        if (this.trimg) {
            return
        }
        this.trimg = setInterval(implement.bind(who), time)
    };
    this.suspend = function () { //暂停
        clearInterval(this.trimg)
        this.trimg = null
    }
}


//大地
var earth = {
    dom: document.querySelector('.DIVcontainer .earth'), //大地的dom元素
    left: 0, //大地当前坐标位置/横坐标
    top: Game.Height - document.querySelector('.DIVcontainer .earth').clientHeight,
    Height: document.querySelector('.DIVcontainer .earth').clientHeight, //大地dom元素的高度
    Width: document.querySelector('.DIVcontainer .earth').clientWidth, //大地dom元素的宽度
}

earth.gozao = new structure(16, earth, function () {
    earth.left -= 2;
    if (earth.left === -Game.Width) {
        earth.left = 0
        console.log('到了')
    }
    earth.dom.style.left = earth.left + 'px'
})


//小鸟
var littlebird = {
    left: 130,
    top: 130,
    dom: document.querySelector('.DIVcontainer .littlebird'),
    Width: 33,
    Height: 26,
    Wing: 0, //第几个小鸟 1~3
    a: 0.002, //重力加速度
    v: 0, //当前速度
    t: 16, //时间间隔
    Wingstate: function () {
        if (this.Wing === 0) {
            this.dom.style.backgroundPosition = '96px -10px';
        } else if (this.Wing === 1) {
            this.dom.style.backgroundPosition = '149px -10px'
        } else {
            this.dom.style.backgroundPosition = '199px -10px'
        }
        this.dom.style.left = this.left + 'px'
        this.dom.style.top = this.top + 'px'
    },
    Heightofjudgement: function (top) { //判断小鸟的高度
        if (top < 0) {
            this.top = 0
        } else if (top > earth.top - littlebird.Height) {
            this.top = earth.top - littlebird.Height
        }
    },
    jump: function () {
        this.v = -0.5
    }
}
//翅膀计时器
littlebird.gozao = new structure(200, littlebird, function () {
    littlebird.Wing = (littlebird.Wing + 1) % 3
    this.Wingstate()
})

//下坠计时器
littlebird.fall = new structure(littlebird.t, littlebird, function () {
    //移动距离
    var juli = this.v * this.t + 0.5 * this.a * this.t ** 2
    //改变速度
    this.v = this.v + this.a * this.t

    //改变top值
    this.top += juli
    this.Heightofjudgement(this.top)
    this.Wingstate()
})



/**
 * 柱子
 * @param {*} naishi 柱子的方向
 * @param {*} height 柱子的高度
 */
function Column(naishi, height) {
    this.Width = Column.Width
    this.left = Game.Width
    this.dom = document.createElement('div')
    this.dom.className = 'column ' + naishi
    this.naishi = naishi
    this.height = height

    //纵坐标
    if (naishi === 'lower') {
        /* this.top = Game.Height - earth.Height */
        this.top = earth.top - height
    } else {
        this.top = 0
    }
    this.dom.style.height = height + 'px'
    this.dom.style.top = this.top + 'px'
    this.chuli()
    Game.dom.appendChild(this.dom)

}
Column.Width = 52
Column.prototype.chuli = function () {
    this.dom.style.left = this.left + 'px'
}


/**
 * 一对柱子
 */
function Apair() {
    this.zuixiao = 60
    this.konxi = 150
    this.zuida = earth.top - (this.zuixiao + this.konxi)
    this.vk = shuji(this.zuida, this.zuixiao)
    this.up = new Column('upper', earth.top - (this.vk + this.konxi))
    this.lo = new Column('lower', this.vk)
    this.left = this.up.left
}

/**
 * 显示柱子
 */
Apair.prototype.xianshi = function () {
    this.up.left = this.left
    this.lo.left = this.left
    this.up.chuli()
    this.lo.chuli()
}



/**
 * 随机数
 */
function shuji(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}



/**
 * 柱子管理器
 */
var guanli = {
    arr: [],
    sheng: function () {
        this.arr.push(new Apair())
    }
}

/**
 * 柱子生产计时器
 */
guanli.shengchan = new structure(1800, guanli, function () {
    this.sheng()
})


/**
 * 柱子移动计时器
 */
guanli.yidong = new structure(16, guanli, function () {
    this.arr.forEach(function (ind, i) {
        ind.left -= 2
        if (ind.left < -Column.Width) {
            console.log(i)
            ind.up.dom.remove()
            ind.lo.dom.remove()
            guanli.arr.splice(i, 1)
            /*  console.log(guanli.arr) */
        } else {
            ind.xianshi()
        }
    })
})



/**
 * 碰撞检测器
 */
var collision = {
    //检验是否碰撞。 true 为碰撞  false 为没有碰撞
    Testing: function () { //与大地发生碰撞
        if (littlebird.top >= earth.top - littlebird.Height) { //碰撞了
            return true
        } else {
            //检验是否与柱子发生碰撞
            for (var i = 0; i < guanli.arr.length; i++) {
                var k = guanli.arr[i]
                if (collision.hanshu(k.up) || collision.hanshu(k.lo)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
}


collision.hanshu = function (zhuzi) {
    var bx = littlebird.left + littlebird.Width / 2 //小鸟横坐标
    var by = littlebird.top + littlebird.Height / 2 //小鸟纵坐标
    var kx = zhuzi.left + zhuzi.Width / 2 //柱子的横坐标
    var ky = zhuzi.top + zhuzi.height / 2 //柱子的纵坐标
    if ((Math.abs(kx - bx) <= Math.abs(littlebird.Width / 2 + zhuzi.Width / 2)) &&
        (Math.abs(ky - by) <= Math.abs(littlebird.Height / 2 + zhuzi.height / 2))) {
        return true
    } else {
        return false
    }

}

collision.Coldetection = new structure(16, collision, function () {
    //检测是否碰撞
    if (this.Testing()) { //碰撞了
        Game.suspend()
        Game.mencheng.style.display = 'block'
        Game.isboolean = true
    }
})





//注册事件
window.onkeydown = function (e) {
    if (e.key === 'Enter' && Game.boolean) {
        Game.start()
        Game.boolean = false
    } else if (e.key === 'Enter' && !Game.boolean) {
        if (this.Game.isboolean) {
            location.reload()
            return;
        }
        Game.suspend()
        Game.boolean = true
    } else if (e.key === ' ') {
        littlebird.jump()
    }
}
