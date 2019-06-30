
import request from '../utils/request'

export function login(params) {
  return request({
    url: '/login/login.json',
    method: 'get',
    params
  })
}
