<!--<template>-->
  <!--<div>-->
    <!--<div class="input" >-->
      <!--<h4>欢迎评论</h4>-->
      <!--<input-->
        <!--type="text"-->
        <!--placeholder="点击评论"-->
        <!--v-model="commenter"-->
        <!--class="commenter"-->
      <!--/>-->
      <!--<textarea-->
        <!--placeholder="请输入评价内容..."-->
        <!--v-model="comment"-->
      <!--&gt;</textarea>-->
      <!--<button @click="submit_comment" class="submit_btn" >提交评论</button>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import Navbar from './Navbar'-->
<!--export default {-->
  <!--name: 'Index',-->
  <!--components: {Navbar},-->
  <!--data: function () {-->
    <!--return {-->
      <!--commenter: '',-->
      <!--comment: '',-->
      <!--comments: []-->
    <!--}-->
  <!--},-->
  <!--submit_comment () {-->
    <!--let roomId = this.$route.params.id-->
    <!--let postData = this.getPostData()-->
    <!--postData.roomId = roomId-->
    <!--if (this.comment === '' || this.commenter === '') {-->
      <!--alert('评论内容不能为空！')-->
    <!--} else {-->
      <!--this.$http.post('/comments', qs.stringify(postData))-->
        <!--.then(() => {-->
          <!--// 提交评论后刷新页面-->
          <!--this.$router.go(0)-->
        <!--})-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--grtPostData () {-->
      <!--let comment = this.comment-->
      <!--let commenter = this.commenter-->
      <!--let year = this.date.getFullYear()-->
      <!--let month = this.date.getMonth()-->
      <!--let date = this.date.getDate()-->
      <!--let create_time = year + '-' + month + '-' + date-->
      <!--let postData = {-->
        <!--comment,-->
        <!--commenter,-->
        <!--create_time-->
      <!--}-->
      <!--return postData-->
    <!--}-->
  <!--},-->
  <!--router: post('/', function (req, res) {-->
    <!--let roomId = req.body.roomId-->
    <!--let comment = req.body.comment-->
    <!--let author = req.body.commenter-->
    <!--let create_time = req.body.create_time-->
    <!--Comment.create({-->
      <!--comment,-->
      <!--create_time,-->
      <!--author,-->
      <!--roomId-->
    <!--})-->
      <!--.then(() => {-->
        <!--return res.send({-->
          <!--state: 0,-->
          <!--message: '评论成功'-->
        <!--})-->
      <!--})-->
      <!--.catch(err => {-->
        <!--return res.send({-->
          <!--err,-->
          <!--message: '评论失败'-->
        <!--})-->
      <!--})-->
  <!--})-->
  <!--mounted () {-->
    <!--this.$http.get('/comments/getComments')-->
      <!--.then(res => {-->
        <!--let rooms = res.data.rooms-->
        <!--let id = this.$route.params.id-->
        <!--for (let room of rooms) {-->
          <!--if (rooms.id === parseInt(id)) {-->
            <!--this.room = room-->
          <!--}-->
        <!--}-->
        <!--// 看看房间有没有被评论，如果有就放出来-->
        <!--this.comments = this.room.comments-->
        <!--if (this.comments) {-->
          <!--this.isComments = true-->
        <!--}-->
      <!--})-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style>-->

<!--</style>-->
