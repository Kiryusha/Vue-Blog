'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const Controller = require('../Controller');
  const router = new Router();

  router.get('/api/categories/', Controller.listCategories)
        .get('/api/categories/:category/:page/', Controller.listPostsByCategory)
        .get('/api/posts/post/:post/', Controller.getPost)
        .get('/api/posts/:page/', Controller.listPosts)
        .post('/auth/:provider/', Controller.auth)
        .post('/auth/login/', Controller.auth)
        .post('/auth/register/', Controller.auth)
        .post('/api/posts/', Controller.createPost)
        .post('/api/users/', Controller.createUser)
        .post('/api/posts/:code/delete/', Controller.deletePost);

  app.use(router.routes());
};
