import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import chat from './modules/chat';
import game from './modules/game';
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    chat,
    game,
  },
  plugins: [
    createPersistedState({
      key: 'ott',
      paths: ['user', 'chat'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value),
        removeItem: key => Cookies.remove(key)
      }
    })
    ]
});