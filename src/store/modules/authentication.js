/* eslint-disable no-shadow */
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from '@/helpers/axios-api';
import { VueAuthenticate } from 'vue-authenticate';

Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: process.env.NODE_ENV === 'production' ?
    'http://kosk-blog.herokuapp.com' : 'http://localhost:5000',
  tokenName: 'access_token',
  providers: {
    github: {
      clientId: '3396cb8c1d4881671456',
      redirectUri: process.env.NODE_ENV === 'production' ?
        'http://kosk-blog.herokuapp.com/blog/' : 'http://localhost:8080/blog/',
    },
    google: {
      clientId: '116668393631-ctvnag7amgnp2rqqb2vm79arcrjcm3sr.apps.googleusercontent.com',
      redirectUri: process.env.NODE_ENV === 'production' ?
        'http://kosk-blog.herokuapp.com/blog/' : 'http://localhost:8080/blog/',
    },
  },
});

const state = {
  userId: '',
  username: '',
  isAdmin: false,
};

const mutations = {
  SET_USER(state, payload) {
    state.userId = payload.userId;
    state.username = payload.username;
    state.isAdmin = payload.isAdmin;
  },
};

const actions = {
  authenticate({ commit }, payload) {
    return vueAuth.authenticate(payload.provider).then(() => {
      if (payload.provider === 'github') {
        return Vue.axios.get('https://api.github.com/user')
          .then(response => Vue.axios.post('/api/users/', {
            name: response.data.login,
            provider: payload.provider,
            email: response.data.email,
            isAdmin: false,
          })).then((response) => {
            if (vueAuth.isAuthenticated()) {
              commit('SET_USER', {
                userId: response.data._id,
                username: response.data.name,
                isAdmin: response.data.isAdmin,
              });
            } else {
              throw new Error('Проблема с плагином авторизации.');
            }
          }).catch((error) => {
            vueAuth.logout();
            throw error;
          });
      } else if (payload.provider === 'google') {
        return Vue.axios.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
          .then(response => Vue.axios.post('/api/users/', {
            name: response.data.name,
            provider: payload.provider,
            email: response.data.email,
            isAdmin: false,
          })).then((response) => {
            if (vueAuth.isAuthenticated()) {
              commit('SET_USER', {
                userId: response.data._id,
                username: response.data.name,
                isAdmin: response.data.isAdmin,
              });
            } else {
              throw new Error('Проблема с плагином авторизации.');
            }
          }).catch((error) => {
            vueAuth.logout();
            throw error;
          });
      }
      throw new Error('Нет такого способа авторизации.');
    });
  },

  register({ commit }, payload) {
    return vueAuth.register(payload)
      .then((response) => {
        if (vueAuth.isAuthenticated()) {
          commit('SET_USER', {
            userId: response.data.user._id,
            username: response.data.user.name,
            isAdmin: response.data.user.isAdmin,
          });
        } else {
          throw new Error('Проблема с плагином авторизации.');
        }
      })
      .catch((error) => {
        throw error;
      });
  },

  login({ commit }, payload) {
    return vueAuth.login(payload)
      .then((response) => {
        if (vueAuth.isAuthenticated()) {
          commit('SET_USER', {
            userId: response.data.user._id,
            username: response.data.user.name,
            isAdmin: response.data.user.isAdmin,
          });
        } else {
          throw new Error('Проблема с плагином авторизации.');
        }
      })
      .catch((error) => {
        throw error;
      });
  },

  authLogout({ commit }) {
    return vueAuth.logout().then(() => {
      if (!vueAuth.isAuthenticated()) {
        commit('SET_USER', {
          userId: '',
          username: '',
          isAdmin: '',
        });
      } else {
        throw new Error('Проблема с плагином авторизации.');
      }
    }).catch((error) => {
      throw error;
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
