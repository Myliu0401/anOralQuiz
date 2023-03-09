/**
 * 得到每个tr
 * @param {*} tr 
 */
function deaotr() {
    var zhongtr = document.querySelectorAll('tbody tr[id^=product]') //tbody元素里面的ID以product开头tr元素
    Array.from(zhongtr).forEach(function (imgs) {
        duixiang(imgs)
    })
}




/**
 * 得到某行的总价
 */
function duixiang(tr) {
    var naishi = xinxi(tr)
    var zhongjia = naishi.shulian * naishi.yuan
    tr.querySelector('.cart_td_7').innerText = zhongjia.toFixed(2)
}
/* duixiang(document.getElementById('product1')) */


/**
 * 得到某行的总信息
 */
function xinxi(tr) {
    var boolean = tr.querySelector('.cart_td_1 input').checked
    var jifen = Number(tr.querySelector('.cart_td_4').innerText)
    var yuan = Number(tr.querySelector('.cart_td_5').innerText)
    var shulian = Number(tr.querySelector('.cart_td_6 input').value)
    var zuizhong = Number(tr.querySelector('.cart_td_7').innerText)
    return {
        boolean,
        jifen,
        yuan,
        shulian,
        zuizhong,
    }
}

var zuizhongzhongjain = document.getElementById('total')
var zuizhongjifen = document.getElementById('integral')



/**
 * 得到所有的总价
 */
function shouyou() {
    var sum = 0
    var fen = 0
    var zhongtr = document.querySelectorAll('tbody tr[id^=product]') //tbody元素里面的ID以product开头tr元素
    Array.from(zhongtr).forEach(function (imgs) {
        var naishi = xinxi(imgs)
        if (naishi.boolean) {
            sum += naishi.zuizhong
            fen += naishi.shulian * naishi.jifen
        }
    })
    zuizhongzhongjain.innerText = sum.toFixed(2)
    zuizhongjifen.innerText = fen
}


//注册事件
window.onclick = function (e) {
    if (e.target.alt === 'add') { //加1
        var input = e.target.previousElementSibling
        aohe(input, 1)
    } else if (e.target.alt === 'minus') { //减1
        var input = e.target.nextElementSibling
        aohe(input, -1)
    } else if (e.target.name === 'cartCheckBox') { //单项选择按钮
        var zhongtr = document.querySelectorAll('tbody tr td input[name=cartCheckBox]')
        chuli(zhongtr)
    } else if (e.target.id === 'allCheckBox') { //全选按钮
        var zhongtr = document.querySelectorAll('tbody tr td input[name=cartCheckBox]')
        onhe(zhongtr, e.target.checked)
    } else if (e.target.alt === 'delete') { //删除按钮
        var zhongtr = document.querySelectorAll('tbody tr[id^=product]')
        jianjie(zhongtr)
    } else if (e.target.innerText === '删除' && e.target.parentElement.tagName === 'TD') {
        danshan(e.target.parentElement.parentElement)
    }
}

//处理代码耦合
function aohe(input, sum) {
    if ((Number(input.value) + sum) < 0) {
        sum = 0
    }
    input.value = Number(input.value) + sum
    jisuan()
}

//处理耦合
function onhe(zhongtr, boolean) {
    Array.from(zhongtr).forEach(function (imgs) {
        imgs.checked = boolean
    })
    jisuan()
}

//处理
function chuli(zhongtr) {
    var boolean = Array.from(zhongtr).find(function (i) {
        return i.checked === false
    })
    if (boolean) {
        document.getElementById('allCheckBox').checked = false
    } else {
        document.getElementById('allCheckBox').checked = true
    }
    jisuan()
}

//删除选中的
function jianjie(zhongtr) {
    Array.from(zhongtr).forEach(function (imgs) {
        if (imgs.querySelector('input').checked === true) {
            imgs.previousElementSibling.remove()
            imgs.remove()
        }
    })
    jisuan()
}

//单删
function danshan(e){
   e.previousElementSibling.remove()
   e.remove()
   jisuan()
}


//计算
function jisuan() {
    deaotr()
    shouyou()
}
jisuan()