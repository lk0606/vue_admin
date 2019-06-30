
import router,{ addRoutes } from './router'
import store from './store'
import cache from "./utils/cache";

let whiteList = ['/login', '/404']

router.beforeEach((to, from, next)=> {
  // console.log(to, from, next, 'router.beforeEach')
  // 已登录 且页面是登录
  if(cache.get('userInfo') && cache.get('loginInfo')){
    if(to.path==='/login') {
      // router.addRoutes(addRoutes)
      next('/')
    } else {
      // store.dispatch('user/login', cache.get('loginInfo')).then(res=> {
        next()
      // })
    }
  }
  else {
    if(whiteList.indexOf(to.path)===-1) {
      next('/login')
    } else {
      next()
    }
  }
})
