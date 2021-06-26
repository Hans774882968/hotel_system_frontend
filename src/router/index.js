import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from '../components/Login'
import Register from '../components/Register'
import Room from '../components/Room'
import Hotel from '../components/Hotel'
import Map from '../components/Map'

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
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
