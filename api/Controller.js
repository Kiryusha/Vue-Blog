'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Provider = require('./Provider');

let config;

if (process.env.admin_id) {
  config = {
    adminId: process.env.admin_id,
  }
} else {
  config = require('./secrets.json');
}


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
  const samePost = await Post.find({'code': ctx.request.body.code});

  if (samePost.length) {
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

exports.updatePost = async (ctx) => {
  const samePost = await Post.findById(ctx.request.body.id);

  if (samePost) {
    if (samePost.userId === ctx.request.body.userId ||
        ctx.request.body.userId === config.adminId) {

      const [sameCode] = await Post.find({'code': ctx.request.body.code});

      if (sameCode && `${sameCode._id}` != `${samePost._id}`) {
        ctx.body = {
          message: 'Новость с этим символьным кодом уже существует.'
        };
      } else {
        const update = await Post.findByIdAndUpdate(
          ctx.request.body.id,
          {
            title: ctx.request.body.title,
            code: ctx.request.body.code,
            category: ctx.request.body.category,
            previewText: ctx.request.body.previewText,
            previewPicture: ctx.request.body.previewPicture,
            detailText: ctx.request.body.detailText,
          }
        );

        if (!update) {
            throw new Error('Post failed to be created.');
        } else {
          ctx.body = {
            success: true,
            message: 'Новость успешно отредактирована.'
          };
        }
      }
    } else {
      ctx.body = {
        message: 'Новость может редактировать только автор или админ.'
      };
    }
  } else {
    ctx.body = {
      success: false,
      message: 'Невозможно редактировать новость, которой нет.'
    };
  }
};



exports.deletePost = async (ctx) => {
  const [post] = await Post.find({'code': ctx.params.code});

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
  const [post] = await Post.find({'code': ctx.params.post});

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
