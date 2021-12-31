import Vue from 'vue';
import Vuex from 'vuex';
import { GetUser } from '../apis';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    SetUserInfo(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    async GetUserInfo({ commit }, userId) {
      const resp = await GetUser(userId);
      if (resp.successful) {
        commit('SetUserInfo', resp.data);
      }
    }
  }
});