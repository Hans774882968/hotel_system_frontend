<template>
  <div class="container">
    <Navbar/>
    <h4>欢迎使用</h4>
    <div><h1 class="center">酒店辅助订购系统</h1></div>
    <div class="search_form">
      <div class="search_container">
        <div class="search_row">
          <span>选择城市</span>
          <div class="row_right">
            <el-select filterable v-model="cur_city" class="row_right" placeholder="选择城市">
              <el-option-group
                v-for="group in city_option"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
              <br/>
            </el-select>
          </div>
        </div>
        <div class="search_row">
          <span>星级范围</span>
          <div class="row_right">
            <el-slider
              v-model="choose_star"
              range
              show-stops
              :max="5">
            </el-slider>
          </div>
        </div>
        <div class="search_row">
          <span>入住日期</span>
          <div class="row_right">
            <input v-model="date_in" type="date" class="search_input" />
          </div>
        </div>
        <div class="search_row">
          <span>退房日期</span>
          <div class="row_right">
            <input v-model="date_out" type="date" class="search_input" />
          </div>
        </div>
        <div class="search_row">
          <span>入住人数</span>
          <el-select v-model="cur_person_num" class="row_right" placeholder="选择入住人数">
            <el-option
              v-for="item in person_option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            <br/>
          </el-select>
        </div>
        <div class="search_row">
          <button class="search_button" @click="search">搜索</button>
        </div>
      </div>
    </div>
    <!--搜索结果-->
    <div v-if="search_suc">
      <div class="hotel_info">
        <h1 class="hotel_name">{{ hotel_info.hname }}</h1>
        <p><el-icon class="el-icon-location"></el-icon>{{ hotel_info.addr }}</p>
        <el-rate v-model="hotel_info.star" disabled></el-rate>
        <div class="hotel_headcontext">
          <img class="hotel_img" :src="hotel_info.hpicture" :alt="hotel_info.hname" />
          <div class="map">
            <Map :hotels="[
              {
                location: [hotel_info.longitude,hotel_info.latitude],
                name: hotel_info.hname
              }
            ]"></Map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
function Province (name, arr) {
  this.label = name
  this.options = []
  for (let x of arr) {
    this.options.push({value: x, label: x})
  }
}
export default {
  name: 'Index',
  components: {Navbar},
  data () {
    return {
      city_option: [
        new Province('上海', ['上海']),
        new Province('北京', ['北京']),
        new Province('天津', ['天津']),
        new Province('河北', ['石家庄', '唐山', '秦皇岛']),
        new Province('山西', ['太原']),
        new Province('内蒙古', ['呼和浩特', '包头']),
        new Province('辽宁', ['沈阳', '大连', '丹东', '锦州']),
        new Province('吉林', ['长春', '牡丹江']),
        new Province('黑龙江', ['哈尔滨']),
        new Province('江苏', ['南京', '无锡', '扬州', '徐州']),
        new Province('浙江', ['杭州', '宁波', '温州', '金华']),
        new Province('安徽', ['合肥', '蚌埠', '安庆']),
        new Province('福建', ['福州', '厦门', '泉州']),
        new Province('江西', ['南昌', '九江', '赣州']),
        new Province('山东', ['济南', '青岛', '烟台', '济宁']),
        new Province('河南', ['郑州', '洛阳', '平顶山']),
        new Province('湖北', ['武汉', '宜昌', '襄樊']),
        new Province('湖南', ['长沙', '岳阳', '常德']),
        new Province('广东', ['广州', '深圳', '惠州', '湛江', '韶关']),
        new Province('广西', ['南宁', '桂林', '北海']),
        new Province('海南', ['海口']),
        new Province('四川', ['成都', '泸州', '南充']),
        new Province('贵州', ['贵阳', '遵义']),
        new Province('云南', ['昆明', '大理']),
        new Province('陕西', ['西安']),
        new Province('甘肃', ['兰州']),
        new Province('青海', ['西宁']),
        new Province('宁夏', ['银川']),
        new Province('新疆', ['乌鲁木齐'])
      ],
      cur_city: '',
      choose_star: [2, 3],
      date_in: '',
      date_out: '',
      person_option: [{
        value: '1',
        label: '1人'
      }, {
        value: '2',
        label: '2人'
      }, {
        value: '3',
        label: '3人'
      }],
      cur_person_num: '',
      search_suc: false,
      hotel_info: {}
    }
  },
  methods: {
    showErr (msg) {
      this.$message({
        message: msg,
        type: 'warning',
        center: true
      })
    },
    showSuc (msg) {
      this.$message({
        message: msg,
        type: 'success',
        center: true
      })
    },
    formCheck () {
      if (!this.cur_city.length) {
        this.showErr('请选择城市')
        return false
      }
      if (!this.date_in.length) {
        this.showErr('请选择入住日期')
        return false
      }
      if (!this.date_out.length) {
        this.showErr('请选择退房日期')
        return false
      }
      if (!this.cur_person_num.length) {
        this.showErr('请选择入住人数')
        return false
      }
      return true
    },
    search () {
      if (!this.formCheck()) return
      this.showErr({
        city: this.cur_city,
        choose_star: this.choose_star,
        date_in: this.date_in,
        date_out: this.date_out,
        person: this.cur_person_num
      })
      this.$axios.get('/hotel/search', {
        params: {
          city: this.cur_city,
          choose_star: this.choose_star,
          date_in: this.date_in,
          date_out: this.date_out,
          person: this.cur_person_num
        }
      }).then(res => {
        let dat = res.data
        this.showSuc(dat)
        this.search_suc = true
      }).catch(res => {
        this.showErr(`查询失败：${res}`)
      })
    }
  }
}
</script>

<style scoped>
.search_form {
  display: flex;
  justify-content: center;
}
.search_container{
  display: flex;
  width: 35%;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 0.75rem 1.5rem;
}
.search_row{
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0.75rem 0;
  font-size: 14px;
}
/*圆弧*/
.search_row input,.search_row > button,.search_row >>> .el-input__inner{
  border-radius: 0.5rem;
}
.search_row span{
  flex: 1;
  line-height: 2rem;
}
.search_row .row_right{
  flex: 2.2;
}
.search_row .search_input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: 2rem;
  border: 1px solid #ddd;
  outline: none;
  padding: 0 1rem;
  font-weight: 400;
  color: #000000;
}
.search_row >>> .el-input__inner{
  height: 2rem;
  line-height: 2rem;
}
.search_row >>> .el-input__icon{
  width: 2rem;
  line-height: 2rem;
}
.search_button {
  width: 100%;
  height: 2rem;
  border: none;
  outline: none;
  background: #ffb400;
  border-radius: 0.75rem;
  cursor: pointer;
  font-weight: 500;
  color: #FFFFFF;
}
div {
  display: block;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.container{
  height: 100vh;
  background-image: url("/static/bg.png");
}
.center{
  text-align: center;
  font-feature-settings: normal;
  font-size: 60px;
}
</style>
