import Background from '@components/Background.vue';
import { mapState } from 'vuex';
import Avatar from '@components/Avatar.vue';
import Troller from '@components/Troller';
import TrollerIndex from '@components/TrollerIndex';
import Confirm from '@components/Confirm';

export default {
  name: 'Select',
  layout: 'default',
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
      let playerState = this._.cloneDeep(this.game.players[this.user.id], true);
      for(i in this.trollList) {
        if (this.trollList[i].is_selected) {
          delete this.trollList[i].is_selected;
        }
        if(this.trollList[i].troller_id == troller_id) {
          this.mergeObject(playerState, this.trollList[i]);
        }
      }
      let updateData = {};
      updateData[this.user.id] = playerState;
      this.$store.commit('game/updatePlayer', updateData);
      this.$socket.emit('selectTroller', this.socketPayload({troller_id: troller_id}));
    },
    selectBackground(id) {
      this.$store.commit('game/storeGame', {background: id});
      this.$socket.emit('selectBackground', this.socketPayload({background: id}));
    },
    exitGame() {
      this.confirmExit = true;
    },
    async isConfirmExit () {
      await this.request('/exitGame', null, 'post');
      this.$router.push('/room');
    },
    backToRoom() {
      this.$router.push('/room');
    },
    setReadyGame (isReady) {
      let playerState = this._.cloneDeep(this.game.players[this.user.id], true);
      playerState.is_ready = isReady;
      let updateData = {};
      updateData[this.user.id] = playerState;
      this.$store.commit('game/updatePlayer', updateData);
      this.$socket.emit('setReadyGame', this.socketPayload({is_ready: isReady}));
    }
  },
  async mounted() {

    let response = await this.request('/select') || {};

    this.trollList = response.trollList || {};
    this.backgroundList = response.backgroundList || {};
    if(response.game) {
      this.$store.commit('game/storeGame', response.game);
    }

    if(response.user) {
      this.$store.commit('user/updateUser', response.user);
    }

    if(!this.game.players) {
      this.$router.push('/room');
    }
  },
  sockets : {
    $selectTroller(res) {
      this.$store.commit('game/storeGame', res);
    },
    $selectBackground(res) {
      this.$store.commit('game/storeGame', res);
    },
    $gameIsCancel() {
      this.notiGameIsCancel = true;
    },
    $setReadyGame (res) {
      this.$store.commit('game/storeGame', res);
    },
    $startGame () {
      this.$router.push('/game');
    }
  },
}