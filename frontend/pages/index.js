"use strict";
import Background from '@/components/Background.vue';
export default {
  name: 'index',
  layout: 'default',
  components: {
    Background
  },
  computed: {
    title() {
      return require('@/assets/images/home/title.png');
    }
  },
  mounted() {
  },
}