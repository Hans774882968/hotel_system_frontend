<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <p>{{ hid }}</p>
      <div class="hotel_info">
        <p>地址：{{ hotel_info.location }}</p>
        <p>名称：{{ hotel_info.name }}</p>
        <el-rate v-model="hotel_info.star" disabled></el-rate>
        <img class="hotel_img" :src="hotel_info.img" :alt="hotel_info.name" />
      </div>
      <div class="rooms">
        <div class="room" v-for="(item,idx) in rooms" :key="idx">
          <p>房间号：{{ item.number }}</p>
          <p>早餐：{{ item.breakfast }}</p>
          <p>人数上限：{{ item.people_lim }}</p>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Hotel',
  components: {Navbar},
  data: function () {
    return {
      hid: -1,
      hotel_info: {
        location: '上海',
        name: '维也纳酒店',
        star: 3,
        img: ''
      },
      rooms: [
        {
          breakfast: '无',
          people_lim: 1,
          price: 10.9,
          number: '1001'
        },
        {
          breakfast: '有',
          people_lim: 3,
          price: 11.9,
          number: '1002'
        }
      ],
      mock_hotels: [
        {
          location: '上海',
          name: '维也纳酒店',
          star: 3,
          img: '/static/hotel_img/1.jpg'
        },
        {
          location: '广州',
          name: '如家酒店',
          star: 4,
          img: '/static/hotel_img/2.jpg'
        }
      ]
    }
  },
  created () {
    this.hid = parseInt(this.$route.params.hid)
  },
  mounted () {
    this.$axios.get(`/hotel?id=${this.hid}`, {
      params: {}
    }).then(res => {
      Object.assign(this.hotel_info, res)
    }).catch(res => {
      this.showErr(res)
      Object.assign(this.hotel_info, this.mock_hotels[this.hid - 1])
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
  min-height: 100vh;
}
.hotel_info{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
}
.hotel_info .hotel_img{
  width: 40rem;
  height: 19rem;
}
.rooms{
  width: 80%;
  background-color: white;
  margin: 1rem 0;
}
</style>
