
import cache from '../utils/cache'


import Vue from 'vue'
import Router from 'vue-router'

import layout from '../pages/layout/index'

Vue.use(Router)

export const addRoutes = [
  {
    path: '/index',
    name: 'index',
    component: layout,
    meta: {
      title: '首页',
      icon: 'monitor',
      role: '',
      // cache: false,
      // hidden: false,
    },
  },
  {
    path: '/components',
    name: 'components',
    // redirect: '/components/count-down',
    component: layout,
    meta: {
      title: '组件',
      icon: 'attract',
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
          icon: 'alarm-clock',
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
          icon: 'download',
          role: '',
          // cache: false,
          // hidden: false,
        },
      },
      {
        path: '/table',
        name: 'table',
        component: ()=> import( '../components/table' ),
        meta: {
          title: '表格',
          icon: 's-grid',
          role: '',
          // cache: false,
          // hidden: false,
        },
      },
      {
        path: '/video-player',
        name: 'video-player',
        component: ()=> import( '../components/video-player' ),
        meta: {
          title: 'vue-player',
          icon: 'video-camera',
          role: '',
          // cache: false,
          // hidden: false,
        },
      },
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: layout,
    meta: {
      title: '权限',
      icon: 'lock',
      role: '',
      // cache: false,
      // hidden: false,
    },
    children: [
      {
        path: '/auth-config',
        name: 'auth-config',
        component: ()=> import( '../pages/auth/auth-config' ),
        meta: {
          title: '权限配置',
          // icon: 'lock',
          role: '',
          // cache: false,
          // hidden: false,
        }
      },
      {
        path: '/auth-visitor',
        name: 'auth-visitor',
        component: ()=> import( '../pages/auth/auth-visitor' ),
        meta: {
          title: 'visitor-权限',
          // icon: 'lock',
          role: 'visitor',
          // cache: false,
          // hidden: false,
        }
      },
      {
        path: '/auth-admin',
        name: 'auth-admin',
        component: ()=> import( '../pages/auth/auth-admin' ),
        meta: {
          title: 'admin-权限',
          // icon: 'lock',
          role: 'admin',
          // cache: false,
          // hidden: false,
        }
      },
      {
        path: '/auth-superAdmin',
        name: 'auth-superAdmin',
        component: ()=> import( '../pages/auth/auth-super-admin' ),
        meta: {
          title: 'superAdmin-权限',
          // icon: 'lock',
          role: 'superAdmin',
          // cache: false,
          // hidden: false,
        }
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

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: whiteList
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
