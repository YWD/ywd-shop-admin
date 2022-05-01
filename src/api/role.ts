import request from '@/utils/request'
import { FormRole, Menu, Role, RoleList } from '@/api/types/role'

// 获取角色列表
export const getRoles = (query: Record<string, any>) => request.get<RoleList>('admin/setting/role', query)
// 获取菜单
export const getMenus = () => request.get<{ menus: Menu[] }>('admin/setting/role/create')
// 添加角色
export const createRole = (role: FormRole) => request.post('admin/setting/role/' + role.id, role)
// 获取角色
export const getRole = (id: number) => request.get<{ role: Role, menus: Menu[] }>('admin/setting/role/' + id + '/edit')
