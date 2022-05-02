import request from '@/utils/request'
import { LoginUser, LoginInfo, LoginResponse } from '@/api/types/login'
import { AdminResponse } from '@/api/types/common'

// 获取登录信息
export const getLoginInfo = () => request.get<LoginInfo>('admin/login/info')

// 获取验证码
export const getCaptcha = () => request.get<Blob>('admin/captcha_pro', {
  stamp: new Date().getTime()
}, {
  responseType: 'blob'
})

// 登录
export const login = (data: LoginUser) => request.post<LoginResponse>('admin/login', data)

// 退出登录
export const logout = () => request.get<AdminResponse>('admin/setting/admin/logout')
