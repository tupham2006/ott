import Vue from 'vue';
export const state = () => Vue.observable({
});

export const mutations = {
  storeGame(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  },
  updatePlayer(state, data) {
    let i;
    for(i in data) {
      Vue.set(state.players, i, data[i]);
    }
  }
};