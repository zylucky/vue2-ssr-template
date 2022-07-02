import Vue from "vue";
import App from './App.vue'
import { createRouter } from "./router";
import { createStore } from "./store";
// 把 Vue Router 当前的 $route 同步为 Vuex 状态的一部分
import { sync } from "vuex-router-sync"

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  // 创建router实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    // 根据实例简单的渲染用用程序组件
    render: h => h(App)
  })
  // 暴露 app, router 和 store
  return { app, router, store }
}