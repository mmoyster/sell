// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// jshint esversion: 6
import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import VueResource from 'vue-resource';
import './common/css/index.css';

Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
