import * as Cookies from "js-cookie";
import langs from './langs/base';
import config from './config';
export default {
  methods: {
    socketPayload(params) {
      let cookies = {};
      try {
        cookies = JSON.parse(Cookies.get('ott'));
      } catch (e) {
        window.console.error(e);
      }

      let payload = {
        params,
        cookies
      };
      return payload;
    },
    trans(obj, key) {
      const langArray = langs[obj][key];
      return langArray[Math.floor(Math.random() * langArray.length)];
    },
    async request(url, method, params) {
      let response;
      method = method || 'get';
      if(method == 'post') {
        response = await this.$axios[method](config.serverOrigin + url, params, {withCredentials: true });
      } else {
        response = await this.$axios[method](config.serverOrigin + url, {withCredentials: true });
      }
      let data = response.data ? response.data : null;
      return data;
    },
    serverLink(link) {
      return config.serverOrigin + link;
    },
    mergeObject: (oldObj, newObj) => {
      let i;
      for(i in newObj) {
        oldObj[i] = newObj[i];
      }
      return oldObj;
    }
  }
}