export type AdminResponse<T = any> = {
  code: number,
  msg: string,
  data: T
}

export type PageData<T = any> = {
  list: T[],
  count: number
}
