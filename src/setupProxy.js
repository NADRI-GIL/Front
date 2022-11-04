const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://naveropenapi.apigw.ntruss.com',
      changeOrigin: true,
      pathRewrite:{
        '^/api/':'/'
      },
    })
  );
  app.use(
    createProxyMiddleware('/api1', {
      target: 'https://infuser.odcloud.kr/oas/docs?namespace=15101253/v1/',
      changeOrigin: true,
      pathRewrite:{
        '^/api1/':'/'
      },
    })
  );

};