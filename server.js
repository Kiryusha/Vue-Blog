'use strict';
const logger = require('koa-logger');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const history = require('koa-connect-history-api-fallback');
const koa = require('koa');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const Post = require('./api/models/Post');
const User = require('./api/models/User');
const routes = require('./api/routes');
const config = require('./api/config.json');
const app = module.exports = new koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

app.use(logger());
app.use(bodyParser());
app.use(history());
app.use(serve(path.join(__dirname, '/dist')));
app.use(cors());

routes(app);

const port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port ' + port);
