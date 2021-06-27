<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <p>{{ rid }}</p>
      <div class="room_info">
        <img :src="room_info.img"  class="room_img" />
        <p>rid：{{ room_info.rid }}</p>
        <p>hid：{{ room_info.hid }}</p>
        <p>房间号：{{ room_info.number }}</p>
        <p>房间类型：{{ room_info.roomtype }}</p>
        <p>早餐：{{ room_info.breakfast }}</p>
        <p>人数上限：{{ room_info.people_lim }}</p>
        <p>￥{{ room_info.price }}</p>
      </div>
      <div class="comment_form">
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
            <p class="nickname">{{ item.email }}</p>
            <p class="nickname">{{ item.nickname }}</p>
          </div>
          <div class="right text-wrap">
            {{ item.content }}
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
      room_info: {},
      comments: [],
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
        rid: this.rid
      }
    }).then(res => {
      if (res.data === '') {
        this.jump_to_404()
      } else {
        this.room_info = Object.assign({}, res.data)
      }
    }).catch(res => {
      this.showErr(`获取房间信息失败：${res}`)
    })
    // 获取评论
    this.$axios.get('/rcomment/rcomment', {
      params: {
        rid: this.rid
      }
    }).then(res => {
      if (res.data === '') {
        this.jump_to_404()
      } else {
        this.comments = res.data.slice()
      }
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
    submit_comment () {
      if (!this.comment_content.length) {
        this.showErr('请填写评论')
        return
      }
      this.$axios.post(`/rcomment/new_comment`, {
        id: this.rid
      }).then(res => {
        if (res.status !== 200) {
          this.showErr(`发表评论失败：${res}`)
          return
        }
        this.showSuc('发表评论成功')
        this.comments.splice(0, 0, {
          email: '10005@qq.com',
          nickname: '888',
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
.room_img {
  width: 40rem;
  height: 25rem;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
  min-height: 100vh;
}
.room_info{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
}
.comment_form{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
}
.comment_form .content{
  width: 70%;
}
.comment_form .submit_btn{
  width: 70%;
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
  padding: 0.5rem;
}
.left .nickname{
  margin: 0.5rem 0;
}
.comment .right{
  padding: 0.5rem;
}
/*实现文本分段显示*/
.comment .text-wrap{
  white-space: pre-line;
  text-align: left;
}
</style>
