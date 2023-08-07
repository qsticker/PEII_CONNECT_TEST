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
  },
  {
    path: '/verify/:username',
    //alias: ['/login'],
    name: 'verify',
    component: () => import(/* webpackChunkName: "about" */ '@/views/VerifyView.vue'),

  },
  {
    path: '/forgotPassword',
    //alias: ['/login'],
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ForgotPassword.vue'),

  },
  {
    path: '/verifyNewPassword',
    //alias: ['/login'],
    name: 'verifyNewPassword',
    component: () => import(/* webpackChunkName: "about" */ '@/views/VerifyNewPassword.vue'),

  },
  {
    path: '/ShoppingCart',
    //alias: ['/login'],
    name: 'shoppingCart',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ShoppingCart.vue'),

  },
  {
    path: '/Answer',
    //alias: ['/login'],
    name: 'answer',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AnswerGroupView.vue'),
  },
  {
    path: '/AnswerResult',
    //alias: ['/login'],
    name: 'answerResult',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AnswerGroupResult.vue'),
  },
  {
    path: '/ClassficationCommodityList/:type/:classPath',
    //alias: ['/login'],
    name: 'classficationCommodityList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ClassificationCommodityList.vue'),
    //props: true,
  },
  {
    path: '/PurchasedList',
    name: 'purchasedList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/PurchasedList.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
