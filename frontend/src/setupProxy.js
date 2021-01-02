const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      secure: false,
      changeOrigin: true,
    })
  )
}
// "proxy": "http://127.0.0.1:5000" u package.json
// "secure": false isto u package. json ali da se obrise setupProxy.js,
