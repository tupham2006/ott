<template>
  <Background :page="'room'">
    <div class="room-content" id="room">
      <div class="row mb-5">
        <label class="label-control col-4">
          {{ trans('room', 'name') }}
        </label>
        <div class="col-6">
          <input v-model="user.name" class="form-control"/>
        </div>
        <div class="col-2">
          <button type="button" class="btn btn-light w-100" @click="updateUserName()">
            {{ trans('room', 'changeName') }}
          </button>
        </div>
      </div>
      <div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th colspan="3">
                  {{ trans('room', 'onlineList') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in filterUsers(chat)" :key="key">
                <td>
                  ID: <span>{{ item.id }}</span>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td>
                  <button type="button" class="btn btn-light float-right btn-sm" @click="inviteGame(item.id)">
                    {{ trans('room', 'inviteGame') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="foot-content">
        <router-link to="/">
          <button type="button" class="btn btn-light">
            {{ trans('room', 'backButton') }}
          </button>
        </router-link>
      </div>
    </div>
    <b-modal v-model="confirmInviteModal" title="Có kẻ cà khịa!!!">
      <p class="my-4">
        {{ trans('room', 'you') }}
        <b class="text-danger">{{ inviter.name }}</b>
        {{ trans('room', 'inviteBodyModal') }}
       </p>
      <button type="button" class="mt-3 btn btn-danger w-100" @click="acceptInvite()">
        {{ trans('room', 'okInviteModal') }}
      </button>
      <button type="button" class="mt-3 btn btn-success w-100" @click="acceptInvite()">
        {{ trans('room', 'okInviteModal2') }}
      </button>
      <div slot="modal-footer"></div>
    </b-modal>
  </Background>
</template>
<script>
import Background from '@/components/Background.vue';
import { mapState } from 'vuex';

export default {
  name: 'Room',
  data() {
    return {
      confirmInviteModal: false,
      inviter: {
        id: '',
        name: ''
      }
    };
  },
  props: {
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      chat: (state) => state.chat.chatList,
    })
  },
  components: {
    Background
  },
  methods: {
    filterUsers(chat) {
      let i, data = [];
      for(i in chat) {
        if(chat[i].id !== this.user.id) {
          data.push(chat[i]);
        }
      }
      return data;
    },
    updateUserName() {
      this.$socket.emit('updateUser', this.socketPayload({name: this.user.name}));
      this.$toastr.s(this.trans('room', 'updateUserNameSuccess'));
    },
    inviteGame(id) {
      this.$socket.emit('inviteGame', this.socketPayload({id: id}));
    },
    acceptInvite() {
      this.$socket.emit('acceptInvite', this.socketPayload({id: this.inviter.id}));
    }
  },
  sockets : {
    $confirmInvite(res) {
      this.inviter.id = res.id
      this.inviter.name = res.name;
      this.confirmInviteModal = true;
    },
    $createGame() {
      this.$router.push('/select');
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
  #room, #room table {
    color: #FFF !important;
  }
  .room-content {
    width: 40%;
    padding: 10px;
  }
  .foot-content {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
  }
</style>