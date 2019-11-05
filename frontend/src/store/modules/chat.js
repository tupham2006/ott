const state = {
  chatList: []
};

const mutations = {
  getChatList(state, data) {
    state.chatList = data;
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