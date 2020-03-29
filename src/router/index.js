import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import DataBrowsing from '../views/DataBrowsing.vue'
import HistoricalHotAxisAlarm from '../views/HistoricalHotAxisAlarm.vue'
import StatisticalReports from '../views/StatisticalReports.vue'
import TemperatureRiseForecast from '../views/TemperatureRiseForecast.vue'
import TemperatureRiseSearch from '../views/TemperatureRiseSearch.vue'
import MaintenanceReminder from '../views/MaintenanceReminder.vue'
import AccumulatedMileageQuery from '../views/AccumulatedMileageQuery.vue'
import MileageDetails from '../views/AccumulatedMileageQuerys/MileageDetails.vue'
import VehicleTemAnaysis from '../views/VehicleTemAnaysis.vue'
import AxleTemAnaysis from '../views/AxleTemAnaysis.vue'

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
    path: '/historicalHotAxisAlarm',
    name: 'HistoricalHotAxisAlarm',
    component: HistoricalHotAxisAlarm
  },
  {
    path: '/statisticalreports',
    name: 'StatisticalReports',
    component: StatisticalReports
  },
  {
    path: '/temperatureriseforecast',
    name: 'TemperatureRiseForecast',
    component: TemperatureRiseForecast
  },
  {
    path: '/temperaturerisesearch',
    name: 'TemperatureRiseSearch',
    component: TemperatureRiseSearch
  },
  {
    path: '/maintenanceReminder',
    name: 'MaintenanceReminder',
    component: MaintenanceReminder,
  },
  {
    path: '/accumulatedMileageQuery',
    name: 'AccumulatedMileageQuery',
    component: AccumulatedMileageQuery,
  },
  {
    path: '/mileageDetails',
    name: 'MileageDetails',
    component: MileageDetails
  },
  {
    path:'/vehicleTemAnaysis',
    name:'VehicleTemAnaysis',
    component:VehicleTemAnaysis
  },
  {
    path:'/axleTemAnaysis',
    name:'AxleTemAnaysis',
    component:AxleTemAnaysis
  }
]

const router = new VueRouter({
  routes
})

export default router
