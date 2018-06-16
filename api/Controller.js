'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Provider = require('./Provider');

exports.listPosts = async (ctx) => {
  const posts = await Post.paginate({}, {
    select: 'title code date category previewPicture previewText username userId',
    sort: '-date',
    page: parseInt(ctx.params.page),
    limit: 5,
  });

  if (!posts) {
    ctx.status = 500;
    ctx.body = {
      message: 'Ошибка получения новостей.',
    };
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
    ctx.status = 500;
    ctx.body = {
      message: 'Ошибка получения новостей по категории.',
    };
  } else {
    ctx.body = posts.docs;
  }
};

exports.listCategories = async (ctx) => {
  const categories = await Post.find({}, 'category');
  const result = [...new Set(Object.values(categories).map(item => item.category))];

  if (!categories) {
    ctx.status = 500;
    ctx.body = {
      message: 'Ошибка получения категорий.',
    };
  } else {
    ctx.body = result;
  }
};


exports.createPost = async (ctx) => {
  const samePost = await Post.find({'code': ctx.request.body.code});

  if (samePost.length) {
    ctx.status = 400;
    ctx.body = {
      message: 'Новость с этим символьным кодом уже существует.',
    };
  } else {
    const post = Post.create(ctx.request.body);
    const response = await post;

    if (!response) {
      ctx.status = 500;
      ctx.body = {
        message: 'Ошибка отправления новости.',
      };
    } else {
      ctx.body = {
        message: 'Новость успешно отправлена.',
      };
    }
  }
};

// post update
exports.updatePost = async (ctx) => {
  const samePost = await Post.findById(ctx.request.body.id);

  // checking if post exists
  if (samePost) {
    // security checking: only author or admin
    if (samePost.userId === ctx.request.body.userId ||
        ctx.request.body.userId === process.env.admin_id) {

      const [sameCode] = await Post.find({'code': ctx.request.body.code});

      // preventing setting same code as existing posts have, but
      // allowing to change itself
      if (sameCode && `${sameCode._id}` != `${samePost._id}`) {
        ctx.status = 400;
        ctx.body = {
          message: 'Новость с этим символьным кодом уже существует.',
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
          ctx.status = 500;
          ctx.body = {
            message: 'Ошибка создания новости.',
          };
        } else {
          ctx.body = {
            message: 'Новость успешно отредактирована.',
          };
        }
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        message: 'Новость может редактировать только автор или админ.',
      };
    }
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'Невозможно редактировать новость, которой нет.',
    };
  }
};



exports.deletePost = async (ctx) => {
  const [post] = await Post.find({'code': ctx.params.code});

  if (!post) {
    ctx.status = 400;
    ctx.body = {
      message: 'Невозможно удалить новость, которой нет.',
    };
  } else {
    if (post.userId === ctx.request.body.userId ||
        ctx.request.body.userId === process.env.admin_id) {
      await Post.find({'code': ctx.params.code}).remove();
      ctx.body = {
        message: 'Новость успешно удалена.',
      };
    } else {
      ctx.status = 403;
      ctx.body = {
        message: 'Удалять новости может только автор или админ.',
      };
    }
  }
};

exports.getPost = async (ctx) => {
  const [post] = await Post.find({'code': ctx.params.post});

  if (!post) {
    ctx.status = 400;
    ctx.body = {
      message: 'Такой новости не существует.',
    };
  } else {
    ctx.body = {
      post,
    };
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
