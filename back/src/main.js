// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../src/assets/css/reset.css'
import axios from 'axios'
import store from './store/index'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://geniusdsy.cn'

Vue.use(ElementUI)
// Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
