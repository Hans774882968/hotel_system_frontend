<template>
  <div class="container">
    <Navbar/>
    <h4>欢迎使用</h4>
    <div><h1 class="center">酒店辅助管理系统</h1></div>
    <div class="search_form">
      <div class="search_container">
        <div class="search_row">
          <span>选择城市</span>
          <div class="row_right">
            <el-select v-model="cur_city" class="row_right" placeholder="选择城市">
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
          <span>选择星级</span>
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
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Index',
  components: {Navbar},
  data () {
    return {
      city_option: [
        {
          label: '上海',
          options: [{value: '上海', label: '上海'}]
        },
        {
          label: '北京',
          options: [{value: '北京', label: '北京'}]
        },
        {
          label: '天津',
          options: [{value: '天津', label: '天津'}]
        },
        {
          label: '四川',
          options: [{value: '成都', label: '成都'}, {value: '南充', label: '南充'}, {value: '泸州', label: '泸州'}]
        },
        {
          label: '广西',
          options: [{value: '桂林', label: '桂林'}, {value: '北海', label: '北海'}, {value: '贺州', label: '贺州'}]
        }
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
      cur_person_num: ''
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
          date_in: this.date_in,
          date_out: this.date_out,
          person: this.cur_person_num
        }
      }).then(res => {
        let dat = res.data
        this.showSuc(dat)
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
