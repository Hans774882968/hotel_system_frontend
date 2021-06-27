<template>
  <div>
    <div class="hotel_item" v-for="(hotel,idx) in hotels" :key="idx">
      <img class="pic" :src="hotel.hpicture" />
      <div class="hotel_info">
        <h1 class="hotel_name">{{ hotel.hname }}</h1>
        <p><el-icon class="el-icon-location"></el-icon>{{ hotel.addr }}</p>
        <el-rate v-model="hotel.star" disabled></el-rate>
        <el-button type="primary" @click="jump_to_hotel(hotel.hid)">查看详情</el-button>
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
  }
  .hotel_item:hover{
    box-shadow: 0 8px 10px 0 rgba(15,41,77,.08)
  }
  .pic{
    width: 4rem;
    height: 4rem;
  }
</style>
