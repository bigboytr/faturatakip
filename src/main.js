import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import bootstrap from 'bootstrap'

Vue.config.productionTip = false;

firebase.initializeApp(store.getters.getConfig);

import '@/assets/css/_style.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
