<template>
  <Background v-if="game.players" :page="'select'" :id="game.background">
    <div class="troller-name">
      <span v-for="(item, key) in game.players" :key="'player-' + key">
        {{ item.troller_name }}
      </span>
    </div>
    <div>
      <Troller class="troller-1" :face="game.players[user.id].troller_id" />
      <Troller class="troller-2" :face="game.players[game.user_id_maps[user.id]].troller_id" />
    </div>
    <div class="foot-content">
      <button type="button" class="btn btn-danger btn-lg mr-4 float-left" @click="exitGame()">
        {{ trans('select', 'exitGame') }}
      </button>
      <button v-if="!game.players[user.id].is_ready" type="button" class="btn btn-success btn-lg float-left" @click="setReadyGame(1)">
        {{ trans('select', 'readyButton') }}
      </button>
      <button v-if="game.players[user.id].is_ready" type="button" class="btn btn-danger btn-lg float-left" @click="setReadyGame(0)">
        {{ trans('select', 'cancelReadyButton') }}
      </button>
      <span class="text-white shadow-danger font-18">
        <Fa class="text-danger" :icon="['fas', 'gamepad']"/> {{ trans('select', 'readyNoti') }}
      </span>
      <button v-if="game.players[game.user_id_maps[user.id]].is_ready" type="button" class="btn btn-success btn-lg float-right">
        {{ trans('select', 'enemyReadyButton') }}
      </button>
      <button v-if="!game.players[game.user_id_maps[user.id]].is_ready" type="button" class="btn btn-light btn-lg float-right">
        {{ trans('select', 'waitEnemyReadyButton') }}
      </button>
    </div>
    <div class="select-troller-container">
      <div class="d-flex justify-content-center">
        <div v-for="(item, key) in trollList" :key="'troller-' + key" @click="selectTroller(item.troller_id)" :id="`troller-index-${item.troller_id}`">
          <Avatar :type="'troller'" :id="item.troller_id" class="troller-avatar" :is_selected="game.players[user.id].troller_id == item.troller_id"/>
          <div>
            <b-popover triggers="hover focus" placement="top" :target="`troller-index-${item.troller_id}`">
            <TrollerIndex :troller="item"/>
          </b-popover>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div v-for="(item, key) in backgroundList" :key="'background-' + key" @click="selectBackground(item.id)">
          <Avatar :is_selected="item.id == game.background" :type="'background'" :width="'300px'" :height="'150px'" :id="item.id" class="troller-avatar"/>
        </div>
      </div>
    </div>
    <Confirm :confirmOpen.sync="confirmExit" :body="trans('select', 'confirmExitBody')" @confirm="isConfirmExit()"/>
    <Confirm
      :confirmOpen.sync="notiGameIsCancel"
      :title="trans('select', 'notiTitle')"
      :body="trans('select', 'notiGameIsCancel')"
      :okTitle="trans('select', 'backToRoom')"
      @confirm="backToRoom()"
    />
  </Background>
</template>
<script>
import Background from '@/components/Background.vue';
import { mapState } from 'vuex';
import Avatar from '@/components/Avatar.vue';
import Troller from '@/components/Troller';
import TrollerIndex from '@/components/TrollerIndex';
import Confirm from '@/components/Confirm';

export default {
  name: 'Select',
  data() {
    return {
      trollList: {},
      backgroundList: {},
      confirmExit: false,
      notiGameIsCancel: false
    };
  },
  components: {
    Background,
    Avatar,
    Troller,
    Confirm,
    TrollerIndex
  },
  computed: {
    ...mapState({
      game: (state) => state.game,
      user: (state) => state.user,
    })
  },
  methods: {
    selectTroller(troller_id) {
      let i;
      for(i in this.trollList) {
        if (this.trollList[i].is_selected) {
          delete this.trollList[i].is_selected;
        }
        if(this.trollList[i].troller_id == troller_id) {
          this.mergeObject(this.game.players[this.user.id], this.trollList[i]);
        }
      }
      this.$forceUpdate();
      this.$socket.emit('selectTroller', this.socketPayload({troller_id: troller_id}));
    },
    selectBackground(id) {
      this.game.background = id;
      this.$forceUpdate();
      this.$socket.emit('selectBackground', this.socketPayload({background: id}));
    },
    exitGame() {
      this.confirmExit = true;
      this.$forceUpdate();
    },
    async isConfirmExit () {
      window.console.log("this.confirmExit", this.confirmExit);
      await this.request('/exitGame', 'post');
      this.$router.push('/room');
    },
    backToRoom() {
      this.$router.push('/room');
    },
    setReadyGame (isReady) {
      this.game.players[this.user.id].is_ready = isReady;
      this.$socket.emit('setReadyGame', this.socketPayload({is_ready: isReady}));
      this.$forceUpdate();
    }
  },
  async created() {

    let response = await this.request('/select') || {};

    this.trollList = response.trollList || {};
    this.backgroundList = response.backgroundList || {};
    if(response.game) {
      this.$store.commit('game/storeGame', response.game);
    }
    this.$forceUpdate();
    if(!this.game.players) {
      this.$router.push('/room');
    }
  },
  sockets : {
    $selectTroller(res) {
      this.$store.commit('game/storeGame', res);
      this.$forceUpdate();
    },
    $selectBackground(res) {
      this.$store.commit('game/storeGame', res);
      this.$forceUpdate();
    },
    $gameIsCancel() {
      this.notiGameIsCancel = true;
      this.$forceUpdate();
    },
    $setReadyGame (res) {
      this.$store.commit('game/storeGame', res);
      this.$forceUpdate();
    },
    $startGame () {
      this.$router.push('/game');
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
    left: 50px
  }
  .troller-2 {
    position: absolute;
    right: 50px;
    transform: rotateY(180deg);
    -moz-transform:rotateY(180deg);
    -o-transform:rotateY(180deg);
    -ms-transform:rotateY(180deg);
  }
  .foot-content {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    text-align: center;
    line-height: 48px;
  }
</style>