'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    maxlength: 140,
  },
  code: {
    type: String,
    maxlength: 50,
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    maxlength: 50,
  },
  previewPicture: {
    type: String,
    maxlength: 1000,
  },
  previewText: {
    type: String,
    maxlength: 311,
  },
  detailText: {
    type: String,
    maxlength: 5000,
  },
  username: {
    type: String,
    maxlength: 50,
  },
  userId: {
    type: String,
    maxlength: 200,
  },
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
