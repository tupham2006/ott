<template>
  <Background :page="'home'" class="d-flex justify-content-center">
  </Background>
</template>
<script>
import Background from '@/components/Background.vue';
import { mapState } from 'vuex';

export default {
  name: 'Select',
  components: {
    Background,
    ...mapState({
      player: (state) => state.game.player,
      game: (state) => state.game.game,
    }),
  },
  computed: {
    title() {
      return require('@/assets/images/home/title.png');
    }
  }
}
</script>
<style scoped>

</style>