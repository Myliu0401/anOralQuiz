const MyButton = {
    data() {
        return {
            num:0
        }
    },
    template:`<button @click="num++">{{num}}</button>`
};


export default MyButton;