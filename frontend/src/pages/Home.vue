<template>
  <Background :page="'home'" class="d-flex justify-content-center">
    <div class="menu">
      <img class="title" :src="title" width="100%">
      <div class="menu-btn">
        <router-link to="/room">
          <button type="button" class="btn btn-warning btn-lg">
            <Fa class="float-left mt-1" :icon="['far', 'hand-paper']"/>
            {{ trans('home', 'tapButton') }}
            <Fa class="float-right mt-1" :icon="['far', 'hand-paper']"/>
          </button>
        </router-link>
      </div>
      <div class="menu-btn">
        <button type="button" class="btn btn-warning btn-lg">
          <Fa class="float-left mt-1" :icon="['fas', 'school']"/>
          {{ trans('home', 'botButton') }}
          <Fa class="float-right mt-1" :icon="['fas', 'school']"/>
        </button>
      </div>
      <div class="menu-btn">
        <a href="https://facebook.com" class="btn btn-warning btn-lg">
          <Fa class="float-left mt-1" :icon="['fab', 'facebook-square']"/>
          {{ trans('home', 'fbButton') }}
          <Fa class="float-right mt-1" :icon="['fab', 'facebook-square']"/>
        </a>
      </div>
      <div class="menu-btn">
        <a href="https://vi.wikipedia.org/wiki/Tri%E1%BA%BFt_h%E1%BB%8Dc" class="btn btn-warning btn-lg">
          <Fa class="float-left mt-1" :icon="['fas', 'question-circle']"/>
          {{ trans('home', 'otherButton') }}
          <Fa class="float-right mt-1" :icon="['fas', 'question-circle']"/>
        </a>
      </div>
    </div>
  </Background>
</template>
<script>
import Background from '@/components/Background.vue';

export default {
  name: 'Home',
  components: {
    Background
  },
  computed: {
    title() {
      return require('@/assets/images/home/title.png');
    }
  }
}
</script>
<style scoped>
  .menu {
    width: 40%;
    text-align: center;
  }
  .title {
    margin: 50px 0 100px 0;
  }
  .menu-btn {
    margin-top: 15px;
  }
  .menu-btn button, .menu-btn a {
    width: 80%;
    border-radius: 1em;
  }
</style>