import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './modules/index'

Vue.use(VueRouter)

export const baseRoutes = [
  {
    path: '/',
    redirect: {
      name: 'StartUp'
    }
  },
  {
    path: '/StartUp',
    name: 'StartUp',
    component: () => import('../components/Layout/startUp.vue')
  },
  // {
  //   path: '/Index',
  //   name: 'Index',
  //   component: () =>
  //     import(/* webpackChunkName: "Index" */ '../../views/Index/Index.vue')
  // },
  {
    path: '/Login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login/Index.vue')
  },
  {
    // 密码重置
    name: 'resetPassword',
    path: '/resetPassword',
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ '../views/Login/resetPassword.vue'
      )
  },
  {
    path: '/Register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Login/Register.vue')
  }
]

/**
 * 需要权限的路由
 * array.flat(n) 多个数组拉平返回一个数组, Infinity 无论多少层嵌套都转成一维数组
 * @type {Array}
 */
export const asyncRoutes = [index].flat(Infinity)

const createRouter = () =>
  new VueRouter({
    mode: 'history', // 需要开启服务
    scrollBehavior: () => ({ y: 0 }),
    routes: baseRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
