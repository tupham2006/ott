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
    async request(url, method) {
      method = method || 'get';
      let response = await this.$axios[method](config.serverOrigin + url);
      let data = response.data ? response.data : null;
      return data;
    },
    serverLink(link) {
      return config.serverOrigin + link;
    }
  }
}