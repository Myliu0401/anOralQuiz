if (!window.obj) { //避免过度污染全局和多次调用的缺陷
    console.log('来料')
    obj = {}
}
obj.Pluginunit = (function () {
    var Mondiv //蒙层
    var DIV //中间div
    var shangdiv //第一div
    var disan //第三个div
    var dier //第二个div
    var boolean = true //开关

    /**
     * 执行提示框
     */
    function Pluginunit() {
        Mongolia()
        Boxdiv()
        tuozhuai()
        shijian()
    }


    /**
     * 初始化蒙层
     */
    function Mongolia() {

        if (!Mondiv) {
            //创建div
            Mondiv = document.createElement('div')
            //对div进行css样式,设置
            Mondiv.style.position = 'absolute'
            Mondiv.style.width = '100%'
            Mondiv.style.height = '100%'
            Mondiv.style.backgroundColor = 'rgba(0,0,0,.4)'
            Mondiv.style.left = 0
            Mondiv.style.top = 0

            //插进body元素
            document.body.appendChild(Mondiv)
        } else {
            Mondiv.style.display = 'block'
        }

    }


    /**
     * 中间div
     */
    function Boxdiv() {
        if (!DIV) {
            DIV = document.createElement('div')
            DIV.style.position = 'absolute';
            DIV.style.width = '250px'
            DIV.style.height = '150px'

            DIV.style.backgroundColor = '#fff'
            /*  DIV.style.left = 0
             DIV.style.right = 0
             DIV.style.top = 0
             DIV.style.bottom = 0
             DIV.style.margin = 'auto' */
            DIV.style.left = '400px'
            DIV.style.cursor = 'move'
            Otherdiv()
            Mondiv.appendChild(DIV)
        } else {
            DIV.style.display = 'block'
        }
    }

    /**
     * 中间div里面的其他内容
     */
    function Otherdiv() {

        shangdiv = document.createElement('div')
        shangdiv.style.height = '40px'
        shangdiv.style.backgroundColor = '#ccc'
        shangdiv.style.lineHeight = '40px'
        shangdiv.style.paddingLeft = '10px'
        shangdiv.style.boxSizing = 'border-box';
        shangdiv.innerHTML = `<span style='float:left'>信息</span>
        <span style='float:right;margin-top:-6px;cursor:pointer;
        margin-top: 3px;margin-right: 7px;
        }'><img style='width:18px;height:18px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABxklEQVRoQ+2ZMU4DMRBFX+5ESUGPCBWUlHADWuAY0CAooUNQU1FyjVyCBlmKUbLyrseev7sxykrpvJ73PGN7Yy9o/Fk0zs9eYO4MDmXgEgi/FXAPfEwMuwSugR/gEXhOxe8TuAVuOi+cA68TSZwBL51Yd0Dg2npSAhfAUw/oFBIp+IhzBTxssqUEPoGjgZEeU2IIPiB9Awc5gTfgJFMqY0jk4APSF3CYEzgG3g21rpSwwAekUyAM8N/TN4mtHSokXLGGllFXx4YMhibuGLmd2B1gQETSd05AMkoJCQl86NcioJaQwZcIqCSk8KUCXgk5fI1ArcQo8LUCpRKhfffDLLU4Ve0p1kmcCmgdVcuWUAXvyUCEUkhUwysESspJVjaWbyFL2jfb1GTCNfIxuGcOdCVLJCTwqhKqmQ87J1Ay+lFYIqEooRp4mYRXwAMvkfAIKODdErUCVvhQ5zv3KVECHw/Cat4x7UWlGfCAeN7tlSkRUAAo+tiSsQooAyv7Mv0nlgZcD5+sz1wGZIESRSzp+98ebElGx7QOOk/nUhlo/nC3+eP15i84mr9iCnOv6Uu+uHg0fc1qXAHnb5bbiecnzBDsBeZO0S8xrY4xYqJLbQAAAABJRU5ErkJggg=='></span>`
        DIV.appendChild(shangdiv) //第一个

        dier = document.createElement('div')
        dier.innerHTML = `<img style='height:99px;width:83px;height:63px;margin:0 33%;'
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAHpElEQVRoQ+1Zf4wcdRX/vNk9j9KYeEpVbCU1QNAoiXghKNfqtju73swWqK3X1J3Zo4AUsBEQLCJRS2MqRlGEatMChdKZ7a8Ta9ru7HV3tj0ilkKoQiBR0BIQA1YhiKGau9udZ76zO9vZvdkfvb1eSsL3j0tu33uffZ/ve9/3/b63hHf5one5/3iPwKmIYEzVrneI5hYy5u2t8E+7CMiLUvPg8O9cx4kesDPGymYkTisCCxcNzibHOUzAHJ/
        Tj2Js9BrbHno7iMhpRUBWU3sBXiQcZeYhIhooO00HHZSuOmBte0X8pyhXzRqXivPJcY5NioDcr0cgISIxHclljb2t8rQdeUzVf8bALWV/8aadMc+SVf0nAFZX7J8h4AiIPs/MnwbhNTtjzm6bgOc0GF8CIeLuEvBgwTKvbcfBZjoxNbWKwb/06VxtW+bD4v9oQvsGMf0qwP5O2zLXNiUQ5HQd0DHbMj/aKQFZ1dmHscG2zFV+zKiiLybCbgD/AjBLyEIlfGz/fvP1hgTiauoSB3w4wLkMmH8Dos2uzKH59rDxeCckagg4WGAPmyP1eJXN3OUSYBTsrCmXs63BkhPaN8F03wkx7SR21uez6d+Lz2Kq/
        ioDc4jww3zG/
        ME0EThYcTqZt8ztDQn09+sXFEP4Phiam+tO6dLC8PYnasKqag8TaAWAF5mk6wuZrS74yax4ItlbYmkTAb1VuwYREPJqpIi/Z2fS62oIyKq+DEzziLiXgYsAzKiAvmBb5icnhFTVkgClvc8ZdEfBMu5ql0A0oa8kxia/PgF5SM6q/L5tfwnCiam6xYBCoKfylnFJlUA8oV/qMNzUmLCIHrIzxjVBInG4QHwPgeZWwPYSaF3OMp5sRkRW9E0g1N6wvl0Nsh0YGJjx1vFuA8BSIbct001/94+c0I+A8bmyIf8ZoKcI+AMcfp4c6blczvhnI4cii1d8IDQ2LkiIdHIXAc86RDaVeJ//QMbjqZmlMD9WkzLAUTi0or4QxFT9OgbGRDlVFG1OkeghBmKVr/gjiDQ7Y/yJvny5fl6pCC9ka23LvLPdNPDrLVSTKwi0xouGT/Y3APvgYAgS6s4Jb7St9A313xdNaHcT063udoLuIPAVANyUAWOEuopafs+O16oRiKn6HgYuA3DUtszzJkNA2MxLJHu6HYoSIQpICYA/3gTrq7ZlPuqX9/au7Or5yH9FqVwcZMeE3aFxSuVyxnFftIGFiqZIRJbLSOIl+X1pcWl0vETtZkI/EZYAOL+yY4fGQ6UrRvZuf6MmgsqV50oo7QJ5qYy3APRUdRqcxeo9EFP1XDnHgsPaKRtZ1S4EaGmzFI1WSrN4yBWy6WUxRbuVib7FRDsKGePbQT74CGj3MuhGAg7lLbOvU4cnYx/pXz43TOEXQegC4J5HUSFzGfNQIzx/BMSp3wjCO8Xjo2ePjAy9MxknOrWRFe1aEN0vcLxS2QyzSiCuJr/oQHpMKDuEvgNNWHfqZDP7qKJrRDAZ/HLBSn+i1XdVCSjKwKxx6nbrPQPPMoeWHsg+crQVwFTLZVUXZXyNKJd21lzQCr/mMScr+iAIj1SMDodKWCKerK1AplruvXkIdHHeMp5uK4U8pZrmgjFS7A5/ZeS3W/491U42w6tGAbTTtozlJ0VAKEfV1HcJ/KOK4XAX9yzOZtePTjMJt8mRisVzcrkdr7asQvUKspq6C2B3LsOM3cTw9QZl7
        aDGQ1GU7mw22zFZLwoEvi9vpW86aQLCQE7oG8CY8FbxwBh0U8EyXGKRy752VlcpvJrBt7VT/tqJpncWemaOdg8NDY0F2bRs6mU1lQY42egLmXk5kaR74xA3MpWnbjtONtKJqvoDBHwdoFHbMs6YVAQaGcnK4EUgR/TBZwbpdEogpmh9TFTus4lvtDPp9VNKQIDFE6nlDrPblzJ4CzHN9cYtnRKQVf05AJ8B8JJtmeeedBVqN/TioHmPM1nRD04FgZiif4cJPy4XDx4oZNO/PmUE/MCyqosneOUdT7fYlnFPuxvh6S1IJHtDLJUvLsbjdtac3wqj5SFuBeDJY2rys0Aox+BZDPw9HMaC/XvMv7rzHMIafxdVjykvSp3DjnMbgUTFk1x5m/OmKSPgll1FuxlE5Z1nWk+CDOHETUpYbWfMu/0EKu2jcNxXEGpvYLEJQXeOe8bb3eF29WRV3wlgWRN9tyGHw1EQrwXogyd0aRSM+1kq/aKQ2faS+DyqaLuIKOJw6AtBj8spJyBSiSGJvtZtIUGwUMJPIWEDgE8FE+O3ifDz8VJp68jwjpc9nYrz5RE7Y08XepbVP2mmnIC7a6p+HYEVptC9/ondxHEl/gHGuuL/
        RrfUN1A1zpd3IrAwnBICzdItEomEwzNnb2BITxYyRnlAXLcmTu1oo20ZgU+aaSfQzlmKx1MfdsJ8rKL7Ao9KfYXC1jeDbKeVgKzoN4DojC52Nmez6f80IxNV9afFBC9osOy3mzYCfZdf/f4ZxTExf71Q3BMEbG46Ykno68jB63bW9P9yM4HztBGQVe12gLzp9RvF94XPb9bpxfq1aH44XWiVctNGIBod/
        BB18yCDrwTztkI2LX7A63hNG4GOPW0A8B6BU7Wz7eL+H1HTDYLJnP1vAAAAAElFTkSuQmCC'>`
        DIV.appendChild(dier) //第二个

        disan = document.createElement('div')
        disan.style.height = '20px'
        disan.style.padding = '7px'
        disan.style.textAlign = 'center'
        disan.innerHTML = `<button style='height:26px;margin-right:53px;width: 60px;;cursor:pointer;background-color:cornflowerblue; border: solid 1px;'>确定</button>
        <button style='height:26px;cursor:pointer;background-color:#ccc; border: solid 1px;width: 60px;'>取消</button>`
        DIV.appendChild(disan) //第三个
    }







    /**
     * 对中间div实行拖拽功能
     */
    function tuozhuai() {
        DIV.onmousedown = function (e) {
            if (e.button === 0) {
                if (e.target !== disan.children[0] && e.target !== disan.children[1] && e.target !== shangdiv.children[1].firstElementChild) {
                    var style = getComputedStyle(DIV)
                    var left = parseFloat(style.left)
                    var top = parseFloat(style.top)
                    var l = e.clientX
                    var t = e.clientY
                    window.onmousemove = function (k) {
                        var Y = k.clientY - t
                        var X = k.clientX - l
                        DIV.style.left = X + left + 'px'
                        DIV.style.top = Y + top + 'px'
                        //拖拽边界判定
                        var style = getComputedStyle(DIV)
                        var html = document.documentElement
                        var kp = parseFloat(getComputedStyle(DIV).width)
                        var kl = parseFloat(getComputedStyle(DIV).height)
                        if (parseFloat(style.left) < 0) {
                            DIV.style.left = '0px'
                        }
                        if (parseFloat(style.left) > html.clientWidth - kp) {
                            DIV.style.left = html.clientWidth - kp + 'px'
                            console.log(html.clientWidth - kp)
                        }
                        if (parseFloat(style.top) < 0) {
                            DIV.style.top = '0px'
                        }
                        if (parseFloat(style.top) > html.clientHeight - kl) {
                            DIV.style.top = html.clientHeight - kl + 'px'
                            console.log(html.clientHeight - kl)
                        }
                    }
                    window.onmouseup = function (e) {
                        if (e.button === 0) {
                            window.onmousemove = null
                        }
                    }
                }
            }
        }
    }


    /**
     * 注册事件
     */
    function shijian() {
        shangdiv.children[1].firstElementChild.onclick = function () {
            DIV.style.display = 'none'
            Mondiv.style.display = 'none'
            boolean = false

        }
        disan.children[0].onclick = function () {
            DIV.style.display = 'none'
        }
        disan.children[1].onclick = function () {
            DIV.style.display = 'none'
        }

    }


    return Pluginunit




}())