import Vue from 'vue';
import Vuex from 'vuex';

import DwNS from '@dwns/core';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ready: false,
    account: ''
  },
  getters: {
    ready(state) {
      return state.ready;
    },
    account(state) {
      return state.account;
    }
  },
  mutations: {
    ready(state, dwns) {
      state.ready = true;
      state.account = dwns.account;
    }
  },
  actions: {
    async init({ commit }, dwns) {
      console.log('DWNS >>', dwns);
      dwns.ready().then((dwns) => commit('ready', dwns));
    }
  }
});
