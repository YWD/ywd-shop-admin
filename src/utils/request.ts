import axios, { AxiosRequestConfig } from 'axios'
import type { IResponse } from '@/api/types/common'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data.status && response.data.status !== 200) {
    ElMessage.error(response.data.msg)
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default {
  get: async <T = any>(url: string, params?: any, config?: AxiosRequestConfig) => {
    const rsp = await request.get<IResponse>(url, {
      params,
      ...config
    })
    return (rsp.data.data || rsp.data) as T
  },

  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
    const rsp = await request.post<IResponse>(url, data, config)
    return (rsp.data.data || rsp.data) as T
  }
}
