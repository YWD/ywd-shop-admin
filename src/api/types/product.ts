export interface ProductCategory {
  id: number
  pid: number
  cate_name: string
  sort: number
  pic: string
  is_show: number
  show: boolean,
  add_time: string
  big_pic: string
  html: string
}

export interface ProductStockCategory {
  type: number
  name: string
  count: number
}

export interface Product {
  id: number
  mer_id: number
  image: string
  recommend_image: string
  slider_image: string[]
  store_name: string
  store_info: string
  keyword: string
  bar_code: string
  cate_id: string
  price: string
  vip_price: string
  ot_price: string
  postage: string
  unit_name: string
  sort: number
  sales: number
  stock: string
  is_show: number
  is_hot: number
  is_benefit: number
  is_best: number
  is_new: number
  add_time: number
  is_postage: number
  is_del: number
  mer_use: number
  give_integral: string
  cost: string
  is_seckill: number
  is_bargain: any
  is_good: number
  is_sub: number
  is_vip: number
  ficti: number
  browse: number
  code_path: string
  soure_link: string
  video_link: string
  temp_id: number
  spec_type: number
  activity: string
  spu: string
  label_id: string
  command_word: string
  collect: number
  likes: number
  visitor: number
  cate_name: string
  stock_attr: boolean
}

export interface ProductType {
  type: number
  name: string
  count: number
}

export interface ProductListParams {
  page?: number
  limit?: number
  cate_id?: number
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  store_name?: string
  sales?: 'normal' | 'desc' | 'asc'
}

export interface AttrRuleValue {
  value: string
  detail: string[]
  inputVisible?: boolean
  inputValue?: string
}

export interface ProductAttrTpl {
  id: number
  attr_name: string
  rule_name: string
  attr_value: string[]
  rule_value: AttrRuleValue[]
}

export interface IExpressTemplate {
  id: number
  name: string
}

export interface AttrTableHeader {
  align: string
  key: string
  minWidth: number
  title: string
}

export type ProductAttr = Record<string, any> & {
  pic: string
  vip_price: number
  price: number
  cost: number
  ot_price: number
  stock: number
  bar_code: string
  weight: number
  volume: number
  brokerage: number
  brokerage_two: number
}

export interface ProductReply {
  id: number
  uid: number
  oid: number
  unique: string
  product_id: number
  reply_type: string
  product_score: number
  service_score: number
  comment: string
  pics?: string[]
  add_time: string
  merchant_reply_content?: string
  merchant_reply_time?: number
  is_del: number
  is_reply: number
  nickname: string
  avatar: string
  store_name: string
  image: string
  account: string
  time: string
  create_time: string
  score: number
}
