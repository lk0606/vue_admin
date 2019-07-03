
import router, {addRoutes, menu} from "../../router"
import cache from '../../utils/cache'
// api
import { login } from "../../api/login"

export default {
  namespaced: true,
  state: {
    name: cache.get('userInfo') ? cache.get('userInfo').name : '',
    role: cache.get('userInfo') ? cache.get('userInfo').role : '',
    permission: cache.get('userInfo') ? cache.get('userInfo').permission : [],
    addRoutes: cache.get('addRoutes') ? cache.get('addRoutes') : [],
    loginInfo: cache.get('loginInfo') ? cache.get('loginInfo') : null
  },
  mutations: {
  },
  actions: {
    login({dispatch, commit, state}, loginInfo) {
      // debugger

      if(loginInfo) {
        cache.set('loginInfo', loginInfo)
        state.loginInfo = loginInfo
      }
      return new Promise((resolve, reject) => {
        login(loginInfo).then(res=> {
          // debugger
          const userInfo = res.data.filter(item=> {
            if(loginInfo.name === item.name) {
              return item
            }
          })
          if(userInfo.length>0) {
            const {name, role, permission} = userInfo[0]
            // cache
            cache.set('userInfo', userInfo[0])
            cache.set('addRoutes', addRoutes)
            // store
            state.name = name
            state.role = role
            state.permission = permission

            state.addRoutes = addRoutes
            // debugger
            router.addRoutes(addRoutes)
            // debugger

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
      cache.rm('addRoutes')
      cache.rm('loginInfo')

      state.loginInfo = null
      state.name = ''
      state.role = ''
      state.permission = []
      state.addRoutes = []
      return new Promise((resolve, reject) => {
        resolve('登出成功')
      })
    }
  },
  getters: {
    addRoutes: state=> state.addRoutes
  }
}
