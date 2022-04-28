import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeIndex from '../views/home/HomeIndex.vue'
import LoginIndex from '../views/login/LoginIndex.vue'
import AppLayout from '@/layout/AppLayout.vue'
import HtmlTest from '@/views/test/HtmlTest.vue'
import productRoute from './modules/product'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeIndex
      },
      productRoute
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  },
  {
    path: '/test',
    name: 'test',
    component: HtmlTest
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  nprogress.start()
})

router.afterEach(() => {
  nprogress.done()
})

export default router
