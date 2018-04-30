'use strict';
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');

var app = module.exports = new koa();

// Logger
app.use(logger());

// Serve static files
app.use(serve(path.join(__dirname, '/dist')));

// Compress
app.use(compress());

var port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port ' + port);
