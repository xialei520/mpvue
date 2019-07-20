import Vue from "vue";
import App from "./app";
// import store from './store/store'
import 'mpvue-weui/src/style/weui.css';
//设置vue的提示功能关闭
Vue.config.productionTip = false;
 
//声明当前组件类型
App.mpType = 'app'; //应用

//将store对象放置vue的原型上, 为的是每个实例都可以使用
// Vue.prototype.$store = store;

const app = new Vue(App);

//挂载整个应用
app.$mount();

