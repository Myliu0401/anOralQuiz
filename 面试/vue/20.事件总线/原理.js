//事件总线
const eventBus = {

};

export default {

    //监听事件
    $on(eventName, Callback) {
        if (!eventBus[eventName]) {
            eventBus[eventName] = [];
        }
        eventBus[eventName].push(Callback);
    },


    //取消监听
    $off(eventName, Callback) {
        if (!eventBus[eventName]) {
            return;
        } else {
            //删除数组中该函数
            eventBus[eventName].splice(eventBus[eventName].indexOf(Callback), 1);
        }

    },


    //触发事件
    $emit(eventName, data) {
        if (!eventBus[eventName]) {
            return;
        }

        for (let Callback of eventBus[eventName]) {
            Callback(data)
        }
    }
};