import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import 'amfe-flexible' // 可伸缩布局
import '../src/static/js/util/rem' // px2rem

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
