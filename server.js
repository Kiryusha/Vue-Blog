'use strict';
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const koaRes = require('koa-res');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./api/models/Post');
const routes = require('./api/routes');
const app = module.exports = new koa();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kosk-blog:ZXC510YUPp!@ds163119.mlab.com:63119/kosk-blog');

app.use(logger());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '/dist')));
app.use(convert(koaRes()));
// Хер знает, как сочетать с этим
// app.use(compress());

routes(app);

const port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port ' + port);