import request from '@/utils/request'
import { AdminResponse } from '@/api/types/common'
import { Admin, FormAdmin, IOption } from '@/api/types/admin'

// 添加管理员
export const createAdmin = (admin: FormAdmin) => request.post<AdminResponse>('admin/setting/admin', admin)
// 删除管理员
export const deleteAdmin = (id: number) => request.delete<AdminResponse>('admin/setting/admin/' + id)
// 编辑管理员
export const editAdmin = (admin: FormAdmin) => request.put('admin/setting/admin/' + admin.id, admin)
// 管理员列表
export const getAdmins = (query: any) => request.get<{
  count: number,
  list: Admin[]
}>('admin/setting/admin', query)
// 修改管理员状态
export const editAdminStatus = (admin: Admin) => request.put('admin/setting/set_status/' + admin.id + '/' + admin.status)
// 获取角色类型列表
export const getRoleTypes = () => request.get('admin/setting/admin/create')
  .then(data => {
    const roles = data.rules.find((item: any) => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options as IOption[]
    }
    return [] as IOption[]
  })
// 获取管理员信息
export const getAdmin = () => request.get('admin/setting/admin/59/edit')
