import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from '../components/Login'
import Register from '../components/Register'
import Room from '../components/Room'
import Hotel from '../components/Hotel'
import Book from '../components/Book'
import NotFound from '../components/NotFound'
import AliPay from '../components/AliPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/room/:rid',
      name: 'Room',
      component: Room
    },
    {
      path: '/hotel/:hid',
      name: 'Hotel',
      component: Hotel
    },
    {
      path: '/book/:rid',
      name: 'Book',
      component: Book
    },
    {
      path: '/pay/:tot_price',
      name: 'AliPay',
      component: AliPay
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
