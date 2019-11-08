import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '@/pages/Home.vue';
import Room from '@/pages/Room.vue';
import Select from '@/pages/Select.vue';
import Game from '@/pages/Game';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/room', component: Room },
    { path: '/select', component: Select },
    { path: '/game', component: Game }
  ]
});