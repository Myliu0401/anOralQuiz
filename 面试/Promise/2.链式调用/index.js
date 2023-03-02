

new Promise((resolve, reject) => { reject(new Error(123)) }).catch((err) => { })



// 下面代码的输出结果是什么
const pro1 = new Promise((resolve, reject) => { () => { setTimeout(() => { resolve(1) }, 1000) } })

const pro2 = pro1.then((data) => {
    console.log(data);  // 1
    return data + 1
})

const pro3 = pro2.then((data) => {
    console.log(data) // 2
})

console.log(pro1, pro2, pro3); // pro1等待状态， pro2等待状态， pro3等待状态  

setTimeout(() => {
    console.log(pro1, pro2, pro3) // pro1成功状态 数据1   pro2成功状态 数据2  pro3成功状态 数据undefined
}, 2000);



// 下面代码的输出结果是什么
new Promise((resolve, reject) => { resolve(1) }).then((da) => {
    console.log(da) // 1
    return 2
}).catch((err) => {
    return 3
}).then((da) => {
    console.log(da) // 2 
}); 



// 下面代码的输出结果是什么
new Promise((resolve, reject)=>{ resolve() }).then((ds)=>{
    console.log(ds.toString())
    return 2;
}).catch((err)=>{ 
    return 3 
}).then((ds)=>{
    console.log(ds) // 3
});


// 下面代码的输出结果是什么
new Promise((resolve, reject)=>{ throw new Error(1) }).then((ds)=>{
    console.log(ds)
    return new Error('2')
}).catch((err)=>{ 
    throw err
}).then((ds)=>{ console.log(ds) })


// 下面的代码输出什么

const promise1 = new Promise((resolve, reject)=>{ setTimeout(()=>{ reject() }, 1000) });

const promise2 = promise1.catch(()=>{ return 2 });

console.log(promise1); // 等待
console.log(promise2); // 等待
setTimeout(()=>{
    console.log(promise1)  // 失败
    console.log(promise2)  // 成功
}, 2000)