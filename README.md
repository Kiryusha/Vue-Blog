# kosk-blog

> Blog written on Vue.js, Koa.js and MongoDB.
> Boilerplate used as base: https://github.com/vuejs-templates/webpack

## Features
* Vue.js frontend with vue-router and vuex (used for user management)
* Koa.js driven REST api
* Role-based authentication (admin and users)
* Social services authentication
* Remote mongo database at https://mlab.com/
* Jest/vue test utils unit test (WIP)

## Build Setup

``` bash
# install dependencies
yarn

# server and webpack
yarn full

# only server
yarn start

# only webpack
yarn dev

# build for production with minification
yarn build

# it also requires .env (dotenv) file with:
# admin_id=(adminId)
# mongodb_uri=(mongoUri)
# github_secret=(githubSecret)
# google_secret=(googleSecret)
# if you don't have original one, you should also change client id's of
# github and google apps in:
# ./api/Provider.js
# ./src/store/index.js

```
