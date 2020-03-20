import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import DataBrowsing from '../views/DataBrowsing.vue'
import HotShaftWarning from '../views/HotShaftWarning.vue'
import StatisticalReports from '../views/StatisticalReports.vue'
import MaintenanceServices from '../views/MaintenanceServices.vue'
import TemperatureRiseForecast from '../views/TemperatureRiseForecast.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/databrowsing',
    name: 'DataBrowsing',
    component: DataBrowsing
  },
  {
    path: '/hotshaftwarning',
    name: 'HotShaftWarning',
    component: HotShaftWarning
  },
  {
    path: '/statisticalreports',
    name: 'StatisticalReports',
    component: StatisticalReports
  },
  {
    path: '/maintenanceservices',
    name: 'MaintenanceServices',
    component: MaintenanceServices
  },
  {
    path: '/temperatureriseforecast',
    name: 'TemperatureRiseForecast',
    component: TemperatureRiseForecast
  },

]

const router = new VueRouter({
  routes
})

export default router
