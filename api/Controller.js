'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.list = async (ctx) => {
  const posts = await Post.find({}).sort([['date', -1]]);

  if (!posts) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = posts;
  }
};

exports.listCategories = async (ctx) => {
  const categories = await Post.find({}, 'category');

  if (!categories) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = categories;
  }
};

exports.listByCategory = async (ctx) => {
  const posts = await Post.find({'category': ctx.params.category}).sort([['date', -1]]);

  if (!posts) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = posts;
  }
};


exports.create = async (ctx) => {
  const post = Post.create(ctx.request.body);

  const response = await post;

  if (!response) {
      throw new Error('Post failed to be created.');
  } else {
      ctx.body = response;
  }
};

exports.read = async (ctx) => {
  const post = await Post.find({'code': ctx.params.postCode});

  if (!post) {
    throw new Error("There was an error retrieving your post.");
  } else {
    ctx.body = post;
  }
};
