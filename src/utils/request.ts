/* eslint-disable */

import axios from 'axios'
import qs from 'qs'

// const httpAgent = new http.Agent({ keepAlive: true });
// create an axios instance
const service = axios.create({
  // baseURL: 'http://localhost:8080', // api的base_url
  baseURL: '/static/mock', // api的base_url
  timeout: 1000000, // request timeout/
  // headers: {
  //   // 'lk-auth': 'lk-admin '
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Content-Type': 'application/json'
  // },
})

// 发送请求前对请求数据进行处理
service.defaults.transformRequest = [function (data) {
  /**
   *axios 默认请求 context-type application/json
   * 后台需要 @request body 进行处理
   * 这里统一使用 qs  格式化数据
   */
  return qs.stringify(data)
  // return data
}]

// 请求拦截器
service.interceptors.request.use(
  config => {
    // config.withCredentials = true
    // config.headers['Authorization'] = 'Admin-Token'
    // do something before request is sent
    return config
  }, error => {
    // do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(res => {
    console.log(res, 'res')
    if(res.headers['content-type'] === 'video/mp4'){
      // debugger
      return res;
    }
    return Promise.resolve(res.data)
    // return res
  },
  err => {
    console.log(err, 'err')
    return Promise.reject(err)
  }
)
export default service
