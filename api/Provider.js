const Axios = require('axios');
const req = require('request-promise');
const OAuth = require('oauth');
const timestamp = require('unix-timestamp');
const oauthSignature = require('oauth-signature');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.githubAuth = async (ctx) => {
  const request = Axios.post('https://github.com/login/oauth/access_token', {
    client_id: '3396cb8c1d4881671456',
    client_secret: process.env.github_secret,
    code: ctx.request.body.code,
    redirect_uri: ctx.request.redirectUri,
    state: ctx.request.state,
    grant_type: 'authorization_code',
  }, { 'Content-Type': 'application/json' });
  const response = await request;

  if (!response) {
    ctx.status = 500;
    ctx.body = {
      message: 'Что-то не так с гитхабом.',
    };
  } else {
    const responseJson = parseQueryString(response.data);

    if (responseJson.error) {
      ctx.body = { error: responseJson.error };
    } else {
      ctx.body = responseJson;
    }
  }
}

exports.googleAuth = async (ctx) => {
  const request = req({
    method: 'post',
    url: 'https://accounts.google.com/o/oauth2/token',
    form: {
      code: ctx.request.body.code,
      client_id: '116668393631-ctvnag7amgnp2rqqb2vm79arcrjcm3sr.apps.googleusercontent.com',
      client_secret: process.env.google_secret,
      redirect_uri: ctx.request.body.redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
  const response = await request;

  if (!response) {
    ctx.status = 500;
    ctx.body = {
      message: 'Что-то не так с гуглом.',
    };
  } else {
    const responseJson = JSON.parse(response);

    if (responseJson.error) {
      ctx.body = { error: responseJson.error };
    } else {
      ctx.body = responseJson;
    }
  }
};

exports.loginAuth = async (ctx) => {
  const existingUser = await User.findOne({
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  });

  if (!existingUser) {
    ctx.status = 400;
    ctx.body = {
      message: 'Неправильный e-mail или пароль.',
    };
  } else {
    ctx.body = {
      user: existingUser,
      access_token: 'super_reliable_token',
    };
  }
};

exports.registerAuth = async (ctx) => {
  const existingUser = await User.findOne({
    provider: 'native',
    email: ctx.request.body.email,
  });

  if (!existingUser) {
    const user = await User.create({
      provider: 'native',
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    });
    ctx.body = {
      message: 'Пользователь успешно зарегистрирован.',
      user,
      access_token: 'super_reliable_token',
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      message: 'Пользователь с таким e-mail уже зарегистрирован',
    };
  }
};

function parseQueryString(str) {
  let obj = {};
  let key;
  let value;
  (str || '').split('&').forEach((keyValue) => {
    if (keyValue) {
      value = keyValue.split('=');
      key = decodeURIComponent(value[0]);
      obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
    }
  });
  return obj;
};
