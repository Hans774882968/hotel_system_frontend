<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">
      <router-link to="/register">注册</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/login">登录</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
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
