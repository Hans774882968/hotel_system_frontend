<template>
  <div id="container"></div>
</template>

<script>
const amapKey = 'e320cd3c4695a72d107f360e5b4dd707'
export default {
  name: 'Map',
  props: {
    hotels: Array
  },
  mounted () {
    window.onload = () => {
      let map = new AMap.Map('container', {
        zoom: 11, // 级别
        center: this.hotels[0].location, // [104.06, 30.67], // 中心点坐标
        viewMode: '3D'// 使用3D视图
      })
      // 初始化插件
      let toolbar = new AMap.ToolBar()
      // 调用插件
      map.addControl(toolbar)
      // 点标记
      let markers = []
      for (let i = 0; i < this.hotels.length; ++i) {
        markers.push(new AMap.Marker({
          content: `<div style="
            width: 20px;
            height:20px;
            background: red;
            color: white;
            text-align: center;">
              ${i + 1}
            </div>`,
          position: this.hotels[i].location,
          title: this.hotels[i].name
        }))
      }
      map.add(markers)
    }
    let url = `https://webapi.amap.com/maps?v=1.4.15&key=${amapKey}&callback=onload&plugin=AMap.ToolBar`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
<style scoped>
#container{
  height: 100%;
}
</style>
