export default {
  async asyncData({$axios, query, store}) {
    return {
      query,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: '注册VIP账号',
      realName: '',
      storeName: '',
    }
  },
  components: {
  
  },
  methods: {
  
  },
  mounted() {
  }
};
