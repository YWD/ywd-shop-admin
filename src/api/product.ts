import request from '@/utils/request'
import { Product, ProductCategory, ProductStockCategory } from '@/api/types/product'
import { PageData } from '@/api/types/common'

// 获取商品分类
export const getProductCategories = (type: string = '1') => request.get<ProductCategory[]>('admin/product/category/tree/' + type)
// 获取商品类型
export const getProductStockCategories = () => request.get<{ list: ProductStockCategory[] }>('admin/product/product/type_header')
// 获取商品列表
export const getProducts = (query?: { [key: string]: number | string }) => request.get<PageData<Product>>('admin/product/product', query)
