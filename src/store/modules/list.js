/* eslint-disable no-shadow */
import axios from '@/helpers/axios-api';

const state = {
  list: [],
  categories: [],
  currentPage: 1,
  activeCategory: '',
  isBottomReached: false,
};

const mutations = {
  FECHED_LIST(state, payload) {
    state.list = payload;
  },
  FECHED_AND_MIXED_LIST(state, payload) {
    state.list = [...new Set([...state.list, ...payload])];
  },
  FETCED_CATREGORIES(state, payload) {
    state.categories = payload;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload;
  },
  SET_ACTIVE_CATEGORY(state, payload) {
    state.activeCategory = payload;
  },
  DELETED_POST_FROM_LIST(state, payload) {
    state.list = state.list.filter(item => item.code !== payload);
  },
  REACHED_BOTTOM(state, payload) {
    state.isBottomReached = payload;
  },
};

const actions = {
  fetchList({ commit }, { activeCategory = '', currentPage = 1 }) {
    let api = '';

    commit('SET_ACTIVE_CATEGORY', activeCategory);

    if (activeCategory) {
      api = `/api/categories/${activeCategory}/${currentPage}/`;
    } else {
      api = `/api/posts/${currentPage}/`;
    }

    return axios.get(api).then((response) => {
      if (currentPage > 1) {
        if (response.data.length) {
          commit('SET_CURRENT_PAGE', currentPage);
          commit('FECHED_AND_MIXED_LIST', response.data);
        } else {
          commit('REACHED_BOTTOM', true);
        }
      } else {
        commit('SET_CURRENT_PAGE', currentPage);
        commit('FECHED_LIST', response.data);
        commit('REACHED_BOTTOM', false);
      }
    }).catch(() => {});
  },
  fetchCategories({ commit }) {
    return axios.get('/api/categories/').then((response) => {
      this.categories = response.data;
      commit('FETCED_CATREGORIES', response.data);
    }).catch(() => {});
  },
};

export default {
  state,
  mutations,
  actions,
};
