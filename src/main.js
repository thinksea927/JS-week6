import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
// import './plugins/bootstrap-vue'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import jQuery from 'jquery'
import 'bootstrap'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import './bus'

// import validate套件
import { required, email } from 'vee-validate/dist/rules' // 把需要的rule匯入
import { ValidationObserver, ValidationProvider, configure, extend, localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'

// 全域註冊 validate component
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

window.$ = window.jQuery = jQuery

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// 全域註冊 loading component
Vue.component('Loading', Loading)

// validate
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
extend('required', required)
extend('email', email)
localize('tw', TW)

// Vue
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
