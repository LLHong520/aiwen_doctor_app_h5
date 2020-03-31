// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import $ from "n-zepto";
import FastClick from "fastclick-vue";
import VueAwesomeSwiper from "vue-awesome-swiper";

import {
  Dialog,
  NavBar,
  SwipeCell,
  Button,
  Cell,
  CellGroup,
  Field,
  Toast,
  Picker,
  Grid,
  GridItem,
  Popup,
  Sticky,
  ImagePreview,
} from "vant";
$(function () {
  FastClick.attach(document.body);
});

import "@/assets/css/common.css";
import "@/common/common.js";
import "@/common/iwenJSNativeBridge.js";
import mToast from "@/common/toast.js";

Vue.use(NavBar);
Vue.use(Dialog);
Vue.use(SwipeCell);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Grid).use(GridItem);
Vue.use(Popup);
Vue.use(Sticky);
Vue.use(ImagePreview);

Vue.use(mToast, {});
Vue.use(VueAwesomeSwiper);
Vue.use(Picker);
Vue.use(ImagePreview);

Vue.config.productionTip = false;
/* eslint-disable no-new */
var app = new Vue({
  // el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

$(function () {
  setTimeout(function () {
    var loadingAnim = document.getElementById("loading_app");
    setTimeout(function () {
      try {
        loadingAnim.style.display = "none";
      } catch (error) {
        console.log("");
      }
    }, 310);
  }, 500);
  console.log("绑定并启动");
  app.$mount("#app");
});

