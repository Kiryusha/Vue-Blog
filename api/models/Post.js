'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
