<template>
  <div>
    <Navbar></Navbar>
  <div style="padding: 50px;">
    高德地图
    <div id="container"></div>
  </div>
  </div>
</template>

<script>
export default {
  mounted () {
    window.onLoad = function () {
      var map = new AMap.Map('container', {
        zoom: 11, // 级别
        //center: [116.397428, 39.90923], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
      // 初始化插件
      var toolbar = new AMap.ToolBar()
      // 调用插件
      map.addControl(toolbar)

      // 点标记
      var marker1 = new AMap.Marker({
        content: "<div style='width: 20px; height:20px;background: red;color: #ff; text-align: center;'>1</div>",
        position: new AMap.LngLat(104.06,30.67), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京'
      })
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(112.49, 24.5), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '北京1'
      })
      map.add([marker1, marker2])
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME
      })
      var points = [
        { keyword: '四川大学江安校区',city:'成都' },
        { keyword: '望江校区',city:'成都' }
      ]
      driving.search(points, function (status, result) {
        // 未出错时，result即是对应的路线规划方案
      })
    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=e320cd3c4695a72d107f360e5b4dd707&callback=onLoad&plugin=AMap.ToolBar'
    var jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
<style>
#container{
  width: 500px;
  height: 500px;
}
</style>
