import Vue from 'vue';
export const state = () => Vue.observable({
});

export const mutations = {
  updateUser(state, data) {
    let i;
    for(i in data) {
      Vue.set(state, i, data[i]);
    }
  }
};