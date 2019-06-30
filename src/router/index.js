
import cache from '../utils/cache'


import Vue from 'vue'
import Router from 'vue-router'

import layout from '../pages/layout/index'

Vue.use(Router)

export const addRoutes = [
      // {
      //   path: '/one-1',
      //   name: 'one-1',
      //   component: layout,
      //   redirect: '/two-1',
      //   meta: {
      //     title: '一级菜单1',
      //     icon: '',
      //     // cache: false,
      //   },
      //   children: [
      //     {
      //       path: '/two-1',
      //       name: '二级菜单',
      //       redirect: '/three-1',
      //       component: ()=> import( '../pages/layout/components/app-main' ),
      //       children: [
      //         {
      //           path: '/three-1',
      //           name: '三级级菜单-1',
      //           component: ()=> import( '../pages/asideBar/three' ),
      //         }
      //       ]
      //     },
      //   ]
      // },
      // {
      //   path: '/one-2',
      //   name: '一级菜单-2',
      //   component: layout
      // },
  {
    path: '/',
    name: '/',
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
    ]
  },
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
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const menu = [

  { path: '/test', name: 'test', component: ()=> import( '../pages/test/test' ) },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: ()=> import( '../pages/login/login' )
  // },
]


const router = new Router({
  routes: whiteList
})

export default router
