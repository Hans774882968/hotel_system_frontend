<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="inner_container">
        <div v-if="room_info.hasOwnProperty('hotel')" class="book_info">
          <div class="book_title">
            <h1 class="hotel_name">{{ room_info.hotel.hname }}</h1>
            <p class="addr"><el-icon class="el-icon-location"></el-icon>&nbsp;{{ room_info.hotel.addr }}</p>
            <el-rate v-model="room_info.hotel.star" disabled></el-rate>
            <h2 class="room_title">{{ room_info.roomtype }}</h2>
            <div class="room_base_info">
              <span class="tag"><i class="fa fa-square"></i>&nbsp;房间号：{{ room_info.number }}</span>
              <span class="tag"><i class="fa fa-bell"></i>&nbsp;早餐：{{ room_info.breakfast }}</span>
              <span class="tag"><i class="fa fa-user"></i>&nbsp;人数上限：{{ room_info.people_lim }}</span>
            </div>
          </div>
          <div class="announce">
            <h3>订房必读</h3>
            <i class="fa fa-exclamation-circle"></i>&nbsp;<span>该房间不提供加婴儿床</span>
          </div>
          <!--订单表单-->
          <div class="book_form">
            <div class="date">
              <!--<div class="search_row">-->
                <!--<span>入住日期</span>-->
                <!--<div class="row_right">-->
                  <!--<input v-model="BookForm.inDate" type="date" class="search_input" />-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="search_row">-->
                <!--<span>退房日期</span>-->
                <!--<div class="row_right">-->
                  <!--<input v-model="BookForm.outDate" type="date" class="search_input" />-->
                <!--</div>-->
              <!--</div>-->
              <el-date-picker
                v-model="dateArr"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="入住日期"
                end-placeholder="退房日期">
              </el-date-picker>
            </div>
            <div class="guest_info">
              <el-input
                v-model="BookForm.custName"
                placeholder="住客姓名" />
              <el-input
                v-model="BookForm.custNum"
                placeholder="住客人数" />
            </div>
          </div>
        </div>
        <!--右侧展示价格-->
        <div class="price">
          <span>1间*{{ day_calc }}晚</span>
          <p>价格：￥{{ room_info.price }}</p>
          <div>
            <h1>应付总额</h1>
            <span>￥{{ room_info.price * day_calc }}</span>
          </div>
        </div>
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
      room_info: {},
      dateArr: '',
      BookForm: {
        custName: '',
        inDate: '',
        outDate: '',
        custNum: 0,
        rType: 0
      }
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
      let dat = res.data
      if (dat === '') {
        this.jump_to_404()
        return
      }
      this.room_info = Object.assign({}, dat)
    }).catch(res => {
      this.showErr(`获取房间信息失败：${res}`)
    })
  },
  computed: {
    day_calc () {
      let res = (new Date(this.dateArr[1]) - new Date(this.dateArr[0])) / 86400000
      if (Number.isNaN(res)) return 0
      return res
    }
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
    submit_dingdan () {
      [this.BookForm.inDate, this.BookForm.outDate] = this.dateArr
      this.$axios.post('/dingdan/order', this.BookForm).then(res => {
        let dat = res.data
        if (dat === '下单成功') {
          this.$router.push({
            name: 'Room',
            params: {
              rid: this.rid
            }
          }).catch(res => {
            this.showErr(`房间页面跳转失败：${res}`)
          })
        }
      }).catch(res => {
        this.showErr(`下单失败：${res}`)
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
  background-color: #f5f7fa;
  min-height: 200vh;
}
.inner_container{
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin-left: calc((100% - 80%) / 2);
  padding: 1rem 0;
}
.book_title{
  margin-bottom: 1rem;
}
.book_info{
  flex: 1;
  background-color: white;
  padding: 0 1rem 1rem 1rem;
  text-align: left;
}
.book_info .hotel_name{
  color: #0f294d;
  font-size: 24px;
}
.book_info .addr{
  font-weight: 600;
}
.room_base_info{
  display: flex;
}
.room_base_info .tag{
  margin-right: 1.5rem;
}
.announce{
  border-top: 1px solid #ddd;
}
.announce h3{
  margin-bottom: 0.3rem;
}
.book_form{
  border-top: 1px solid #ddd;
  margin-top: 1rem;
  padding-top: 1rem;
}
.book_form .date{
  display: flex;
}
.date .search_row{
  display: flex;
  justify-content: center;
  margin: 0.75rem 0;
  font-size: 14px;
}
/*右侧展示价格*/
.price{
  width: 30%;
  margin-left: 2rem;
  background-color: white;
  position: sticky;
  top: 1rem;
}
</style>
