import axios from 'axios'
import type { IResponse } from '@/api/types/common'

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(config.baseURL)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default {
  get: async <T>(url: string) => {
    const rsp = await request.get<IResponse>(url)
    return rsp.data.data as T
  }
}
