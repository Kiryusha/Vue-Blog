'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const RateLimit = require('koa2-ratelimit').RateLimit;
  const Controller = require('../Controller');
  const router = new Router();

  const getLimiter = RateLimit.middleware({
    interval: { min: 15 },
    max: 100,
    message: 'Превышено максимальное количество GET запросов по этому IP за 15 мин',
  });

  const postLimiter = RateLimit.middleware({
    interval: { min: 15 },
    max: 25,
    message: 'Превышено максимальное количество POST/PUT запросов по этому IP за 15 мин',
  });

  router.get('/api/categories/', getLimiter, Controller.listCategories)
        .get('/api/categories/:category/:page/', getLimiter, Controller.listPostsByCategory)
        .get('/api/posts/post/:post/', getLimiter, Controller.getPost)
        .get('/api/posts/:page/', getLimiter, Controller.listPosts)
        .post('/auth/:provider/', postLimiter, Controller.auth)
        .post('/auth/login/', postLimiter, Controller.auth)
        .post('/auth/register/', postLimiter, Controller.auth)
        .post('/api/posts/', postLimiter, Controller.createPost)
        .post('/api/users/', postLimiter, Controller.createUser)
        .post('/api/posts/:code/delete/', postLimiter, Controller.deletePost)
        .put('/api/posts/', postLimiter, Controller.updatePost);

  app.use(router.routes());
};
