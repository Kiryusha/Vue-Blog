'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Provider = require('./Provider');
const config = require('./config.json');

exports.listPosts = async (ctx) => {
  const posts = await Post.paginate({}, {
    select: 'title code date category previewPicture previewText username userId',
    sort: '-date',
    page: parseInt(ctx.params.page),
    limit: 5,
  });

  if (!posts) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = posts.docs;
  }
};

exports.listPostsByCategory = async (ctx) => {
  const posts = await Post.paginate({
    'category': ctx.params.category
  }, {
    select: 'title code date category previewPicture previewText username userId',
    sort: '-date',
    page: parseInt(ctx.params.page),
    limit: 5,
  });

  if (!posts) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = posts.docs;
  }
};

exports.listCategories = async (ctx) => {
  const categories = await Post.find({}, 'category');
  const result = [...new Set(Object.values(categories).map(item => item.category))];

  if (!categories) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    ctx.body = result;
  }
};


exports.createPost = async (ctx) => {
  const codesRaw = await Post.find({}, 'code');
  const codes = [...new Set(Object.values(codesRaw).map(item => item.code))];

  if (codes.includes(ctx.request.body.code)) {
    ctx.body = {
      message: 'Новость с этим символьным кодом уже существует.'
    };
  } else {
    const post = Post.create(ctx.request.body);
    const response = await post;

    if (!response) {
        throw new Error('Post failed to be created.');
    } else {
      ctx.body = {
        unique: true,
        message: 'Новость успешно отправлена.'
      };
    }
  }
};

exports.deletePost = async (ctx) => {
  const post = await Post.find({'code': ctx.params.code});

  if (!post) {
    throw new Error("There was an error retrieving your posts.");
  } else {
    if (post.userId === ctx.request.body.userId ||
        ctx.request.body.userId === config.adminId) {
      await Post.find({'code': ctx.params.code}).remove();
      ctx.body = {
        success: true,
        message: 'Новость успешно удалена.'
      };
    } else {
      ctx.body = {
        success: false,
        message: 'Удалять посты может только автор или админ.'
      };
    }
  }
};

exports.getPost = async (ctx) => {
  const post = await Post.find({'code': ctx.params.post},[
    'title',
    'code',
    'date',
    'previewPicture',
    'detailText',
    'username',
    'userId'
  ]);

  if (!post) {
    throw new Error("There was an error retrieving your post.");
  } else {
    ctx.body = post;
  }
};

exports.auth = async (ctx) => {
  switch(ctx.params.provider) {
    case 'github':
      await Provider.githubAuth(ctx);
      break;
    case 'google':
      await Provider.googleAuth(ctx);
      break;
    case 'login':
      await Provider.loginAuth(ctx);
      break;
    case 'register':
      await Provider.registerAuth(ctx);
      break;
  }
};

exports.createUser = async (ctx) => {
  const existingUser = await User.findOne(ctx.request.body);

  if (!existingUser) {
    const newUser = await User.create(ctx.request.body);
    ctx.body = newUser;
  } else {
    ctx.body = existingUser;
  }
};
