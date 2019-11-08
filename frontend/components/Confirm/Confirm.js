
export default {
  name: 'confirm',
  components: {},
  props: {
    title: {
      default: 'Xác nhận'
    },
    body: {
      default: 'Bạn có muốn thực hiện thao tác này?'
    },
    confirmOpen: {
      default: false
    },
    okTitle: {
      default: 'Đồng ý',
    },
    closeTitle: {
      default: 'Đóng'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isModalOpen () {
      return this.confirmOpen;
    }
  },
  mounted () {

  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.close()
    },
    close() {
      this.$emit('update:confirmOpen', false);
    }
  }
}


