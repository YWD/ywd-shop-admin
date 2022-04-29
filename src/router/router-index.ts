import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeIndex from '../views/home/HomeIndex.vue'
import LoginIndex from '../views/login/LoginIndex.vue'
import AppLayout from '@/layout/AppLayout.vue'
import HtmlTest from '@/views/test/HtmlTest.vue'
import productRoute from './modules/product'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useMainStore from '@/store/store_index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true
    },
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

router.beforeEach((to) => {
  nprogress.start()
  const mainStore = useMainStore()
  if (to.meta.requiresAuth && !mainStore.user) {
    console.log('去登录')
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
