<template>
  <div>
    <div :class="{'avatar': !is_selected, 'avatar-selected': !!is_selected}" v-bind:style="style"></div>
  </div>
</template>
<script>

export default {
  name: 'Avatar',
  props: {
    width: {
      default: '100px',
      type: String
    },
    height: {
      default: '100px',
      type: String
    },
    id: {
      type: Number
    },
    is_selected: {
      type: Boolean
    },
    type: {
      type: String
    }
  },
  computed: {
    url() {
      let url = ''
      switch(this.type) {
        case 'troller':
          url = this.serverLink(`/game/trollers/${this.id}/avatar.jpg`);
          break;
        case 'background':
          url = this.serverLink(`/game/backgrounds/${this.id}.jpg`);
          break;
      }
      return url;
    },
    style () {
      return {
        background: `url(${this.url}) center bottom / cover no-repeat`,
        width: this.width,
        height: this.height,
      };
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
  .avatar {
    cursor: pointer;
    border: 2px solid #ddd;
  }
  .avatar:hover {
    border: 2px solid #000;
  }
  .avatar-selected {
    border: 2px solid #FF0000;
  }
</style>