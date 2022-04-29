import request from '@/utils/request'
import { IILoginUser, IOLoginInfo, LoginResponse } from '@/api/types/login'

// 获取登录信息
export const reqLoginInfoG = () => request.get<IOLoginInfo>('admin/login/info')

// 获取验证码
export const reqCaptchaG = () => request.get<Blob>('admin/captcha_pro', {
  stamp: new Date().getTime()
}, {
  responseType: 'blob'
})

// 登录
export const reqLoginP = (data: IILoginUser) => request.post<LoginResponse>('admin/login', data)
