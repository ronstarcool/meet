import Vue from 'vue';
// import VueSocketIOExt from 'vue-socket.io-extended';
// import io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


// const socket = io('http://localhost:4000');

// Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
