const Axios = require('axios');
const Request = require('request');
const config = require('./config.json');
const OAuth = require('oauth');
const timestamp = require('unix-timestamp');
const oauthSignature = require('oauth-signature');

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
