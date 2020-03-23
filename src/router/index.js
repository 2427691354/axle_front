import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import DataBrowsing from '../views/DataBrowsing.vue'
import HistoricalHotAxisAlarm from '../views/HistoricalHotAxisAlarm.vue'
import StatisticalReports from '../views/StatisticalReports.vue'
import MaintenanceServices from '../views/MaintenanceServices.vue'
import TemperatureRiseForecast from '../views/TemperatureRiseForecast.vue'
import TemperatureRiseSearch from '../views/TemperatureRiseSearch.vue'
import MaintenanceReminder from '../views/MaintenanceReminder.vue'
import CumulativeReminder from '../views/MaintenanceService/CumulativeReminder.vue'
import HotShaftReminder from '../views/MaintenanceService/HotShaftReminder.vue'
import TrainNumTempRiseReminder from '../views/MaintenanceService/TrainNumTempRiseReminder.vue'
import VehicleTempRiseReminder from '../views/MaintenanceService/VehicleTempRiseReminder.vue'
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
    path: '/maintenanceservices',
    name: 'MaintenanceServices',
    component: MaintenanceServices
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
    children: [
      {
        path: '/cumulativeReminder',
        name: 'CumulativeReminder',
        component: CumulativeReminder,
      },
      {
        path: '/hotShaftReminder',
        name: 'HotShaftReminder',
        component: HotShaftReminder
      },
      {
        path: '/trainNumTempRiseReminder',
        name: 'TrainNumTempRiseReminder',
        component: TrainNumTempRiseReminder
      },
      {
        path: '/vehicleTempRiseReminder',
        name: 'VehicleTempRiseReminder',
        component: VehicleTempRiseReminder
      }
    ]
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
