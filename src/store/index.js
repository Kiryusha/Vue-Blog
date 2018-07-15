import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/store/modules/user';
import list from '@/store/modules/list';
import post from '@/store/modules/post';

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {
    // Loading from localStorage
    initialiseStore(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
      }
    },
  },
  modules: {
    user,
    list,
    post,
  },
});

// Saving in localStorage
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
