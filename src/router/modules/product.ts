import { RouteRecordRaw, RouterView } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'product',
  component: RouterView,
  meta: {
    title: '商品'
  },
  children: [
    {
      path: 'list',
      name: 'product_list',
      component: () => import('@/views/product/list/ProductList.vue'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: 'classify',
      name: 'product_classify',
      component: () => import('@/views/product/classify/ProductClassify.vue'),
      meta: {
        title: '商品分类'
      }
    },
    {
      path: 'attr',
      name: 'product_attr',
      component: () => import('@/views/product/attr/ProductAttr.vue'),
      meta: {
        title: '商品规格'
      }
    },
    {
      path: 'reply',
      name: 'product_reply',
      component: () => import('@/views/product/reply/ProductReply.vue'),
      meta: {
        title: '商品评论'
      }
    }
  ]
}

export default route
