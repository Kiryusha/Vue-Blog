'use strict';
module.exports = function(app) {
  const Router = require('koa-router');
  const Controller = require('../Controller');
  const router = new Router();

  router.get('/api/', Controller.list)
        .post('/api/', Controller.create);

  router.get('/api/:postCode', Controller.read);

  app.use(router.routes());
};
