
import cache from '../utils/cache'


import Vue from 'vue'
import Router from 'vue-router'

import layout from '../pages/layout/index'

Vue.use(Router)

export const addRoutes = [
  {
    path: '/',
    name: 'index',
    component: layout,
    meta: {
      title: '首页',
      icon: '',
      role: '',
      // cache: false,
      // hidden: false,
    },
  },
  {
    path: '/components',
    name: 'components',
    component: layout,
    meta: {
      title: '组件',
      icon: '',
      role: '',
      // cache: false,
      // hidden: false,
    },
    children: [
      {
        path: '/count-down',
        name: 'count-down',
        component: ()=> import( '../components/count-down' ),
        meta: {
          title: '倒计时',
          icon: '',
          role: '',
          // cache: false,
          // hidden: false,
        },
      },
      {
        path: '/download',
        name: 'download',
        component: ()=> import( '../components/download' ),
        meta: {
          title: '下载',
          icon: '',
          role: '',
          // cache: false,
          // hidden: false,
        },
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


const whiteList = [
  // { path: '/', name: 'index', component: ()=> import( '../pages/layout/index' ) },
  {
    path: '/login', name: 'login', component: ()=> import( '../pages/login/login' ),
    meta: {
      title: '后台管理-登录',
      icon: '',
      role: '',
      // cache: false,
      // hidden: false,
    },
  },
  {
    path: '/404', name: '404', component: ()=> import( '../pages/error/404' ),
    meta: {
      title: '错误',
      icon: '',
      role: '',
      // cache: false,
      // hidden: false,
    },
  }
]

export const menu = [

  { path: '/test', name: 'test', component: ()=> import( '../pages/test/test' ) },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: ()=> import( '../pages/login/login' )
  // },
]


const r = new Router({
  routes: whiteList
})
// console.log(r, 'r')
// const newRouter = new Router({
//   routes: whiteList
// })
// export function resetRouter() {
//   router.matcher = newRouter.matcher
// }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: whiteList
})

const router = createRouter()

// console.log(router, 'router')
// console.log(r===router, 'r===router')

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
