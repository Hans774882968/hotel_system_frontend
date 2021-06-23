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
      <el-menu-item index="2">
        <router-link to="/login" >登录</router-link>
      </el-menu-item>
    </el-menu>
    <h1 class="center">酒店辅助管理系统</h1>
    <input class="btn-el-input"><button class="el-btn">搜索</button>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
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
