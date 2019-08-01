
import NProgress from 'nprogress'


import router,{ addRoutes } from './router'
import store from './store'
import cache from "./utils/cache";

let whiteList = ['/login', '/404']

router.beforeEach((to, from, next)=> {
  NProgress.start()
  // console.log(to, from, next, 'router.beforeEach')
  // console.log(store.state, 'store.state.addRoutes')
  // 已登录 且页面是登录
  // debugger
  if(cache.get('userInfo') && cache.get('loginInfo')){
    // debugger
    if(to.path==='/login') {
      next('/')
    } else if(store.state.user.addRoutes.length<=0){
      store.dispatch('user/login', cache.get('loginInfo')).then(res=> {
        next({...to})
      })
    } else {
      next()
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

router.afterEach(() => {
  NProgress.done()
});
