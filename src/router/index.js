import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
import SalesSummary from '../views/reports/SalesSummary.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/sales-summary',
    name: 'SalesSummary',
    component: SalesSummary
  },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
