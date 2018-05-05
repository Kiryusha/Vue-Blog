'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const Controller = require('../Controller');
  const router = new Router();

  router.get('/api/categories/', Controller.listCategories)
        .get('/api/categories/:category/', Controller.listByCategory)
        .get('/api/posts/:post/', Controller.read)
        .get('/api/posts/', Controller.list)
        .post('/auth/:provider/', Controller.auth)
        .post('/api/posts/', Controller.create)
        .post('/api/users/', Controller.createUser)
        .delete('/api/posts/:code/', Controller.deletePost);

  app.use(router.routes());
};
