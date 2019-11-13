import Vue from 'vue';
export const state = () => Vue.observable({
  chatList: []
});

export const mutations = {
  getChatList(state, data) {
    state.chatList = data;
  }
};