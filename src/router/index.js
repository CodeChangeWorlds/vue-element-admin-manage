import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/manage',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/admin/UserManage'),
        name: 'RolePermission',
        meta: {
          title: '权限管理',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true,
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: 'el-icon-s-goods',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goods/GoodsList'),
        name: 'goodsList',
        meta: {
          title: '商品列表',
          roles: ['admin']
        }
      },
      {
        path: 'editGoods/:id',
        component: () => import('@/views/goods/GoodsForm'),
        name: 'edit',
        hidden: true,
        meta: {
          title: '商品编辑',
          roles: ['admin']
        }
      },
      {
        path: 'addGoods',
        component: () => import('@/views/goods/GoodsForm'),
        name: 'addGoods',
        meta: {
          title: '商品新增',
          roles: ['admin']
        }
      }
    ]
  },
  // 广告中心模块
  {
    path: '/bannerManage',
    component: Layout,
    alwaysShow: true,
    name: 'banner',
    meta: {
      title: '广告中心',
      icon: 'el-icon-picture-outline',
      roles: ['admin']
    },
    children: [
      {
        path: 'banner',
        component: () => import('@/views/banner/BannerManage'),
        name: 'banner',
        meta: {
          title: '轮播图管理',
          roles: ['admin']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
