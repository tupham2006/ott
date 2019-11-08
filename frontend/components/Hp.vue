<template>
  <div>
    <b-progress :class="{'reverse': reverse}" class="hp" :max="max_hp" reverse>
      <b-progress-bar v-if="hp/max_hp >= 0.5" :value="hp" variant="success"></b-progress-bar>
      <b-progress-bar v-if="hp/max_hp < 0.5 && hp/max_hp >= 0.2" :value="hp" variant="warning"></b-progress-bar>
      <b-progress-bar v-if="hp/max_hp < 0.2" :value="hp" variant="danger"></b-progress-bar>
    </b-progress>
  </div>
</template>
<script>

export default {
  name: 'Hp',
  props: {
    'max_hp': {
      type: Number
    },
    'hp': {
      type: Number
    },
    'reverse': {
      type: Boolean
    }
  }
}
</script>
<style scoped>
  .hp {
    width: 300px;
    height: 25px;
  }
</style>