
import _ from 'lodash'
import router, { addRoutes, resetRouter } from "../../router"
// utils
import cache from '../../utils/cache'
import { isObject } from "../../utils/data-type-check"
// api
import {login} from "../../api/login"


function partRoleFilter(partPerm, partRole=[]) {
    if(Array.isArray(partPerm)){
        for(let item of partPerm){
            if(item.children){
                partRoleFilter(item.children, partRole)
            }
            if(item.path) {
                partRole.push(item.path)
            }
        }
    }
    return partRole
}

function allRoleFilter(permObj) {
  let allRoleList = []
  if(isObject(permObj)){
    Object.keys(permObj).forEach(item=> {
      // console.log(partRoleFilter(permObj[item]), '部分权限')
      allRoleList=allRoleList.concat(partRoleFilter(permObj[item]))
    })
  }
  // console.log(allRoleList, '所有权限')
  return allRoleList
}

function accessRoutes(addRoutes, permission) {
  let arr = addRoutes.filter(item=> {
    if(allRoleFilter(permission).includes(item.name)){
      if(item.children && item.children.length) {
        item.children = accessRoutes(item.children, permission)
      }
      return true
    }
    return false
  })
  // console.log(arr, 'arr')
  return arr
}
export interface UseState {
    name: string
    roleName: string
    permission: object
    loginInfo: string
    addRoutes: any[]
    roleList: any[]
}

export default {
  namespaced: true,
  state: {
    // name: '',
    // roleName: '',
    // permission: [],
    // loginInfo: null,
    name: cache.get('userInfo') ? cache.get('userInfo').name : '', // user name
    roleName: cache.get('userInfo') ? cache.get('userInfo').role : '', // role name
    permission: cache.get('userInfo') ? cache.get('userInfo').permission : {}, //
    loginInfo: cache.get('loginInfo') ? cache.get('loginInfo') : null, // name and pass
    addRoutes: [], // 动态路由挂载列表
    roleList: [], // 可用权限列表
  } as UseState,
  mutations: {
  },
  actions: {
    login({ state }, loginInfo) {

      if(loginInfo) {
        cache.set('loginInfo', loginInfo)
        state.loginInfo = loginInfo
      }
      return new Promise((resolve, reject) => {
        login(loginInfo).then(res=> {
            // console.log(res.data, 'res login')
          const userInfo = res.data.filter(item=> loginInfo.name === item.name)
          if(userInfo.length>0) {
            const {name, role, permission} = userInfo[0]
            // cache
            cache.set('userInfo', userInfo)
            // store
            state.name = name
            state.roleName = role
            state.permission = permission

            // state.addRoutes = addRoutes
            // router.addRoutes(addRoutes)
            // 权限判定
            // console.log(accessRoutes(addRoutes, permission), 'accessRoutes(permission)')
            state.addRoutes = accessRoutes(addRoutes, permission)
            // console.log(state.addRoutes, 'state.addRoutes')
            router.addRoutes(state.addRoutes)

            res.data = userInfo
            resolve(res)
          }
          else {
            reject(`登录失败，登录信息为空`)
          }
        }).catch(err=> {
          console.log(err, 'login err')
          reject(err)
        })
      })
    },
    logout({state}) {
      cache.rm('userInfo')
      cache.rm('loginInfo')

      state.loginInfo = null
      state.name = ''
      state.roleName = ''
      state.permission = []
      state.addRoutes = []
      resetRouter()
      return new Promise((resolve, reject) => {
        resolve('登出成功')
      })
    }
  },
  getters: {
    addRoutes: state=> state.addRoutes
  }
}
