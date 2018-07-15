/* eslint-disable no-shadow */
import axios from '@/helpers/axios-api';

const state = {
  data: {},
};

const mutations = {
  FECHED_POST(state, payload) {
    state.data = payload;
  },
};

const actions = {
  fetchPost({ commit }, code) {
    return axios.get(`/api/posts/post/${code}/`).then((response) => {
      commit('FECHED_POST', response.data.post);
    }).catch(() => {});
  },
  sendPost(context, data) {
    return axios.post('/api/posts/', data).catch(() => {});
  },
  updatePost(context, data) {
    return axios.put('/api/posts/', data).catch(() => {});
  },
  deletePost(context, { userId, code }) {
    return axios.post(`/api/posts/${code}/delete/`, {
      userId,
    }).catch(() => {});
  },
};

export default {
  state,
  mutations,
  actions,
};
