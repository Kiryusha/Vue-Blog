import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/authentication';
import list from '@/store/modules/list';

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
    auth,
    list,
  },
});

// Saving in localStorage
store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
