import { RouteRecordRaw, RouterView } from 'vue-router'

const route: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  children: [
    {
      path: 'role',
      name: 'permission-role',
      component: () => import('@/views/settings/permission/role/RoleIndex.vue')
    },
    {
      path: 'admin',
      name: 'permission-admin',
      component: () => import('@/views/settings/permission/admin/AdminIndex.vue')
    },
    {
      path: 'rule',
      name: 'permission-rule',
      component: () => import('@/views/settings/permission/rule/RuleIndex.vue')
    }
  ]
}

export default route
