export interface Admin {
  id?: number
  account: string
  pwd: string
  roles: string
  status: number
  real_name: string
  head_pic: string
  last_ip?: string
  last_time?: number
  add_time: number
  login_count: number
  level: number
  is_del: number
  _add_time: string
  _last_time: string
}
