import { mapState } from 'vuex';
import Avatar from '@/components/Avatar.vue';
import Hp from '@/components/Hp.vue';
import Unti from '@/components/Unti.vue';
import Troller from '@/components/Troller';
import Background from '@/components/Background';

export default {
  name: 'Game',
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
      cur_atk_id: null
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
      this.$socket.emit('attack', this.socketPayload({cur_atk_id: id}));
      this.cur_atk_id = id;
      this.$forceUpdate();
      let self = this;
      setTimeout(function(){
        self.cur_atk_id = null;
        self.$forceUpdate();
      }, 500);
    }
  },
  created: async function () {
    let response = await this.request('/select') || {};
    if(response.game) {
      this.$store.commit('game/storeGame', response.game);
    }
    this.$forceUpdate();
  },
  components: {
    Avatar,
    Hp,
    Unti,
    Troller,
    Background
  },
  sockets : {
    $attack(res) {
      this.$store.commit('game/storeGame', res);
      let player2 = res.players[res['user_id_maps'][this.user.id]];
      this.$forceUpdate();
      let self = this;
      setTimeout(function(){
        player2.cur_atk_id = null;
        self.$forceUpdate();
      }, 500);
    },
  }
}