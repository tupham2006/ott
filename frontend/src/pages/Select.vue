<template>
  <Background :page="'select'" :id="game.background">
    <div class="troller-name">
      <div v-for="(item, key) in game.players" :key="'player-' + key">
        {{ item.troller_name }}
      </div>
    </div>
    <div class="select-troller-container">
      <div class="d-flex justify-content-center">
        <div v-for="(item, key) in trollList" :key="'troller-' + key" @click="selectTroller(item.id, item.name)">
          <Avatar :type="'troller'" :id="item.id" class="troller-avatar" :is_selected="item.is_selected"/>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div v-for="(item, key) in backgroundList" :key="'background-' + key" @click="selectBackground(item.id)">
          <Avatar :is_selected="item.id == game.background" :type="'background'" :width="'300px'" :height="'150px'" :id="item.id" class="troller-avatar"/>
        </div>
      </div>
    </div>
  </Background>
</template>
<script>
import Background from '@/components/Background.vue';
import { mapState } from 'vuex';
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'Select',
  data() {
    return {
      trollList: {},
      backgroundList: {}
    };
  },
  components: {
    Background,
    Avatar
  },
  computed: {
    ...mapState({
      game: (state) => state.game,
      user: (state) => state.user,
    })
  },
  methods: {
    selectTroller(id, name) {
      let i;
      for(i in this.trollList) {
        if (this.trollList[i].is_selected) {
          delete this.trollList[i].is_selected;
          break;
        }
      }
      this.game.players[this.user.id].troller_id = id;
      this.game.players[this.user.id].troller_name = name;
      this.trollList[id].is_selected = true;
      this.$forceUpdate();
    },
    selectBackground(id) {
      this.game.background = id
      this.$forceUpdate();
    }
  },
  async created() {
    let response = await this.request('/select') || {};

    this.trollList = response.trollList || {};
    this.backgroundList = response.backgroundList || {};
  }
}
</script>
<style scoped>
  .troller-avatar {
    margin: 5px;
  }

  .select-troller-container {
    position: absolute;
    bottom: 100px;
    width: 100%;
  }
  .troller-name {
    padding: 10px;
    color: #fff;
    font-size: 30px;
    text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  }
</style>