import Vue from 'vue';
import * as Cookies from "js-cookie";
import langs from '@/langs/base';
import config from './config';
Vue.mixin({
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
    async request(url, params, method) {
      let response = {};
      method = method || 'get';
      try {
          response = await this.$axios({
            url: config.serverOrigin + url,
            data: params,
            withCredentials: true,
            method: method
          });
      } catch(e) {
        console.error(e);
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
});