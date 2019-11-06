<template>
  <div style="width:100%;height:100%;">
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo"
          :plugin="plugin"
          :center="center"
          :zoom="zoom"
          class="amap-demo"
          :events="events">
        <el-amap-marker v-for="(marker, index) in markers"
            :key="marker.index"
            :position="marker.position"
            :animation="marker.animation"
            :events="marker.events"
            :vid="index"></el-amap-marker>
      </el-amap>
    </div>
    <div>
      <div>选择前位置</div>
      <div>{{initPosition}}</div>
      <div>当前位置</div>
      <div>
        <div v-if="loaded">{{sendPosition}}</div>
        <div v-else>正在定位(可手动输入定位)</div>
      </div>      
    </div>
  </div>
</template>
<script>
export default {
  name: 'gd-map',  
  props:["initPosition"], 
  mounted(){
    console.log(this.initPosition);
  },
  data () {
    const self = this;
    return {
      position: '',
      sendPosition: '',
      searchOption: {
        city: '福州',
        citylimit: false
      },
      center: [102.685, 25.00981],
      zoom: 12,
      markers: [
        {
          position: [102.685, 25.00981],
          animation: 'AMAP_ANIMATION_DROP',
          events: {
            click(o) {
              // console.log('oooo', o)
            }
          }
        }
      ],
      plugin: [
        //一些工具插件
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          extensions: 'all',
          pName: 'Geolocation', //定位
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.sendPosition = result.formattedAddress
                  self.lng = result.position.lng //设置经度
                  self.lat = result.position.lat //设置维度
                  self.center = [self.lng, self.lat] //设置中心坐标
                  self.markers[0].position = [self.lng, self.lat]
                  self.loaded = true //load
                  var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: 'all'
                  })
                  geocoder.getAddress([self.lng, self.lat], function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                      if (result && result.regeocode) {
                        self.loaded = true
                        self.sendPosition = result.regeocode.formattedAddress
                        self.$nextTick()
                      }
                    }
                  })
                  self.$nextTick() //页面渲染好后
                }
              })
              // console.log('3333', o)
            }
          }
        },
        {
          pName: 'ToolBar', //工具栏
          events: {
            init(instance) {
              // console.log('1111', instance)
            }
          }
        },
        {
          pName: 'Scale', //比例尺
          events: {
            init(instance) {
              // console.log(instance)
            }
          }
        }
      ],
      //这是点击地图上的图标实现定位的事件
      events: {
        click(e) {
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.markers[0].position = [self.lng, self.lat]
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.loaded = true
                self.sendPosition = result.regeocode.formattedAddress
                self.$nextTick()
                //把地址传到父组件
                self.$emit('leaveSelectAdress', self.sendPosition)
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0,
      loaded: false
    }
  },
  methods: {
    //这是搜索框搜索完成后的回调函数
    onSearchResult(pois) {
      let self = this
      // console.log('pois', pois)
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        self.lng = center.lng
        self.lat = center.lat
        // 这里通过高德 SDK 完成。
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
        geocoder.getAddress([center.lng, center.lat], function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.regeocode) {
              self.loaded = true
              self.sendPosition = result.regeocode.formattedAddress
              self.$nextTick()
            }
          }
        })
        self.center = [center.lng, center.lat]
        self.markers[0].position = [center.lng, center.lat]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.amap-page-container {
  position: relative;
  width: 100%;
  height: 90%;
}

.amap-demo {
  height: 100%;
}

.search-box {
  width: 50%;
  left: 0;
  right: 0;
  top: 10px;
  position: absolute;
  margin: 0 auto;
}
</style>
