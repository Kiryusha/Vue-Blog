'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const Controller = require('../Controller');
  const router = new Router();

  router.get('/api/posts/', Controller.list)
        .get('/api/categories/', Controller.listCategories)
        .get('/api/categories/:category/', Controller.listByCategory)
        .get('/api/posts/:post/', Controller.read)
        .post('/api/posts/', Controller.create);

  app.use(router.routes());
};
