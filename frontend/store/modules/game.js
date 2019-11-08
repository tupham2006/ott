import Vue from 'vue';
const state = Vue.observable({
});

const mutations = {
  storeGame(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  },
};

const actions = {
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

