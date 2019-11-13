
export default {
  name: 'damg',
  components: {},
  props: ['player'],
  data () {
    return {
    }
  },
  computed: {
    fontSize () {
      let fontSize = (this.player.cur_atk - this.player.min_atk) * 100 / ((this.player.max_atk - this.player.min_atk) || 1)
      return 80 + fontSize;
    }
  },
  mounted () {

  },
  methods: {

  }
}


