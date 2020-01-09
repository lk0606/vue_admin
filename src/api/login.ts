
import request, { Res } from '../utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'

export interface Data {
    name: string,
    role: string,
    permission: any[]
}
export interface LoginData {
    code: number
    info: string
    data: Data[]
}

export function login(params: object): Promise<LoginData> {
    return request({
    url: '/login/login.json',
    method: 'get',
    params
  })
}
