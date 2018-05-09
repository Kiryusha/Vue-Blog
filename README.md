# kosk-blog

> Blog written on Vue.js, Koa.js and MongoDB.
> Boilerplate used as base: https://github.com/vuejs-templates/webpack


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

# it also requires ./api/secrets.json file with:
# mongoDB uri (mongoUri)
# admin user mongodb _id (adminId)
# github app secret (githubSecret)
# google app secret (googleSecret)
# if you don't have original one, you should also change client id's of
# github and google apps in:
# ./api/Provider.js
# ./src/store/index.js

```
