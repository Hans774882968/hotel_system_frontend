<template>
  <div>
    <div class="hotel_item" v-for="(hotel,idx) in hotels" :key="idx">
      <div class="pic_div">
        <img class="pic" :src="hotel.hpicture" />
      </div>
      <div class="hotel_info">
        <h1 class="hotel_name">{{ hotel.hname }}</h1>
        <p><el-icon class="el-icon-location"></el-icon>{{ hotel.addr }}</p>
        <el-rate v-model="hotel.star" disabled></el-rate>
        <p>{{ (hotel.d / 1000).toFixed(3) }} km</p>
        <el-button class="btn" type="primary" @click="jump_to_hotel(hotel.hid)">查看详情</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotelList',
  props: {
    hotels: Array
  },
  methods: {
    jump_to_hotel (hid) {
      let {href} = this.$router.resolve({
        name: 'Hotel',
        params: {
          hid: hid
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped>
  .hotel_item {
    background-color: white;
    margin-bottom: 1rem;
    display: flex;
  }
  .hotel_item:hover{
    box-shadow: 0 8px 10px 0 rgba(15,41,77,.08)
  }
  .pic_div{
    display: flex;
    width: 12rem;
    height: 11rem;
    margin: 1rem;
  }
  .pic{
    width: 100%;
    height: 100%;
  }
  .hotel_info{
    flex: 1;
    text-align: left;
  }
  .hotel_info > h1,.hotel_info > p{
    margin-bottom: 0.5rem;
  }
  .hotel_info > p{
    margin-top: 0.5rem;
  }
  .hotel_name{
    color: #0f294d;
    font-size: 24px;
  }
  .btn{
    margin-top: 0.5rem;
  }
</style>
