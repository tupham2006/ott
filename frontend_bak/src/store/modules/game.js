import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
// import levels from './levels';

const state = {

};

const mutations = {
  storeGame(state, data) {
    let i;
    for(i in data) {
      state[i] = data[i];
    }
    return state;
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

