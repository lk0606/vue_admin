
import router, { addRoutes, resetRouter } from "../../router"
// utils
import cache from '../../utils/cache'
import { isObject } from "../../utils/data-type-check"
// api
import { login } from "../../api/login"

function allRoleFilter(permObj) {
  let allRoleList = []
  if(isObject(permObj)){
    Object.keys(permObj).forEach(item=> {
      allRoleList.concat(partRoleFilter(permObj[item]))
      console.log(partRoleFilter(permObj[item]), 'partRoleFilter')
    })
  }
  console.log(allRoleList, 'allRoleList')
  return allRoleList
}


function partRoleFilter(partPerm) {
  let partRole
  if(Array.isArray(partPerm)){
    partRole = partPerm.map(item=> {
      if(item.children){
        partRoleFilter(item.children)
      } else {
        return item.path
      }
    })
  }
  console.log(partRole, 'partRole')
  return partRole
}
function accessRoutes() {
  return addRoutes.filter(routes=> {
    allRoleFilter().forEach(role=> {
      if(routes.children){
        accessRoutes()
      } else {
        if(role===routes.path){
          return routes
        }
      }
    })
  })
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
  },
  mutations: {
  },
  actions: {
    login({dispatch, commit, state}, loginInfo) {

      if(loginInfo) {
        cache.set('loginInfo', loginInfo)
        state.loginInfo = loginInfo
      }
      return new Promise((resolve, reject) => {
        login(loginInfo).then(res=> {
          const userInfo = res.data.filter(item=> {
            if(loginInfo.name === item.name) {
              return item
            }
          })
          if(userInfo.length>0) {
            const {name, role, permission} = userInfo[0]
            // cache
            cache.set('userInfo', userInfo)
            // store
            state.name = name
            state.roleName = role
            state.permission = permission

            state.addRoutes = addRoutes
            router.addRoutes(addRoutes)
            // 权限判定
            // debugger
            allRoleFilter(permission)
            console.log(accessRoutes(), 'accessRoutes()')
            // state.addRoutes = accessRoutes()
            // router.addRoutes(state.addRoutes)

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
