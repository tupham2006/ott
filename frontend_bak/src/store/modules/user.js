const state = {
  id: Number,
  name: String,
  sid: String
};

const mutations = {
  updateUser(state, data) {
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