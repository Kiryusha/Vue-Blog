'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  code: String,
  date: {
    type: Date,
    default: Date.now
  },
  category: String,
  previewPicture: String,
  previewText: String,
  detailText: String,
  username: String,
  userId: String,
});

module.exports = mongoose.model('Post', PostSchema);
