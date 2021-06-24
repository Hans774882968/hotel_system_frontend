<template>
  <div class="container">
    <Navbar/>
    <div class="login">
      <h2>登录</h2>
      <el-input class="field"
                prefix-icon="el-icon-message"
                v-model="LoginForm.email"
                type="text"
                name="email"
                placeholder="邮箱" />
      <el-input class="field"
                prefix-icon="el-icon-lock"
                v-model="LoginForm.password"
                type="password"
                name="password"
                placeholder="密码"
                show-password />
      <el-button class="btn" type="primary" @click="login">登录</el-button>
      <div class="field">
        <router-link to="/register">没有账号，去注册></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Login',
  components: {Navbar},
  data () {
    return {
      LoginForm: {
        email: '',
        password: ''
      }
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
    formCheck () {
      if (!this.LoginForm.email.length) {
        this.showErr('请填写email')
        return false
      }
      if (!this.LoginForm.password.length) {
        this.showErr('请填写密码')
        return false
      }
      return true
    },
    login () {
      if (!this.formCheck()) return
      this.$axios.get('/login', {
        params: {
          email: this.LoginForm.email,
          password: this.LoginForm.password
        }
      }).then(res => {
        let dat = res.data
        if (dat.code === 200) {
          this.$message({
            message: '登录成功',
            type: 'success',
            center: true
          })
        } else {
          this.showErr('登录失败')
        }
      }).catch(res => {
        this.showErr('登录失败，请检查网络设置')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  background-image: url("/static/bg.png");
  height: 100vh;
  overflow: hidden;/*bfc*/
}
.login{
  width: 30%;
  background-color: white;
  margin-left: calc((100% - 30%) / 2);
  margin-top: 2rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  padding: 2rem;
}
.login .field{
  margin: 0.75rem 0;
}
.login >>> .el-input__inner{
  border-radius: 0.5rem;
  border-width: 2px;
  font-size: 1rem;
}
.login .btn{
  margin: 1rem 0;
  width: 100%;
  border-radius: 0.5rem;
}
.login a{
  color: #409EFF;
  text-decoration: none;
}
</style>
