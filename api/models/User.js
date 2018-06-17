'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  provider: {
    type: String,
    maxlength: 100,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    maxlength: 100,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  posts: Array,
  isAdmin: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
