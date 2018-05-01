'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  code: String,
  date: {
    type: Date,
    default: Date.now
  },
  category: String,
  previewText: String,
  detailText: String,
});

module.exports = mongoose.model('Post', PostSchema);
