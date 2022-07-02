// 仅运行于服务器
import { createApp } from "./app"

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 合适服务端 router 的位置
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到路由，执行reject函数，并返回404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            router: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state

        resolve(app)
      })
    }, reject)
  })
}