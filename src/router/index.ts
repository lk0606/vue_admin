
import cache from '../utils/cache'


import Vue from 'vue'
import Router from 'vue-router'

import layout from '../components/layout/index.vue'

Vue.use(Router)

export const addRoutes = [
    {
        path: '/',
        name: '/',
        // redirect: { name: '/' },
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
        path: '/theme',
        name: 'theme',
        // redirect: { name: 'theme' },
        component: layout,
        meta: {
            title: '主题',
            icon: 'orange',
            role: '',
            // cache: false,
            // hidden: false,
        },
    },
    {
        path: '/components',
        name: 'components',
        // redirect: '/components/canvas-compress',
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
                path: '/canvas-compress',
                name: 'canvas-compress',
                component: ()=> import( '../components/canvas-compress' ),
                meta: {
                    title: '图片压缩',
                    icon: 'scissors',
                    role: '',
                    // cache: false,
                    // hidden: false,
                },
            },
            {
                path: '/count-down',
                name: 'count-down',
                component: ()=> import( '../components/count-down.vue' ),
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
                component: ()=> import( '../components/download.vue' ),
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
                component: ()=> import( '../components/table/index.vue' ),
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
                component: ()=> import( '../components/video-player.vue' ),
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
                // component: ()=> import( '../pages/auth/auth-config.vue' ),
                component: ()=> import( '../components/layout/components/app-main.vue' ),
                meta: {
                    title: '权限配置',
                    // icon: 'lock',
                    role: '',
                    // cache: false,
                    // hidden: false,
                },
                children: [
                    {
                        path: '/auth/visitor',
                        name: 'authVisitor',
                        component: ()=> import( '../pages/auth/auth-admin1.vue' ),
                        meta: {
                            title: 'visitor-权限',
                            // icon: 'lock',
                            role: 'visitor',
                            // cache: false,
                            // hidden: false,
                        }
                    },
                    {
                        path: '/auth/admin',
                        name: 'authAdmin',
                        component: ()=> import( '../pages/auth/auth-admin2.vue' ),
                        meta: {
                            title: 'admin-权限',
                            // icon: 'lock',
                            role: 'admin',
                            // cache: false,
                            // hidden: false,
                        }
                    },
                    {
                        path: '/auth/superAdmin',
                        name: 'authSuperAdmin',
                        component: ()=> import( '../pages/auth/auth-admin3.vue' ),
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
            {
                path: '/auth-visitor',
                name: 'auth-visitor',
                component: ()=> import( '../pages/auth/auth-visitor.vue' ),
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
                component: ()=> import( '../pages/auth/auth-admin.vue' ),
                meta: {
                    title: 'admin-权限',
                    // icon: 'lock',
                    role: 'admin',
                    // cache: false,
                    // hidden: false,
                }
            },
            {
                path: '/auth-super-admin',
                name: 'auth-super-admin',
                component: ()=> import( '../pages/auth/auth-super-admin.vue' ),
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
    {
        path: '/test',
        name: 'test',
        component: layout,
        meta: {
            title: '测试',
            icon: 'lock',
            role: '',
            // cache: false,
            // hidden: false,
        },
        children: [
            {
                path: '/test1',
                name: 'test1',
                component: ()=> import( '../pages/test/test.vue' ),
                meta: {
                    title: 'test',
                    // icon: 'lock',
                    role: '',
                    // cache: false,
                    // hidden: false,
                }
            },
            {
                path: '/tree',
                name: 'tree',
                component: ()=> import( '../pages/test/tree.vue' ),
                meta: {
                    title: 'tree',
                    // icon: 'lock',
                    role: '',
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
        path: '/login', name: 'login', component: ()=> import( '../pages/login/login.vue' ),
        meta: {
            title: '后台管理-登录',
            icon: '',
            role: '',
            // cache: false,
            // hidden: false,
        },
    },
    {
        path: '/404', name: '404', component: ()=> import( '../pages/error/404.vue' ),
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

    { path: '/test', name: 'test', component: ()=> import( '../pages/test/test.vue' ) },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: ()=> import( '../pages/login/login' )
    // },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: whiteList
})

const router: any = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter: any = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router
