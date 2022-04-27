export type IResponse<T = any> = {
  code: number,
  msg: string,
  data: T
}

export interface ILoginInfo {
  login_logo: string,
  logo_rectangle: string,
  logo_square: string
}
