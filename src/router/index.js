import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 解决访问重复路由报错问题：NavigationDuplicated: Avoided redundant navigation to current location: "/xxx" 开始 */
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/* 解决访问重复路由报错问题：NavigationDuplicated: Avoided redundant navigation to current location: "/xxx" 结束 */

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
//每次用户请求都需要创建一个新的 router 实例
//创建 createRouter 工厂函数
export function createRouter() {
  return new VueRouter({
    routes
  })
}
