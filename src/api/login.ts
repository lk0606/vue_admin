
import request from '../utils/request'

export interface Login {
    code: number
    info: string
    data: object
}

export function login(params): Promise<any> {
  return request({
    url: '/login/login.json',
    method: 'get',
    params
  })
}
