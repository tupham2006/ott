import Vue from 'vue';

// Import config
import config from './config';
Vue.prototype.$config = config;
import './common.css';
import './styles.css';

// Bootstrap
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

import store from './store';

// Font awsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas, far, fab);
Vue.component('Fa', FontAwesomeIcon);
Vue.config.productionTip = false;

// Flag icon
import FlagIcon from 'vue-flag-icon';
Vue.use(FlagIcon);

// Socket
import VueSocketIO from 'vue-socket.io';
Vue.use(new VueSocketIO({
  connection: config.serverOrigin,
  vuex: {
    store,
    actionPrefix: 'io',
    mutationPrefix: 'io'
  }
}));

// Router
import router from './router';

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

// Export module
export default {
  BootstrapVue,
  store,
  library,
  router,
  VueToastr
};