<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <p>{{ hid }}</p>
      <div class="hotel_info">
        <h1 class="hotel_name">{{ hotel_info.hname }}</h1>
        <p><el-icon class="el-icon-location"></el-icon>{{ hotel_info.addr }}</p>
        <el-rate v-model="hotel_info.star" disabled></el-rate>
        <div class="hotel_headcontext">
          <img class="hotel_img" :src="hotel_info.hpicture" :alt="hotel_info.hname" />
          <div class="map">
            <Map :hotels="[
              {
                location: [hotel_info.longitude,hotel_info.latitude],
                name: hotel_info.hname
              }
            ]"></Map>
          </div>
        </div>
      </div>
      <div class="rooms">
        <div class="room" v-for="(item,idx) in rooms" :key="idx">
          <div class="left">
            <img :src="item.img"  class="room_img" />
          </div>
          <div class="right">
            <p>房间号：{{ item.number }}</p>
            <p>房间类型：{{ item.roomtype }}</p>
            <p>早餐：{{ item.breakfast }}</p>
            <p>人数上限：{{ item.people_lim }}</p>
            <p>￥{{ item.price }}</p>
            <el-button type="primary" @click="jump_to_room(item.rid)">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Map from './Map'
export default {
  name: 'Hotel',
  components: {Navbar, Map},
  data: function () {
    return {
      hid: -1,
      hotel_info: {},
      rooms: [],
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
    this.hid = parseInt(this.$route.params.hid)
  },
  mounted () {
    if (Number.isNaN(this.hid)) {
      this.jump_to_404()
      return
    }
    this.$axios.get('/hotel/gethotel', {
      params: {
        hid: this.hid
      }
    }).then(res => {
      if (res.data === '') {
        this.jump_to_404()
      } else {
        this.hotel_info = Object.assign({}, res.data)
      }
      // Object.assign(this.rooms, res.rooms)
    }).catch(res => {
      this.showErr(`获取失败：${res}`)
      // dbg
      for (let item of this.mock_rooms) {
        if (item.hid === this.hid) {
          this.rooms.push(item)
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
    jump_to_404 () {
      this.$router.replace({
        name: 'NotFound'
      }).catch(res => {
        this.showErr(`404页面跳转失败：${res}`)
      })
    },
    jump_to_room (rid) {
      this.$router.push({
        name: 'Room',
        params: {
          rid: rid
        }
      }).catch(res => {
        this.showErr('跳转失败')
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
.hotel_info .hotel_name{
  color: #0f294d;
  font-size: 20px;
}
.hotel_info .hotel_headcontext{
  display: flex;
  padding: 1rem;
}
.hotel_headcontext .hotel_img{
  width: 40rem;
  height: 25rem;
}
.hotel_headcontext .map{
  margin-left: 1rem;
  background-color: antiquewhite;
  flex: 1;/* 自适应 */
}
.rooms{
  width: 80%;
  margin-bottom: 1rem;
  background-color:darkgrey;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem;
}
.rooms .room{
  background-color:white;
  display: flex;
}
.room .room_img{
  width: 20rem;
  height: 10rem;
}
</style>
