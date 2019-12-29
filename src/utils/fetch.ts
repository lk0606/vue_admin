import axios from 'axios';
import qs from 'qs';
import {Message} from 'element-ui';
import store from '../store';
import router from '../router';

// 创建axios实例
axios.defaults.withCredentials = true;
// console.log(process.env.BASE_API)
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 20000,                  // 请求超时时间
    withCredentials: true
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (store.getters.token) {
    //     config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        // console.log(response)
        if (response.data && response.data.success) {
            // console.log(response)
            return response.data;
        }
        else if(response.data &&response.data.code === 0){
            return response.data;
        }
        else if(response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8'){
          // debugger
          return response;
        }
        else {
            Message({
                message: response.data.info,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(response.data);
        }
    },
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject(error);
    //     } else {
    //       return response.data;
    //     }
    error => {

        if(error.response && error.response.status === 401) { // 没有登录，跳转到登录页面
            console.log(error.response.headers.requires_auth_url)
            const url = error.response.headers.requires_auth_url;
            const p = encodeURI(window.location.href);

            window.location.href = url + p;
            return;
        } else if (error.response && error.response.status === 403) { // 登录成功，但是登录账号没有该系统的权限
            router.push('/401');
            return;
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
)

export function formPost (url, data) {
  return service({
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url,
  })
}

export default service;
