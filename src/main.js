import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios";

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

require('echarts-wordcloud')

import './assets/public.css'
import './assets/icon/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = Axios;

Vue.prototype.baseUrl = "http://139.196.78.182:8620";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
