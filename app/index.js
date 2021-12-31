import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './routes';
import axios from './utils/axios';

Vue.prototype.$axios = axios;

const app = new Vue({
  el: '#app',
  store: store,
  router: router,
  render(h) {
    return h(App);
  }
});