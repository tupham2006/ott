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
    };
  },
  computed: {
    ...mapState({
      game: (state) => state.game,
      user: (state) => state.user,
    })
  },
  methods: {
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
  }
}