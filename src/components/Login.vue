<template>
  <div class="login">
    <el-input class="field" v-model="LoginForm.email" type="text" name="email" placeholder="邮箱" />
    <el-input class="field"
              v-model="LoginForm.password"
              type="password"
              name="password"
              placeholder="密码"
              show-password />
    <el-button class="btn" type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
        let msg = ''
        if (dat.code === 200) {
          msg = '登录成功'
        } else {
          msg = '登录失败'
        }
        this.$message({
          message: msg,
          type: 'success',
          center: true
        })
      }).catch(res => {
        this.showErr('登录失败，请检查网络设置')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  width: 30%;
  margin-left: calc((100% - 30%) / 2);
  margin-top: 8rem;
  border: 1px solid #ddd;
  box-sizing: border-box;
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
</style>
