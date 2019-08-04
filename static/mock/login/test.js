const addRoutes = [
  {
    path: '/',
    name: 'index',
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
const test = [
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '权限',
      icon: 'lock',
      role: '',
      // cache: false,
      // hidden: false,
    },
    children: [
      {
        path: '/t',
        name: 't',
      }
    ]
  },
]
const obj =
  {
    addRoutes,
    test
  }
let tree = [
  {
    "name": "首页",
    "path": "index"
  },
  {
    "name": "组件",
    "path": "components",
    "children": [
      {
        "name": "倒计时",
        "path": "count-down"
      },
      {
        "name": "表格",
        "path": "table"
      },
      {
        "name": "播放器",
        "path": "video-player"
      }
    ]
  },
  {
    "name": "权限",
    "path": "auth",
    "children": [
      {
        "name": "权限配置",
        "path": "auth-config"
      },
      {
        "name": "游客权限",
        "path": "auth-visitor"
      }
    ]
  }
]
function getAllPath(tree, arr=[]) {
  for(let item of tree){
    if(item.path) {
      arr.push(item.path)
    }
    if(item.children){
      getAllPath(item.children, arr)
    }
  }
  return arr
}
console.log(getAllPath(tree), 'getAllPath(tree)')
// getAllPath(tree)
// console.log(arr)
let access=[]
function add(addRoutes) {
  return addRoutes.filter(item=> {
    if(getAllPath(tree).includes(item.name)){
      return item
    }
    if(item.children){
     return item.children=add(item.children)
    }
  })
}
// console.log(access, 'access')
console.log(add(addRoutes), 'add')
function getAll() {
  let all = []
  Object.keys(obj).forEach(item=> {
    all=all.concat(add(obj[item]))
  })
  return all
}
// console.log(getAll(), 'all')
