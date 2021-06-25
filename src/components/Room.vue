<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <p>{{ rid }}</p>
      <div class="room_info">
        <p>早餐：{{ room_info.breakfast }}</p>
        <p>人数上限：{{ room_info.people_lim }}</p>
        <p>￥{{ room_info.price }}</p>
      </div>
      <div class="comment_form">
        <el-input
          class="content"
          placeholder="评价该房间..."
          v-model="comment_content">
        </el-input>
        <el-button class="submit_btn" type="primary" @click="submit_comment">提交评论</el-button>
      </div>
      <div class="comments">
        <div class="comment" v-for="(item,idx) in comments" :key="idx">
          <p>{{ item.nickname }}</p>
          <p>{{ item.content }}</p>
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
      room_info: {
        breakfast: '无',
        people_lim: 1,
        price: 10.9
      },
      comments: [
        {
          email: '111',
          nickname: '222',
          content: '333'
        },
        {
          email: '444',
          nickname: '555',
          content: '666'
        }
      ],
      mocks: [
        {
          breakfast: '无',
          people_lim: 1,
          price: 10.9
        },
        {
          breakfast: '有',
          people_lim: 3,
          price: 11.9
        }
      ],
      comment_content: ''
    }
  },
  created () {
    this.rid = parseInt(this.$route.params.rid)
  },
  mounted () {
    this.$axios.get(`/room?id=${this.rid}`, {
      params: {}
    }).then(res => {
      Object.assign(this.room_info, res)
    }).catch(res => {
      this.showErr(res)
      Object.assign(this.room_info, this.mocks[this.rid - 1])
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
    submit_comment () {
      if (this.comment === '') {
        this.showErr('请填写评论')
        return
      }
      this.$axios.post(`/new_comment?id=${this.rid}`, {
        params: {}
      }).then(res => {
        this.comments.splice(0, 0, {
          email: '777',
          nickname: '888',
          content: this.comment_content
        })
      }).catch(res => {
        this.showErr('发送评论失败，请检查网络设置')
        this.comments.splice(0, 0, {
          email: '777',
          nickname: '888',
          content: this.comment_content
        })
      })
    }
  }
}
</script>

<style scoped>
div{
  box-sizing: border-box;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f7fa;
}
.room_info,.comment_form,.comments{
  border: 1px solid #ddd;
}
.room_info{
  width: 60%;
}
.comment_form{
  width: 60%;
}
.comment_form .content{
  width: 70%;
}
.comment_form .submit_btn{
  width: 70%;
}
.comments{
  width: 60%;
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
}
</style>
