<template>
  <div>
    <div class="avatar" v-bind:style="style"></div>
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
    url: {
      type: String
    }
  },
  computed: {
    style () {
      return {
        background: `url(${this.url}) center center / cover no-repeat`,
        width: this.width,
        height: this.height,
      };
    }
  }
}
</script>
<style scoped>
  .avatar {
    border: 2px solid #ddd;
    border-radius: 50%;
  }
</style>