import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios';
import { VueAuthenticate } from 'vue-authenticate';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://localhost:5000', // Your API domain
  tokenName: 'access_token',
  providers: {
    github: {
      clientId: '3396cb8c1d4881671456',
      redirectUri: 'http://localhost:8080', // Your client app URL
    },
  },
});

export default new Vuex.Store({
  state: {
    isAuthenticated: vueAuth.isAuthenticated(),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    postList: [],
    categories: [],
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
    postList(state, payload) {
      state.postList = payload.postList;
    },
    categories(state, payload) {
      state.categories = payload.categories;
    },
  },

  actions: {
    authenticate(context, payload) {
      vueAuth.authenticate(payload.provider).then(() => {
        if (payload.provider === 'github') {
          Vue.axios.get('https://api.github.com/user').then((response) => {
            Vue.axios.post('/api/users/', {
              name: response.data.login,
              provider: payload.provider,
              email: response.data.email,
              isAdmin: false,
            }).then((res) => {
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
            });
          });
        }
      });
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
        }
      });
    },

    getPosts(context, payload) {
      let api = '/api/posts/';

      if (payload && payload.category) {
        api = `/api/categories/${payload.category}/`;
      }

      Vue.axios.get(api).then((response) => {
        context.commit('postList', {
          postList: response.data,
        });

        if (payload.category && router.path !== '/blog/') {
          router.push({ path: '/blog/' });
        }
      });
    },

    getCategories(context) {
      Vue.axios.get('/api/categories/').then((response) => {
        context.commit('categories', {
          categories: response.data,
        });
      });
    },
  },
});
