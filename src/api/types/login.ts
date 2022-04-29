// 登录用户
export interface LoginUser {
  account: string,
  pwd: string,
  imgcode: string
}
// 登录信息
export interface LoginInfo {
  login_logo: string,
  logo_rectangle: string,
  logo_square: string
}

// 用户信息
export interface UserInfo {
  id: number
  account: string
  head_pic: string
  token?: string
}

export interface Children3 {
  path: string
  title: string
  icon: string
  header: string
  is_header: number
  auth?: string[]
}
export interface Children2 {
  path: string
  title: string
  icon: string
  header: string
  is_header: number
  auth?: string[]
  children?: Children3[]
}
export interface Children {
  path: string
  title: string
  icon: string
  header: string
  is_header: number
  auth?: string[]
  children?: Children2[]
}

export interface Menu {
  path: string
  title: string
  icon: string
  header: string
  is_header: number
  children?: Children[]
}

export interface LoginResponse {
  token: string
  expires_time: number
  menus: Menu[]
  unique_auth: string[]
  user_info: UserInfo
  logo: string
  logo_square: string
  version: string
  newOrderAudioLink: string
}
