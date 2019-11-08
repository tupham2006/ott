import Vue from 'vue';

// Import config
import config from './config';
Vue.prototype.$config = config;

// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

// Font awsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);
Vue.component('Fa', FontAwesomeIcon);
Vue.config.productionTip = false;

// Socket
import VueSocketIO from 'vue-socket.io';
Vue.use(new VueSocketIO({
  connection: config.serverOrigin,
  vuex: {
    store: Vue.prototype.store,
    actionPrefix: 'io',
    mutationPrefix: 'io',
    options: { path: "/api/" } //Optional options
  }
}));

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.prototype.$axios = axios;

// Toastr
import VueToastr from "vue-toastr";
Vue.use(VueToastr, {
  defaultTimeout: 1000,
  defaultProgressBar: false
});