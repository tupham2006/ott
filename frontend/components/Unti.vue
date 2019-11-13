<template>
  <div class="unti" v-bind:style="style" @click="useUnti"></div>
</template>
<script>

export default {
  name: 'Unti',
  props: {
    mana: {

    },
    troller_id: {

    }
  },
  computed: {
    style () {
      return {
        background: `url(${this.serverLink(`/game/trollers/${this.troller_id}/unti.jpg`)}) center center / cover no-repeat`,
        width: '100px',
        height: '100px',
      };
    }
  },
  methods: {
    useUnti () {
      this.$emit('useUnti');
    }
  },
}
</script>

<style type="text/css">
  .unti {
    cursor: pointer;
    display: inline-block;
    animation: pulse 1s infinite ease-in-out alternate;
    position: fixed;
    bottom: 30%;
    left: 20px;
    border-radius: 50%;
  }

  .unti:hover {
    filter: brightness(110%);
  }

  @keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.02); }
  }
</style>