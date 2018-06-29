import Vue from 'vue';
import axios from '@/helpers/axios-api';
import VueAxios from 'vue-axios';
import { VueAuthenticate } from 'vue-authenticate';
import activateUser from '@/helpers/activateUser';

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

const mutations = {
  isAuthenticated(state, payload) {
    state.isAuthenticated = payload.isAuthenticated;
  },
  username(state, payload) {
    state.username = payload.username;
  },
  userId(state, payload) {
    state.userId = payload.userId;
  },
  isAdmin(state, payload) {
    state.isAdmin = payload.isAdmin;
  },
};

const state = {
  isAuthenticated: false,
  username: '',
  userId: '',
  isAdmin: false,
};

const actions = {
  authenticate(context, payload) {
    return vueAuth.authenticate(payload.provider).then(() => {
      context.commit('isAdmin', {
        isAdmin: false,
      });

      if (payload.provider === 'github') {
        return Vue.axios.get('https://api.github.com/user')
          .then(response => Vue.axios.post('/api/users/', {
            name: response.data.login,
            provider: payload.provider,
            email: response.data.email,
            isAdmin: false,
          })).then((res) => {
            activateUser(context, res, vueAuth);
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
          })).then((res) => {
            activateUser(context, res, vueAuth);
          }).catch((error) => {
            vueAuth.logout();
            throw error;
          });
      }
      throw new Error('Нет такого способа авторизации.');
    });
  },

  register(context, payload) {
    return vueAuth.register(payload)
      .then(response =>
        activateUser(context, {
          data: {
            name: response.data.user.name,
            _id: response.data.user._id,
            isAdmin: response.data.user.isAdmin,
          },
        }, vueAuth))
      .catch((error) => {
        throw error;
      });
  },

  login(context, payload) {
    return vueAuth.login(payload)
      .then(response =>
        activateUser(context, {
          data: {
            name: response.data.user.name,
            _id: response.data.user._id,
            isAdmin: response.data.user.isAdmin,
          },
        }, vueAuth))
      .catch((error) => {
        throw error;
      });
  },

  authLogout(context) {
    return vueAuth.logout().then(() => {
      if (!vueAuth.isAuthenticated()) {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated(),
        });

        context.commit('username', {
          username: '',
        });

        context.commit('userId', {
          userId: '',
        });

        context.commit('isAdmin', {
          isAdmin: false,
        });
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
