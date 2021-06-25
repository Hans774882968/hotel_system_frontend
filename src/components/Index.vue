<template>
  <div class="container">
    <Navbar/>
    <h4>欢迎使用</h4>
    <div><h1 class="center">酒店辅助管理系统</h1></div>
    <div class="search_form">
      <div class="search_container">
        <div class="search_row">
          <span>输入地点</span>
          <div class="row_right">
            <input v-model="keywords" type="text" name="keywords" class="search_input" placeholder="输入目的地，城市或景点" required="required">
          </div>
        </div>
        <div class="search_row">
          <span>入住日期</span>
          <div class="row_right">
            <input v-model="date_in" type="date" class="search_input" required="required">
          </div>
        </div>
        <div class="search_row">
          <span>退房日期</span>
          <div class="row_right">
            <input v-model="date_out" type="date" class="search_input" required="required">
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
        <!--*********************************************-->
        <div>
          <span>儿&nbsp;&nbsp;&nbsp;&nbsp;童&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-radio v-model="radio" border  label="1">1个儿童</el-radio>
        <el-radio  v-model="radio" border  label="2">2个儿童</el-radio>
      </div>
        <!--*********************************************-->
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
      radio: '1'
    },
    {
      keywords: '',
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
      }

      ],
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
    search () {
      this.$axios.get('/search', {
        params: {
          keywords: this.keywords,
          date_in: this.date_in,
          date_out: this.date_out,
          person: this.cur_person_num
        }
      }).then(res => {
        this.showSuc(res)
      }).catch(res => {
        // this.showErr('查询失败，请检查网络设置')
        this.showErr({
          keywords: this.keywords,
          date_in: this.date_in,
          date_out: this.date_out,
          person: this.cur_person_num
        })
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
 /*position: fixed;*/
  text-align: center;
  font-feature-settings: normal;
  font-size:60px;
}
</style>
