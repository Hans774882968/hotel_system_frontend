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
      room_info: {rid: -1},
      comments: [],
      mock_comments: [
        {
          rid: 1,
          email: '10001@qq.com',
          nickname: '用户1',
          content: '1\n很舒服\n很舒服'
        },
        {
          rid: 2,
          email: '10002@qq.com',
          nickname: '用户2',
          content: '2\n不好'
        },
        {
          rid: 3,
          email: '10002@qq.com',
          nickname: '用户2',
          content: '3\n不好'
        },
        {
          rid: 4,
          email: '10002@qq.com',
          nickname: '用户2',
          content: '4\n不好'
        },
        {
          rid: 1,
          email: '10002@qq.com',
          nickname: '用户2',
          content: '5\n不好'
        }
      ],
      mock_rooms: [
        {
          rid: 1,
          hid: 1,
          roomtype: '单人间',
          breakfast: '无',
          people_lim: 1,
          price: 10.9,
          number: '1001',
          img: '/static/hotel_img/rm1.png'
        },
        {
          rid: 2,
          hid: 1,
          roomtype: '多人间',
          breakfast: '有',
          people_lim: 3,
          price: 11.9,
          number: '1002',
          img: '/static/hotel_img/rm2.png'
        },
        {
          rid: 3,
          hid: 2,
          roomtype: '单人间',
          breakfast: '有',
          people_lim: 1,
          price: 10.9,
          number: '3001',
          img: '/static/hotel_img/rm3.png'
        },
        {
          rid: 4,
          hid: 2,
          roomtype: '多人间',
          breakfast: '有',
          people_lim: 3,
          price: 11.9,
          number: '3002',
          img: '/static/hotel_img/rm4.png'
        }
      ],
      comment_content: ''
    }
  },
  created () {
    this.hid = parseInt(this.$route.params.hid)
    this.rid = parseInt(this.$route.params.rid)
  },
  mounted () {
    this.$axios.get('/room', {
      params: {
        rid: this.rid
      }
    }).then(res => {
      Object.assign(this.room_info, res)
    }).catch(res => {
      this.showErr(res)
      Object.assign(this.room_info, this.mock_rooms[this.rid - 1])
    })
    this.$axios.get('comments', {
      params: {
        rid: this.rid
      }
    }).then(res => {
      this.comments = JSON.parse(res).slice()
    }).catch(res => {
      this.showErr('获取评论失败，请检查网络设置')
      for (let item of this.mock_comments) {
        if (item.rid === this.rid) {
          this.comments.push(item)
        }
      }
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
      if (!this.comment_content.length) {
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
          email: '10005@qq.com',
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
