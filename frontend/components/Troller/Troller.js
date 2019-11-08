
export default {
  name: 'troller',
  components: {},
  props: {
    face: {},
    body: {
      default: '/game/partials/body.png'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    faceStyle () {
      return {
        background: `url(${this.serverLink(`/game/trollers/${this.face}/face.png`)}) center bottom/ contain no-repeat`
      };
    },
    bodyStyle () {
      return {
        background: `url(${this.serverLink(this.body)}) center top / contain no-repeat`
      };
    }
  },
  mounted () {

  },
  methods: {

  }
}


