import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import { createRouter } from './router'
import { createStore } from './store'

const router = createRouter()
const store = createStore()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
