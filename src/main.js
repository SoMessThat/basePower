// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import AMap from 'vue-amap'
Vue.use(AMap);
import MAP from './components/map/map.js'
Vue.use(MAP)

  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'd4698903a0ab383df592296e0f8a5890',
  // 插件集合 （插件按需引入）
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.ToolBar', // 地图工具条
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
    'AMap.Geocoder']
});

Vue.prototype.$axios = axios;
axios.defaults.headers.post["Content-type"] = "application/json;charset=utf-8"

Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// import MAP from '@/components/map/map.js'
// Vue.use(MAP)