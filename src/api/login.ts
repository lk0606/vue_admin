
import request, { Res } from '../utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

export interface LoginData {
    name: string,
    role: string,
    permission: any[]
}

export function login(params: object): AxiosPromise<LoginData[]> {
    return request({
    url: '/login/login.json',
    method: 'get',
    params
  })
}
