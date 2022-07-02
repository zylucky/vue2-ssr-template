const express = require('express');
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();

const serverBundle = require('./dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/client/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.resolve('./public/index.template.html'), 'utf-8');

const render = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
});

app.use(express.static('./dist/client', { index: false }))

app.get('*', (req, res) => {
  const context = {
    title: 'vue2-ssr-template',
    url: req.url
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  render.renderToString(context, (err, html) => {
    console.log(html)
    // 处理异常……
    res.end(html)
  })
})

const port = 3003;
app.listen(port, function () {
  console.log(`server started at localhost:${port}`);
});
