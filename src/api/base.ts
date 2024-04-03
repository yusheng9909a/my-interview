import axios from "axios";
import { notification } from 'antd';
const service = axios.create({
  baseURL: "http://localhost:6001/"
})

// 请求拦截
service.interceptors.request.use(config => {
  return config
}, err => {
  notification.error(err)
  Promise.reject(err)
})

// 拦截响应
service.interceptors.response.use(response => {
  return response?.data
}, err => {
  notification.error(err)
  Promise.reject(err)
})

export default service
