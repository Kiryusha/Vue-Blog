const Axios = require('axios');
const req = require('request-promise');
const config = require('./config.json');
const OAuth = require('oauth');
const timestamp = require('unix-timestamp');
const oauthSignature = require('oauth-signature');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.githubAuth = async (ctx) => {
  const request = Axios.post('https://github.com/login/oauth/access_token', {
    client_id: config.auth.github.clientId,
    client_secret: config.auth.github.clientSecret,
    code: ctx.request.body.code,
    redirect_uri: ctx.request.redirectUri,
    state: ctx.request.state,
    grant_type: 'authorization_code'
  }, { 'Content-Type': 'application/json' });
  const response = await request;

  if (!response) {
    throw new Error('Something went wrong with github');
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
      client_id: config.auth.google.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: ctx.request.body.redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
  const response = await request;

  if (!response) {
    throw new Error('Something went wrong with github');
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
  const existingUser = await User.findOne(ctx.request.body);

  if (!existingUser) {
    ctx.body = {
      success: false,
      message: 'Неправильный e-mail или пароль.',
    };
  } else {
    ctx.body = {
      success: true,
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
      success: true,
      message: 'Пользователь успешно зарегистрирован.',
      user,
      access_token: 'super_reliable_token',
    };
  } else {
    ctx.body = {
      success: false,
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
