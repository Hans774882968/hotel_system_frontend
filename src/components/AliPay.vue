<template>
  <div>
    <Navbar></Navbar>
    <h2 style="color: #287dfa;font-weight: 600;">应付金额：￥ {{ tot_price }}</h2>
    <img src="/static/qrcode.jpg" />
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  name: 'AliPay',
  components: {Navbar},
  created () {
    this.tot_price = parseFloat(this.$route.params.tot_price)
  },
  data () {
    return {
      tot_price: 0
    }
  }
}
</script>

<style scoped>

</style>
