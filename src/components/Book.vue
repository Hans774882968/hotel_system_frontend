<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="info">
      <div class="hotel_info">
        <h1 class="hotel_name">{{ hotel_info.name }}</h1>
        <p><el-icon class="el-icon-location"></el-icon>{{ hotel_info.address }}</p>
        <el-rate v-model="hotel_info.star" disabled></el-rate>
      </div>
      <div class="room_info">
        <p>hid：{{ room_info.hid }}</p>
        <p>房间号：{{ room_info.number }}</p>
        <p>房间类型：{{ room_info.roomtype }}</p>
        <p>早餐：{{ room_info.breakfast }}</p>
        <p>人数上限：{{ room_info.people_lim }}</p>
        <p>￥{{ room_info.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'Book',
  components: {Navbar},
  data () {
    return {
      rid: -1,
      hotel_info: {
        address: '上海',
        name: '维也纳酒店',
        star: 3
      },
      room_info: {rid: -1},
      mock_hotels: [
        {
          address: '上海',
          name: '维也纳酒店',
          star: 3
        },
        {
          address: '成都',
          name: '如家酒店',
          star: 4
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
          img: '/static/room_img/rm1.png'
        },
        {
          rid: 2,
          hid: 1,
          roomtype: '单人间',
          breakfast: '有',
          people_lim: 3,
          price: 11.9,
          number: '1002',
          img: '/static/room_img/rm2.png'
        },
        {
          rid: 3,
          hid: 2,
          roomtype: '单人间',
          breakfast: '有',
          people_lim: 1,
          price: 10.9,
          number: '3001',
          img: '/static/room_img/rm3.png'
        },
        {
          rid: 4,
          hid: 2,
          roomtype: '单人间',
          breakfast: '有',
          people_lim: 3,
          price: 11.9,
          number: '3002',
          img: '/static/room_img/rm4.png'
        },
        {
          rid: 5,
          hid: 1,
          roomtype: '单人间',
          breakfast: '有',
          people_lim: 3,
          price: 12.9,
          number: '1003',
          img: '/static/room_img/rm4.png'
        }
      ]
    }
  },
  created () {
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
      this.room_info = Object.assign({}, this.mock_rooms[this.rid - 1])
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

</style>
