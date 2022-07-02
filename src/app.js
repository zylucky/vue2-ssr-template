import Vue from "vue";
import App from './App.vue'
import { createRouter } from "./router";
import { createStore } from "./store";
import { sync } from "vuex-router-sync"

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  // 创建router实例
  const router = createRouter()
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    // 注入 router 到根 vue 实例
    router,
    store,
    // 根据实例简单的渲染用用程序组件
    render: h => h(App)
  })
  // 返回 app 和 router
  return { app, router, store }
}