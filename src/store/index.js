import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import { VueAuthenticate } from 'vue-authenticate';
import axios from 'axios';

Vue.use(Vuex);
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

const activateUser = (context, res) => {
  context.commit('isAuthenticated', {
    isAuthenticated: vueAuth.isAuthenticated(),
  });

  localStorage.setItem('username', res.data.name);
  context.commit('username', {
    username: res.data.name,
  });

  localStorage.setItem('userId', res.data._id);
  context.commit('userId', {
    userId: res.data._id,
  });

  context.commit('isAdmin', {
    isAdmin: res.data.isAdmin,
  });
};

const nativeResponse = (context, res) => {
  if (res.data.success) {
    activateUser(context, {
      data: {
        name: res.data.user.name,
        _id: res.data.user._id,
        isAdmin: res.data.user.isAdmin,
      },
    });
  }

  return res.data;
};

export default new Vuex.Store({
  state: {
    isAuthenticated: vueAuth.isAuthenticated(),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    isAdmin: false,
  },

  getters: {
    isAuthenticated() {
      return vueAuth.isAuthenticated();
    },
  },

  mutations: {
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
  },

  actions: {
    authenticate(context, payload) {
      vueAuth.authenticate(payload.provider).then(() => {
        context.commit('isAdmin', {
          isAdmin: false,
        });

        if (payload.provider === 'github') {
          Vue.axios.get('https://api.github.com/user').then((response) => {
            Vue.axios.post('/api/users/', {
              name: response.data.login,
              provider: payload.provider,
              email: response.data.email,
              isAdmin: false,
            }).then((res) => {
              activateUser(context, res);
            });
          });
        } else if (payload.provider === 'google') {
          Vue.axios.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect').then((response) => {
            Vue.axios.post('/api/users/', {
              name: response.data.name,
              provider: payload.provider,
              email: response.data.email,
              isAdmin: false,
            }).then((res) => {
              activateUser(context, res);
            });
          });
        }
      });
    },

    register(context, payload) {
      return vueAuth.register(payload).then(response =>
        nativeResponse(context, response));
    },

    login(context, payload) {
      return vueAuth.login(payload).then(response =>
        nativeResponse(context, response));
    },

    authLogout(context) {
      vueAuth.logout().then(() => {
        if (!vueAuth.isAuthenticated()) {
          context.commit('isAuthenticated', {
            isAuthenticated: vueAuth.isAuthenticated(),
          });

          localStorage.removeItem('username');
          context.commit('username', {
            username: null,
          });

          localStorage.removeItem('userId');
          context.commit('userId', {
            userId: null,
          });

          context.commit('isAdmin', {
            isAdmin: false,
          });
        }
      });
    },
  },
});
