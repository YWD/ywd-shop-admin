import axios, { AxiosRequestConfig } from 'axios'
import type { AdminResponse } from '@/api/types/common'
import { ElMessage, ElMessageBox } from 'element-plus'
import useMainStore from '@/store/store_index'
import router from '@/router/router-index'

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const mainStore = useMainStore()
  if (mainStore.user && mainStore.user.token) {
    if (!config.headers) config.headers = {}
    config.headers.Authorization = `Bearer ${mainStore.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

let tokenExpire = false
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const status = response.data.status
  // 正常响应直接返回
  if (!status || status === 200) return response
  // 登录过期
  if (status === 410000 && !tokenExpire) {
    tokenExpire = true
    ElMessageBox.confirm('登录过期，点击确定重新登录。', '登录过期')
      .then(() => {
        const mainStore = useMainStore()
        mainStore.setUser(null)
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      }).finally(() => {
        tokenExpire = false
      })
  } else { // 其它后台错误提示
    ElMessage.error(response.data.msg)
  }
  return Promise.reject(response)
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default {
  get: async <T = any>(url: string, params?: any, config?: AxiosRequestConfig) => {
    const rsp = await request.get<AdminResponse>(url, {
      params,
      ...config
    })
    return (rsp.data.data || rsp.data) as T
  },
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const rsp = await request.post<AdminResponse>(url, data, config)
    return (rsp.data.data || rsp.data) as T
  },
  delete: async <T = any>(url: string, config?: AxiosRequestConfig) => {
    const rsp = await request.delete<AdminResponse>(url, config)
    return (rsp.data.data || rsp.data) as T
  },
  put: async <T = any>(url: string, data: any, config?: AxiosRequestConfig) => {
    const rsp = await request.put<AdminResponse>(url, data, config)
    return (rsp.data.data || rsp.data) as T
  }
}
