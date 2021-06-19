<template>
  <div class="register">
    <h2>注册</h2>
    <el-input class="field"
              prefix-icon="el-icon-message"
              v-model="RegisterForm.email"
              type="text"
              name="email"
              placeholder="邮箱" />
    <el-input class="field"
              prefix-icon="el-icon-user"
              v-model="RegisterForm.name"
              type="text"
              name="name"
              placeholder="姓名"
              maxlength="10"
              show-word-limit />
    <div class="field">
      <el-radio v-model="RegisterForm.sex" label="1">男</el-radio>
      <el-radio v-model="RegisterForm.sex" label="2">女</el-radio>
    </div>
    <el-input class="field"
              prefix-icon="el-icon-phone"
              v-model="RegisterForm.phone"
              type="text"
              name="phone"
              placeholder="手机号码" />
    <el-input class="field"
              prefix-icon="el-icon-lock"
              v-model="RegisterForm.password"
              type="password"
              name="password"
              placeholder="密码"
              show-password />
    <el-button class="btn" type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      RegisterForm: {
        email: '',
        name: '',
        sex: '1',
        phone: '',
        password: ''
      }
    }
  },
  // 添加自定义背景
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-image: url("/static/bg.png")')
  },
  beforeDestroy () {
    document.body.removeAttribute('style')
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
      if (!this.RegisterForm.email.length) {
        this.showErr('请填写email')
        return false
      }
      if (!this.RegisterForm.name.length) {
        this.showErr('请填写姓名')
        return false
      }
      if (!this.RegisterForm.phone.length) {
        this.showErr('请填写手机号码')
        return false
      }
      if (!this.RegisterForm.password.length) {
        this.showErr('请填写密码')
        return false
      }
      return true
    },
    register () {
      if (!this.formCheck()) return
      this.$axios.get('/register', {
        params: {
          email: this.RegisterForm.email,
          name: this.RegisterForm.name,
          sex: this.RegisterForm.sex,
          phone: this.RegisterForm.phone,
          password: this.RegisterForm.password
        }
      }).then(res => {
        let dat = res.data
        let msg = ''
        if (dat.code === 200) {
          msg = '注册成功'
        } else {
          msg = '注册失败'
        }
        this.$message({
          message: msg,
          type: 'success',
          center: true
        })
      }).catch(res => {
        this.showErr('注册失败，请检查网络设置')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register{
  width: 30%;
  background-color: white;
  margin-left: calc((100% - 30%) / 2);
  margin-top: 8rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  padding: 2rem;
}
.register .field{
  margin: 0.75rem 0;
}
.register >>> .el-input__inner{
  border-radius: 0.5rem;
  border-width: 2px;
  font-size: 1rem;
}
.register .btn{
  margin: 1rem 0;
  width: 100%;
  border-radius: 0.5rem;
}
</style>
