export type IResponse<T = any> = {
  code: number,
  msg: string,
  data: T
}
