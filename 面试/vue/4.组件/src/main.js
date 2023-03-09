import app from './App.js';

const vm = new Vue({
    render(h) {
        return h(app); //h函数可以对vue的配置对象或组件配置对象进行解析生成虚拟dom
    },
}).$mount('#app');