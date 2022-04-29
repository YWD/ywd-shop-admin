import request from '@/utils/request'
import { IILoginUser, IOLoginInfo, LoginResponse } from '@/api/types/login'
import { IResponse } from '@/api/types/common'

// 获取登录信息
export const loginInfo = () => request.get<IOLoginInfo>('admin/login/info')

// 获取验证码
export const captcha = () => request.get<Blob>('admin/captcha_pro', {
  stamp: new Date().getTime()
}, {
  responseType: 'blob'
})

// 登录
export const login = (data: IILoginUser) => request.post<LoginResponse>('admin/login', data)

// 退出登录
export const logout = () => request.get<IResponse>('admin/setting/admin/logout')
