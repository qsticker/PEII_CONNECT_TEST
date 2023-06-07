import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    //alias: ['/login'],
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/LoginView.vue'),
  },
  {
    path: '/register',
    //alias: ['/login'],
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/RegisteView.vue'),
  }

  //{
    //path: '/about',
    //name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
