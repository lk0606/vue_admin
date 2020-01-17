
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

export interface Res<T = any> {
    code: number
    info: string
    data: T

    // filter(param: (item) => boolean)
}

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
service.defaults.transformRequest = [ (data: object): string=> {
  /**
   * axios 默认请求 context-type application/json
   * 后台需要 @request body 进行处理
   * 这里统一使用 qs  格式化数据
   */
  return qs.stringify(data)
  // return data
}]

// 请求拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
    // config.withCredentials = true
    // config.headers['Authorization'] = 'Admin-Token'
    // do something before request is sent
    return config
    // return Promise.resolve(config)
  }, (err: any) => Promise.reject(err)
)
// 响应拦截器
service.interceptors.response.use((res: AxiosResponse<any>): AxiosResponse<Res> => {
    console.log(res, 'res')
    if(res.headers['content-type'] === 'video/mp4'){
      // debugger
      return res
    } else {
        // return Promise.resolve(res.data)
        return res.data
    }

  },
    (err: any) => {
    console.log(err, 'err')
    return Promise.reject(err)
    // return err
  }
)
export default service
