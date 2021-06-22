<template>
  <div class="container">
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
      <div class="captcha">
        <input v-model="RegisterForm.captcha" class="captcha-input" />
        <el-button type="primary"
                   :disabled="captchaObj.sent"
                   class="captcha-btn"
                   @click="sendCaptcha">
          {{ captchaObj.sent ? `${captchaObj.countDown} s` : '获取验证码'}}
        </el-button>
      </div>
      <el-button class="btn" type="primary" @click="register">注册</el-button>
      <div class="field">
        <router-link to="/login">已有账号，直接登录></router-link>
      </div>
    </div>
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
        password: '',
        captcha: ''
      },
      captchaObj: {
        sent: false,
        countDown: 0
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
    afterSentCaptcha () {
      this.captchaObj.sent = true
      this.captchaObj.countDown = 15
      const t = setInterval(() => {
        this.captchaObj.countDown--
        if (!this.captchaObj.countDown) {
          clearInterval(t)
          this.captchaObj.sent = false
        }
      }, 1000)
    },
    sendCaptcha () {
      if (this.captchaObj.sent) return
      if (!this.RegisterForm.email.length) {
        this.showErr('请填写email')
        return
      }
      this.$axios.get('/send_captcha', {
        params: {
          email: this.RegisterForm.email
        }
      }).then(res => {
        this.$message({
          message: '验证码已发送',
          type: 'success',
          center: true
        })
        this.afterSentCaptcha()
      }).catch(res => {
        this.showErr('验证码发送失败，请检查网络设置')
        this.afterSentCaptcha()
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
      if (!this.RegisterForm.captcha.length) {
        this.showErr('请填写验证码')
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
        if (dat.code === 200) {
          this.$message({
            message: '注册成功',
            type: 'success',
            center: true
          })
        } else {
          this.showErr('注册失败')
        }
      }).catch(res => {
        this.showErr('注册失败，请检查网络设置')
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
.register{
  width: 30%;
  background-color: white;
  margin-left: calc((100% - 30%) / 2);
  margin-top: 5rem;
  box-sizing: border-box;
  border-radius: 0.75rem;
  padding: 2rem;
}
.field{
  margin: 0.75rem 0;
}
.captcha{
  margin: 0.75rem 0;
  width: 100%;
  display: flex;
}
.captcha > .captcha-input{
  margin-right: 1rem;
  border-radius: 0.5rem;
  border: 2px solid #DCDFE6;
  padding: 0 0.5rem;
  font-size: 1rem;
  outline: 0;
  box-sizing: border-box;
  height: 40px;/*等于el-input的总高度*/
  line-height: 40px;
  flex: 2;
}
.captcha > .captcha-btn{
  border-radius: 0.5rem;
  flex: 1;
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
.register a{
  color: #409EFF;
  text-decoration: none;
}
</style>
