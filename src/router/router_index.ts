import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeIndex from '../views/home/HomeIndex.vue'
import LoginIndex from '../views/login/LoginIndex.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: HomeIndex
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
