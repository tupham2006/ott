<template>
  <div>
    <b-progress :class="{'reverse': reverse}" class="hp" :max="hp" reverse>
      <b-progress-bar v-if="currentHp/hp >= 0.5" :value="currentHp" variant="success"></b-progress-bar>
      <b-progress-bar v-if="currentHp/hp < 0.5 && currentHp/hp >= 0.2" :value="currentHp" variant="warning"></b-progress-bar>
      <b-progress-bar v-if="currentHp/hp < 0.2" :value="currentHp" variant="danger"></b-progress-bar>
    </b-progress>
  </div>
</template>
<script>

export default {
  name: 'Hp',
  props: {
    'hp': {
      type: Number
    },
    'currentHp': {
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
  .reverse {
    transform: rotate(180deg);
  }
</style>