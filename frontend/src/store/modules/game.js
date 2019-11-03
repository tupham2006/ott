import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
// import levels from './levels';

const state = {

};

const mutations = {
  storeGame(state, data) {
    Object.assign(state, data);
  },
  activePowerMode (state) {
    state.player.mana -= 1;
    state.player.mode = 'power';
    return state;
  },
  attack (state) {
    state.player.mode = "";
  }
};

const actions = {
  getNewGame: async function(context) {
    const response = await Vue.axios.get('/data.json');
    context.commit('storeGame', {
      player: response.data.player,
      game: response.data.game[1]
    });
    return true;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

