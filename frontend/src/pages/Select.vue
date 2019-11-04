<template>
  <Background :page="'select'" :id="game.background">
    <div class="troller-name">
      <span v-for="(item, key) in game.players" :key="'player-' + key">
        {{ item.troller_name }}
      </span>
    </div>
    <div>
      <Troller class="troller-1" :face="game.players[user.id].troller_id" />
      <Troller class="troller-2" :face="game.players[game.user_id_maps[user.id]].troller_id" />
    </div>
    <div class="select-troller-container">
      <div class="d-flex justify-content-center">
        <div v-for="(item, key) in trollList" :key="'troller-' + key" @click="selectTroller(item.id, item.name)">
          <Avatar :type="'troller'" :id="item.id" class="troller-avatar" :is_selected="game.players[user.id].troller_id == item.id"/>
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
import Troller from '@/components/Troller';

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
    Avatar,
    Troller
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
      this.$forceUpdate();
      this.$socket.emit('selectTroller', this.socketPayload({troller_id: id}));
    },
    selectBackground(id) {
      this.game.background = id;
      this.$forceUpdate();
      this.$socket.emit('selectBackground', this.socketPayload({background: id}));
    }
  },
  async created() {
    if(!this.game.players) {
      this.$router.push('/room');
    }
    let response = await this.request('/select') || {};

    this.trollList = response.trollList || {};
    this.backgroundList = response.backgroundList || {};
  },
  sockets : {
    $selectTroller(res) {
      this.$store.commit('game/storeGame', res);
      this.$forceUpdate();
    },
    $selectBackground(res) {
      this.$store.commit('game/storeGame', res);
      this.$forceUpdate();
    }
  },
}
</script>
<style scoped>
  .troller-avatar {
    margin: 5px;
  }

  .select-troller-container {
    position: absolute;
    bottom: 50px;
    width: 100%;
  }
  .troller-name {
    padding: 10px;
    color: #fff;
    font-size: 30px;
    text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  }
  .troller-name span:nth-child(2) {
    float: right;
  }
  .troller-1 {
    position: absolute;
    left: 100px
  }
  .troller-2 {
    position: absolute;
    right: 100px;
    transform: rotateY(180deg);
    -moz-transform:rotateY(180deg);
    -o-transform:rotateY(180deg);
    -ms-transform:rotateY(180deg);
  }
</style>