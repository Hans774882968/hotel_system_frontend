<template>
  <div class="container">
    <Navbar/>
    <h4>欢迎使用</h4>
    <div><h1 class="center">酒店辅助管理系统</h1></div>
    <form action="/Search" class="search_form" id="search_form">
      <div class="search_container">
        <div class="search_row">
          <span>输入地点</span>
          <div class="row_right">
            <input type="text" name="keywords" class="search_input" placeholder="输入目的地，城市或景点" required="required">
          </div>
        </div>
        <div class="search_row">
          <span>入住日期</span>
          <div class="row_right">
            <input type="date" class="search_input" required="required">
          </div>
        </div>
        <div class="search_row">
          <span>退房日期</span>
          <div class="row_right">
            <input type="date" class="search_input" required="required">
          </div>
        </div>
        <div class="search_row">
          <span>入住人数</span>
          <el-select class="row_right" v-model="cur_person_num" placeholder="选择入住人数">
            <el-option
              v-for="item in person_option"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search_row">
          <button class="search_button">搜索</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Index',
  components: {Navbar},
  data () {
    return {
      person_option: [{
        value: '选项1',
        label: '1人'
      }, {
        value: '选项2',
        label: '2人'
      }, {
        value: '选项3',
        label: '3人'
      }],
      cur_person_num: ''
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
