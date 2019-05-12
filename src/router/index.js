import Vue from 'vue'
import Router from 'vue-router'

import layout from '../pages/layout/index'

Vue.use(Router)

const constantRouter = [
  // {
  //   path: '/',
  //   name: 'constantRouter',
  //   component: ()=> import( '../pages/constantRouter' )
  // },
  {
    path: '/',
    name: '首页',
    component: layout,
    children: [
      {
        path: '/one-1',
        name: '一级菜单-1',
        component: ()=> import( '../pages/layout/appMain' ),
        // redirect: '/two-1',
        children: [
          {
            path: '/two-1',
            name: '二级菜单',
            // redirect: '/three-1',
            component: ()=> import( '../pages/layout/appMain' ),
            children: [
              {
                path: '/three-1',
                name: '三级级菜单-1',
                component: ()=> import( '../pages/asideBar/three' ),
                // children: [
                //   {
                //     path: '/three-1',
                //     name: '三级级菜单-1',
                //     component: ()=> import( '../pages/asideBar/three' ),
                //     children: [
                //       {
                //         path: '/three-1',
                //         name: '三级级菜单-1',
                //         component: ()=> import( '../pages/asideBar/three' ),
                //       }
                //     ]
                //   }
                // ]
              }
            ]
          },
        ]
      },
      {
        path: '/one-2',
        name: '一级菜单-2',
        component: ()=> import( '../pages/asideBar/one2' )
      },
    ]
  }
]


const asyncRouter = [
  {
    path: '/asyncRouter',
    name: 'asyncRouter',
    component: ()=> import( '../pages/asyncRouter' )
  }
]

export default new Router({
  routes: constantRouter
})
