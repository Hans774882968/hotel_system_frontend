<template>
  <!--111111111-->
  <div class="container">
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link to="/register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/login" >登录</router-link>
      </el-menu-item>
    </el-menu>
    <h4>欢迎使用</h4> <div><h1 class="center">酒店辅助管理系统</h1></div>
    <form action="/Search" class="search_form" id="search_form">
      <div class="search_container">
        <input type="text" name="keywords" class="searc_input" aria-placeholder="输入目的地，城市或景点" required="required">
        <input type="date"  class="search_input" value="入住日期"  required="required">
        <input type="date"  class="search_input" value="退房日期" placeholder="退房日期" required="required">
        <button class="search_button" >搜索</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Index'
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
  width: calc(100% - 214px);
  height: 57px;
  border: none;
  outline: none;
  padding-left: 27px;
  border-radius: 0px;
  font-size: 16px;
  font-weight: 400;
  color: #000000;
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
/*.tab-location{*/
  /*margin-top: 100px;*/
  /*margin-right:430px;*/
  /*float: right;*/
  /*font-feature-settings: normal;*/
/*}*/
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
/*.location{*/
  /*position: absolute; right: 10;*/
  /*text-align: left ;*/
/*}*/
.center{
 /*position: fixed;*/
  text-align: center;
  font-feature-settings: normal;
  font-size:60px;
  font-family: 'STSong';
}

a {
  color: #42b983;
  text-decoration: none;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
