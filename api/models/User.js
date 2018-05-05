'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  provider: String,
  name: String,
  email: String,
  password: String,
  posts: Array,
  isAdmin: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
