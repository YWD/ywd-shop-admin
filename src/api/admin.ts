import request from '@/utils/request'
import { AdminResponse } from '@/api/types/common'
import { Admin } from '@/api/types/admin'

// 添加管理员
export const createAdmin = (admin: Partial<Admin>) => request.post<AdminResponse>('admin/setting/admin', admin)
// 删除管理员
export const deleteAdmin = (id: number) => request.delete<AdminResponse>('admin/setting/admin/' + id)
// 编辑管理员
export const editAdmin = (admin: Partial<Admin>) => request.put('admin/setting/admin/' + admin.id, admin)
// 管理员列表
export const getAdmins = (query: any) => request.get<{
  count: number,
  list: Admin[]
}>('admin/setting/admin', query)
