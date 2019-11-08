import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import chat from './modules/chat';
import game from './modules/game';
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
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
            Cookies.set(key, value, { path: '' }),
          removeItem: key => Cookies.remove(key)
        }
      })
    ]
  });
}

export default store;