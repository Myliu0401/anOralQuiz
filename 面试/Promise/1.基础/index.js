

function sendMessage(name, success, fail) { 
    setTimeout(() => {
        Math.random() <= 0.4 ? success(true) : fail(false);
    }, 1000)
};


// 回调地狱
sendMessage('', () => { }, () => {
    sendMessage('', () => { }, () => {
        sendMessage('', () => { }, () => {
            sendMessage('', () => { }, () => { })
        })
    })
});







const pro = new Promise((resolve, reject) => {
    // 这个函数为同步，会被立即执行
})

pro.then(() => { }, () => { }).then(() => { }, () => { })




function sendMessage1(name) {
    return new Promise((resolve, reject) => {
        Math.random() <= 0.4 ? resolve(true) : reject(false)
    })
};

sendMessage1('').then(() => { }, () => { }).then(() => { }, () => { }).then(() => { }, () => { })



/**
 * 延迟一段指定的时间
 * @param {number} duration  等待的时间
 * 返回一个任务，该任务在指定的时间后完成 
 */
function delay(duration) {
    return new Promise((resolve, reject) => { setTimeout(() => { resolve() }, duration) })
}

delay(1000).then(() => { console.log('finish') })


/* 
   根据指定的图片路径，创建一个img元素
   该函数需要返回一个Promise,当图片加载完成后，任务完成，若图片加载失败，任务失败
   任务完成后，需要提供的数据是图片DOM元素，任务失败时，需要提供失败的原因
   提示  img元素有两个事件，load事件会在图像加载完成时触发，errror事件会在图像加载失败时触发


   使用createImage函数创建一个图像元素，图像路径自行定义
   当图像成功加载后，将图像元素加入到container容器中，当图像加载失败后，输出加载失败的原因

*/

function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url
        img.onload = () => { resolve(img) }
        img.onerror = (err) => { reject(err) }
    })
}

createImage('').then((img) => { document.querySelector('.container').appendChild(img) }, (err) => { console.log(err) })



/* 
    远程加载省份数据
    函数返回一个Promise 成功后得到省份数组，失败时会给予失败原因

*/
function getProvinces() {
    return fetch('').then((data) => { return data.json() }).then((data) => { return data })
}




// 下面的任务最终状态是什么，相关的数据或失败原因是什么，最终输出什么

new Promise((resolve, reject) => {
    console.log('==')
    resolve(1)
    reject(2)
    resolve(3)
    console.log('++')
}) // 状态 成功，数据1

new Promise((resolve, reject) => {
    console.log('===')
    resolve(1)
    resolve(2)
    console.log('+++')
}) // 状态成功 数据1