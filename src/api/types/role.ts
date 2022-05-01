export interface FormRole {
  id: number
  role_name: string
  checked_menus: number[]
  status: number
}

export interface Role {
  id: number
  role_name: string
  rules: string
  level: number
  status: number
}

export interface RoleList {
  count: number
  list: Role[]
}

export interface Menu {
  pid: number
  id: number
  title: string
  children: Menu[]
  expand?: boolean
}
