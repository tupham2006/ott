import Background from '@/components/Background.vue';
import { mapState } from 'vuex';

export default {
  name: 'room',
  layout: 'default',
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