import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export const plugins = [
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