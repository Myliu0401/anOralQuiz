const promise11 = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});

promise11.then(() => {
    console.log(3);
});

console.log(4);

//  1   2   4   3






setTimeout(() => {
    console.log(1);
});

const promise = new Promise((resolve, reject) => {
    console.log(2);
    resolve();
});

promise.then(() => {
    console.log(3);
});

console.log(4);

// 2   4   3    1







const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject();
    }, 1000);
});
const promise2 = promise1.catch(() => {
    return 2;
});

console.log('promise1', promise1);   // 等待
console.log('promise2', promise2);   // 等待

setTimeout(() => {
    console.log('promise1', promise1);  // 失败 undefined
    console.log('promise2', promise2);  // 成功 2
}, 2000);







async function m() {
    console.log(0);
    const n = await 1;
    console.log(n);
}

// function m() {
//   return Promise.resolve(1).then((n) => {
//     console.log(n);
//   });
// }

m();
console.log(2);

// 0  2   1






async function m() {
    console.log(0);
    const n = await 1;
    console.log(n);
}

(async () => {
    await m();
    console.log(2);
})();

console.log(3);

// 0  3   1   2







async function m1() {
    return 1;
}

async function m2() {
    const n = await m1();
    console.log(n);
    return 2;
}

async function m3() {
    const n = m2();
    console.log(n);
    return 3;
}

m3().then((n) => {
    console.log(n);
});

m3();

console.log(4);

//  等待  等待   4   1  3  1  



Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// 1



var a;
var b = new Promise((resolve, reject) => {
    console.log('promise1');
    setTimeout(() => {
        resolve();
    }, 1000);
})
    .then(() => {
        console.log('promise2');
    })
    .then(() => {
        console.log('promise3');
    })
    .then(() => {
        console.log('promise4');
    });

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log('after1');
    await a;
    resolve(true);
    console.log('after2');
});

console.log('end');

// promise1  undefined  end   promise2   promise3    promise4  等待  after1





async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
console.log('script end');


/* 
   script start     
   async1 start    
   async2    
   promise1   
   script end  
   async1 end    
   promise2   
   setTimeout


*/