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
    }
  },
  computed: {
    backgroundStyle() {
      return {
        background: `url(${require(`@/assets/images/${this.page}/background.jpg`)}) 0% 0% / cover no-repeat`
      };
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