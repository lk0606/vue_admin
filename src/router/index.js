import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRouter = [
  // {
  //   path: '/',
  //   name: 'constantRouter',
  //   component: ()=> import( '../pages/constantRouter' )
  // },
  {
    path: '/',
    name: 'index',
    component: ()=> import( '../pages/layout/index' )
  },
  {
    path: '/one-1',
    name: '一级菜单-1',
    component: ()=> import( '../pages/asideBar/one' ),
    children: [
      {
        path: '/two/1',
        name: '二级菜单-1',
        component: ()=> import( '../pages/asideBar/two' ),
        children: [
          {
            path: '/three',
            name: '三级菜单',
            component: ()=> import( '../pages/asideBar/three' )
          },
        ]
      },
      {
        path: '/two/2',
        name: '二级菜单-2',
        component: ()=> import( '../pages/asideBar/two2' )
      },
    ]
  },
  {
    path: '/one-2',
    name: '一级菜单-2',
    component: ()=> import( '../pages/asideBar/one2' )
  },
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
