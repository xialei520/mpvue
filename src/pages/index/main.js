import Vue from "vue";
import Index from "./index.vue";

import '@/js/app'

Vue.prototype.$app = getApp();

const index = new Vue(Index);
index.$mount();