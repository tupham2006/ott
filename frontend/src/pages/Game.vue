<template>
  <div id="game" v-bind:style="gameBackground" :class="{'power-bg': player.mode == 'power'}">
    <div class="header">
      <div class="user-info float-left">
        <div class="float-left">
          <Avatar v-bind:url="require('@/assets/images/avatar.png')" />
        </div>
        <div class="float-right pl-3">
          <div>
            <div class="float-left border-small-text">{{ player.name }}</div>
          </div>
          <Hp v-bind:hp="player.hp" v-bind:currentHp="player.currentHp"/>
          <flag class="float-left header-flag" iso="vn" />
        </div>
      </div>
      <div class="float-right boss-info">
        <div class="float-right">
          <Avatar v-bind:url="game.avatar" />
        </div>
        <div class="float-right pr-3">
          <div>
            <span class="boss-name float-right border-small-text">{{ game.name }}</span>
          </div>
          <Hp v-bind:hp="game.hp" v-bind:currentHp="game.currentHp" v-bind:reverse="true"/>
          <flag class="header-flag float-right" v-bind:iso="game.code" />
        </div>
      </div>
      <div class="level-title">
        Kèo số: {{ player.level }}
      </div>
    </div>
     <div class="text-center">
      <img v-bind:src="game.boss" height="500">
     </div>
     <Power :mana="player.mana"/>
     <div class="skill-container d-flex justify-content-center">
        <div v-for="(item, index) in player.skills" v-bind:key="index">
          <button type="button" class="btn skill-button" :class="{'btn-success': !player.mode, 'btn-danger': player.mode }" @click="attack(this)">
            <Fa v-bind:icon="item.icon" v-bind:prefix="item.iconPrefix"/>
          </button>
       </div>
     </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Avatar from '@/components/Avatar.vue';
import Hp from '@/components/Hp.vue';
import Power from '@/components/Power.vue';

export default {
  name: 'Game',
  data: function() {
    return {
    };
  },
  computed: {
    ...mapState({
      player: (state) => state.game.player,
      game: (state) => state.game.game,
    }),
    gameBackground: function() {
      return {
        background: `url(${this.game.background}) 0% 0% / cover no-repeat`,
      };
    }
  },
  methods: {
    async attack(data){
      await this.$socket.emit('attack', data);
    },
  },
  mounted: async function () {
    await this.$store.dispatch('game/getNewGame');
    this.game.background = require(`@/assets/images/games/${this.game.level}/bg.jpg`);
    this.game.avatar = require(`@/assets/images/games/${this.game.level}/avatar.jpg`);
    this.game.boss = require(`@/assets/images/games/${this.game.level}/boss.png`);
  },
  components: {
    Avatar,
    Hp,
    Power
  },
  sockets : {
    attack : function(val){
      this.$store.dispatch("ADD_CHAT",val);
    }
  }
}
</script>

<style scoped>
  #game {
    width: 100%;
    height: 100%;
  }
  .power-bg {
    filter: saturate(5);
  }
  .header {
    height: 120px;
  }
  .level-title {
    text-align: center;
    font-size: 60px;
    color: red;
    text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
  }
  .user-info {
    padding: 10px
  }
  .skill-container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .skill-button {
    margin: 10px;
    height: 200px;
    width: 200px;
    font-size: 100px;
  }

  .boss-info {
    padding: 10px;
  }
  .boss-name {
    text-align: right;
    padding-right: 5px;
  }
  .border-small-text {
    text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
  }
  .header-flag {
    font-size: 20px;
    margin-top: 5px;
  }
  * {

  }
</style>