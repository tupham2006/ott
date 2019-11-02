import * as Cookies from "js-cookie";
import langs from './langs/base';
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
    }
  }
}