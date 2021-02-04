import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import echarts from 'echarts'
import VueCookies from 'vue-cookies'
import Print from 'vue-print-nb'
import EVueContextmenu from 'e-vue-contextmenu'

Vue.use(EVueContextmenu)
Vue.use(VueCookies)
Vue.use(Print) //注册
Vue.prototype.$echarts = echarts

// 上线需要配置
Vue.prototype.serviceUrl = 'http://localhost/e-invoice'
Vue.prototype.socketUrl = 'localhost:2000'
Vue.prototype.InvoiceImgUrl = 'http://localhost:5555'

// Vue.prototype.serviceUrl = 'http://101.132.130.71:2000/'
// Vue.prototype.socketUrl = '101.132.130.71:2000'
// Vue.prototype.InvoiceImgUrl = 'http://101.132.130.71:2001/ipfs'
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

// 程杰老版进项依赖内容
Vue.prototype.$ihttp = 'api/pc-web'
Vue.config.productionTip = false

new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),

  data() {
    return {
      orgs: [{ orgId: 2000 }, { orgId: 3000 }, { orgId: null }],
      org: { orgId: 3000 },
    }
  },
})
