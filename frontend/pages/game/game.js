import { mapState } from 'vuex';
import Avatar from '@components/Avatar.vue';
import Hp from '@components/Hp.vue';
import Unti from '@components/Unti.vue';
import Troller from '@components/Troller';
import Background from '@components/Background';
import Confirm from '@components/Confirm';

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
      resultText: ''
    };
  },
  computed: {
    ...mapState({
      game: (state) => state.game,
      user: (state) => state.user,
    })
  },
  methods: {
    attack (id) {
      this.atkWait = true;
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
  },
  mounted: async function () {
    let response = await this.request('/select') || {};
    if(response.game) {
      this.$store.commit('game/storeGame', response.game);
    }
  },
  components: {
    Avatar,
    Hp,
    Unti,
    Troller,
    Background,
    Confirm
  },
  sockets : {
    $attack(res) {
      this.$store.commit('game/storeGame', res);
      let player1 = res.players[this.user.id];
      let player2 = res.players[res['user_id_maps'][this.user.id]];
      let self = this;
      setTimeout(function(){
        player2.cur_atk_id = null;
        player1.cur_atk_id = null;
        self.atkWait = false;
        if(res.status == 0) {
          self.endGame(res.result);
        }
      }, 500);
    },
  }
}