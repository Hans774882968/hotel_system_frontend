<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="top_menu">
        <router-link v-if="room_info.hasOwnProperty('hid')" :to="'/hotel/'+room_info.hid">
          {{ hotel_name }}
        </router-link>
        &nbsp;>>&nbsp;
        <router-link :to="this.$route.path">{{ room_info.txttype }}</router-link>
      </div>
      <div class="room_info">
        <div class="room_left">
          <h2 class="room_title">{{ room_info.txttype }}</h2>
          <img :src="room_info.rpicture"  class="room_img" />
        </div>
        <div class="room_right">
          <h2 class="room_title">基本信息</h2>
          <div class="base">
            <!--<span class="tag">&nbsp;rid：{{ room_info.rid }}</span>-->
            <!--<span class="tag">&nbsp;hid：{{ room_info.hid }}</span>-->
            <span class="tag"><i class="fa fa-square"></i>&nbsp;房间号：{{ room_info.rnum }}</span>
            <span class="tag"><i class="fa fa-bell"></i>&nbsp;早餐：{{ room_info.bf }}</span>
            <span class="tag"><i class="fa fa-user"></i>&nbsp;人数上限：{{ room_info.pnum }}</span>
            <span class="tag"><i class="fa fa-money"></i>&nbsp;￥{{ room_info.rprice }}</span>
          </div>
          <h2 class="room_title">客房详情</h2>
          <div class="facilities">
            <span class="tag"><i class="fa fa-bed"></i>&nbsp;1张特大床</span>
            <span class="tag"><el-icon class="el-icon-s-home"></el-icon>&nbsp;36平方米</span>
            <span class="tag"><i class="fa fa-wifi"></i>&nbsp;免费WiFi</span>
            <span class="tag"><i class="fa fa-television"></i>&nbsp;液晶电视</span>
            <span class="tag"><i class="fa fa-columns"></i>&nbsp;独立卫生间</span>
            <span class="tag"><i class="fa fa-ban"></i>&nbsp;无烟客房</span>
          </div>
          <div class="bottom_info">
            <span class="bottom_font">￥{{ room_info.rprice }}</span>
            <el-button type="primary" @click="jump_to_book">预订</el-button>
          </div>
        </div>
      </div>
      <div class="comment_form">
        <h3 class="comment_form_title">评价该房间</h3>
        <el-input
          type="textarea"
          class="content"
          placeholder="评价该房间..."
          v-model="comment_content">
        </el-input>
        <el-button class="submit_btn" type="primary" @click="submit_comment">提交评论</el-button>
      </div>
      <div class="comments">
        <div class="comment" v-for="(item,idx) in comments" :key="idx">
          <div class="left">
            <img src="/static/avatar_default.jpg" />
            <p class="nickname">{{ users[idx].email }}</p>
            <p class="nickname">{{ users[idx].name }}</p>
          </div>
          <div class="right text-wrap">
            <span>{{ item.txt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Room',
  components: {Navbar},
  data: function () {
    return {
      rid: -1,
      hotel_name: '',
      room_info: {},
      comments: [],
      users: [],
      comment_content: ''
    }
  },
  created () {
    this.rid = parseInt(this.$route.params.rid)
  },
  mounted () {
    if (Number.isNaN(this.rid)) {
      this.jump_to_404()
      return
    }
    // 获取房间
    this.$axios.get('/room/getroom', {
      params: {
        Rid: this.rid
      }
    }).then(res => {
      let dat = res.data
      if (dat === '') {
        this.jump_to_404()
        return
      }
      this.room_info = Object.assign({}, dat)
      return this.$axios.get('/hotel/gethotel', {
        params: {
          hid: this.room_info.hid
        }
      })
    }).then(res => {
      this.hotel_name = res.data.hotel.hname
    }).catch(res => {
      this.showErr(`获取房间信息失败：${res}`)
    })
    // 获取评论
    this.$axios.get('/rcomment/rcomment', {
      params: {
        Rid: this.rid
      }
    }).then(res => {
      if (res.data === '') {
        return
      }
      this.comments = res.data.comment.slice()
      this.users = res.data.users.slice()
    }).catch(res => {
      this.showErr(`获取评论失败：${res}`)
    })
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
    jump_to_404 () {
      this.$router.replace({
        name: 'NotFound'
      }).catch(res => {
        this.showErr(`404页面跳转失败：${res}`)
      })
    },
    jump_to_book () {
      let {href} = this.$router.resolve({
        name: 'Book'
      })
      window.open(href, '_blank')
    },
    jump_to_login () {
      this.$router.push({
        name: 'Login'
      }).catch(res => {
        this.showErr(`登录页面跳转失败：${res}`)
      })
    },
    submit_comment () {
      if (!this.comment_content.length) {
        this.showErr('请填写评论')
        return
      }
      this.$axios.post(`/rcomment/new_comment`, {
        rid: this.rid,
        txt: this.comment_content
      }).then(res => {
        if (res.status !== 200) {
          this.showErr(`发表评论失败：${res}`)
          return
        }
        if (res.data.code !== 200) {
          this.jump_to_login()
          return
        }
        this.showSuc('发表评论成功')
        this.comments.splice(0, 0, {
          email: '798806141@qq.com',
          nickname: 'east',
          content: this.comment_content
        })
      }).catch(res => {
        this.showErr(`发表评论失败：${res}`)
      })
    }
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color: #287dfa;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  min-height: 100vh;
}
.top_menu{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
  padding: 1rem;
  text-align: left;
}
.room_info{
  width: 80%;
  background-color: white;
  display: flex;
  padding-bottom: 1rem;
}
.room_info .room_left{
  flex: 1.2;
  margin: 0 1rem;
}
.room_left .room_title{
  padding: 0;
  margin: 1rem 0;
  text-align: left;
}
.room_left .room_img {
  width: 100%;
}
.room_info .room_right{
  flex: 1;
  overflow: hidden;
}
.room_right .room_title{
  margin: 1rem 0;
  padding: 0 1rem;
  text-align: left;
}
.room_right .base,.room_right .facilities{
  width: 100%;
  padding: 0 1rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
.room_right .tag{
  text-align: left;
}
.room_right .bottom_info{
  text-align: left;
  margin: 2rem 1rem 0 1rem;
  display: flex;
  justify-content: flex-end;
}
.bottom_info *{
  margin-right: 2rem;
}
.bottom_info .bottom_font{
  line-height: 40px;
  color: #287dfa;
  font-size: 24px;
  font-weight: 600;
}
.comment_form{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.comment_form_title{
  text-align: left;
  margin-top: 0;
}
.comment_form .content{
  width: 90%;
  font-size: 20px;
}
.comment_form .content >>> .el-textarea__inner{
  height: 10rem;
}
.comment_form .submit_btn{
  width: 10%;
  margin-top: 1rem;
}
.comments{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0.5rem 1rem;
}
.comments .comment{
  width: 100%;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  display: flex;
}
.comment .left{
  padding: 1rem;
}
.left .nickname{
  margin: 0.5rem 0;
}
.left p{
  font-weight: 600;
  color: #287dfa;
}
.comment .right{
  padding: 1rem;
}
/*实现文本分段显示*/
.comment .text-wrap{
  white-space: pre-line;
  text-align: left;
}
</style>
