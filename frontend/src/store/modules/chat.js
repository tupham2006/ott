const state = {
};

const mutations = {
  getChatList(state, data) {
    Object.assign(state, data);
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