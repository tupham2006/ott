<template>
  <div v-if="mana" @click="activePowerMode()" class="power" v-bind:style="style"></div>
</template>
<script>

export default {
  name: 'Power',
  props: {
    mana: {

    }
  },
  computed: {
    style () {
      return {
        background: `url(${require('@/assets/images/power.png')}) center center / cover no-repeat`,
        width: '100px',
        height: '100px',
      };
    }
  },
  methods: {
    activePowerMode() {
      this.$store.commit('game/activePowerMode');
    }
  },
}
</script>

<style type="text/css">
  .power {
    cursor: pointer;
    display: inline-block;
    animation: pulse 0.5s infinite ease-in-out alternate;
    position: fixed;
    bottom: 30%;
    left: 20px
  }

  .power:hover {
    filter: brightness(110%);
  }

  @keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
</style>