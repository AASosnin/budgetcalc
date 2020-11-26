import Vue from 'vue'
import store from './store'
import router from './routes'
import './plugins/elements'
import App from './App.vue'

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')