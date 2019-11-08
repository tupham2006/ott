<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import Libs from './libs';
import mixins from './mixins';

Vue.mixin({
  ...mixins
});

export default {
  name: 'app',
  ...Libs,
  computed: {
  },
  sockets : {
    connect() {
      this.$store.commit('user/updateUser', { sid: this.$socket.id });
    },
    $updateUser(res) {
      this.$store.commit('user/updateUser', res);
    },
    $getChatList(res) {
      this.$store.commit('chat/getChatList', res);
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
  }
</style>
