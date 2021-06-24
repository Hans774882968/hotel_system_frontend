<template>
  <div class="container">
    <Navbar/>
    <h4>欢迎使用</h4>
    <div><h1 class="center">酒店辅助管理系统</h1></div>
    <table align="center">
      <tr align="center">
        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择入住时间</td>
        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请选择退房时间</td>
      </tr>
    </table>
    <form action="/Search" class="search_form" id="search_form">
      <div class="search_container">
        <input type="text" name="keywords" class="search_input" aria-placeholder="输入目的地，城市或景点" required="required">
        <input type="date" class="search_input" value="入住日期"  required="required">
        <input type="date" class="search_input" value="退房日期" placeholder="退房日期" required="required">
        <button class="search_button">搜索</button>
      </div>
    </form>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Index',
  components: {Navbar}
}
</script>

<style scoped>
.search_form {
  display: flex;
  justify-content: center;
}
.search_container{
  display: flex;
  width: 60%;
}
.search_input {
  display: block;
  box-sizing: border-box;
  width: calc(100% - 214px);
  height: 57px;
  border: none;
  outline: none;
  padding-left: 27px;
  border-radius: 0px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
  margin-left: 50px;
}
.search_button {
  width: 196px;
  height: 57px;
  border: none;
  outline: none;
  background: #ffb400;
  border-radius: 0px;
  cursor: pointer;
  font-size: 16px;
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
.btn-el-input{
  width: 180px;
  height: 50px;
  /*border: 1px solid #7fcc0b;*/
  border-right: none;
  border-radius: 10px;
}
.el-btn{
  position: relative;
  right: -10px;
  width: 50px;
  height: 52px;
  font-size: 14px;
  color: white;
  background: aquamarine;
  border: 0;
  border-radius:10px;
}
.center{
 /*position: fixed;*/
  text-align: center;
  font-feature-settings: normal;
  font-size:60px;
}
</style>
