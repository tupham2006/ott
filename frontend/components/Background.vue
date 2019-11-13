<template>
  <div class="background" :style="backgroundStyle">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'Background',
  props: {
    page: {
      type: String
    },
    id: {
    },
    e_cur_atk: {
    }
  },
  computed: {
    url() {
      let url = '';
      switch(this.page) {
        case 'home':
          url = require(`@/assets/images/${this.page}/background.jpg`);
          break;
        case 'select':
          url = this.serverLink(`/game/backgrounds/${this.id}.jpg`);
          break;
        case 'room':
          url = require(`@/assets/images/${this.page}/background.jpg`);
          break;
      }
      return url;
    },
    backgroundStyle() {
      let style = {
        background: `url(${this.url}) 0% 0% / cover no-repeat`
      };
      // if(this.e_cur_atk) {
      //   style.filter = 'saturate(2)';
      // }
      return style;
    }
  },
  created() {
    if(this.page == 'select' && !this.id) {
      this.$router.push('/room');
    }
  }
}
</script>
<style scoped>
  .background {
    width: 100%;
    height: 100%;
  }
</style>