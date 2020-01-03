
import request, {  } from '../utils/request'

export interface Login {
    code: number
    info: string
    data: LoginData[]
}

export interface LoginData {
    name: string,
    role: string,
    permission: any[]
}

export interface LoginApi {
    data: any[]
}

export function login<T>(params: object) {
  return request({
    url: '/login/login.json',
    method: 'get',
    params
  })
}
