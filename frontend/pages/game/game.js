import { mapState } from 'vuex';
import Avatar from '@components/Avatar.vue';
import Hp from '@components/Hp.vue';
import Unti from '@components/Unti.vue';
import Troller from '@components/Troller';
import Background from '@components/Background';
import Confirm from '@components/Confirm';
import Damg from '@components/Damg';

export default {
  name: 'game',
  layout: 'default',
  data: function() {
    return {
      skills: [{
        iconPrefix: 'far',
        icon: 'hand-rock',
        id: 1
      },{
        iconPrefix: 'far',
        icon: 'hand-peace',
        id: 2
      },{
        iconPrefix: 'far',
        icon: 'hand-paper',
        id: 3
      }],
      atkWait: false,
      isEndGame: false,
      resultText: '',
      timer: 3,
      timerProcess: null
    };
  },
  computed: {
    ...mapState({
      game: (state) => state.game,
      user: (state) => state.user,
    })
  },
  methods: {
    startTime () {
      self = this;
      self.timer = 3;
      clearInterval(this.timerProcess);
      this.timerProcess = setInterval(function() {
        if(self.timer <= 0) {
          clearInterval(self.timerProcess);
          return false;
        }
        self.timer = self.timer ? self.timer - 1 : 0;
      }, 1000);
      this.$socket.emit('new_round', this.socketPayload({ game_id: this.game.id }));
    },
    attack (id) {
      self.atkWait = true;
      this.$socket.emit('attack', this.socketPayload({cur_atk_id: id}));
    },
    endGame (result) {
      if(result == 0) {
        this.resultText = 'Hoà!!!';
        return true;
      }

      this.resultText = `Bạn đã ${this.user.id == result ? 'Thắng' : 'Thua'}`;
      this.isEndGame = true;
    },
    backToRoom() {
      this.$router.push('/room');
    },
    useUnti () {
      this.game.players[this.user.id].unti_time -= 1;
    }
  },
  mounted: async function () {
    let response = await this.request('/select') || {};
    if(response.game) {
      this.$store.commit('game/storeGame', this._.cloneDeep(response.game, true));
    }
    // Start time
    this.startTime();
  },
  components: {
    Avatar,
    Hp,
    Unti,
    Troller,
    Background,
    Confirm,
    Damg
  },
  sockets : {
    $end_round(res) {
      this.$store.commit('game/storeGame', this._.cloneDeep(res, true));
      let player1 = res.players[this.user.id];
      let player2 = res.players[res['user_id_maps'][this.user.id]];
      let self = this;
      setTimeout(function(){
        player1.cur_atk_id = null;
        player2.cur_atk_id = null;
        player1.cur_atk = null;
        player2.cur_atk = null;
        self.$store.commit('game/storeGame', res);
        self.atkWait = false;
        if(res.status == 0) {
          self.endGame(res.result);
          return true;
        }
        // Start time
        self.startTime();
      }, 500);
    },
  }
}