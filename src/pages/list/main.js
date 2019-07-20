import Vue from "vue";
import List from "./list.vue";
import '@/js/app'

Vue.prototype.$app = getApp();
const list = new Vue(List);
list.$mount();