export type AdminResponse<T = any> = {
  code: number,
  msg: string,
  data: T
}
