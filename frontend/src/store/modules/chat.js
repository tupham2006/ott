const state = {
};

const mutations = {
  getChatList(state, data) {
    state = Object.assign([], data);
  }
};

const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};