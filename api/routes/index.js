'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const Controller = require('../Controller');
  const router = new Router();

  router.get('/api/', Controller.list)
        .get('/api/categories/', Controller.listCategories)
        .get('/api/category/:category/', Controller.listByCategory)
        .get('/api/:postCode/', Controller.read)
        .post('/api/', Controller.create);

  app.use(router.routes());
};
