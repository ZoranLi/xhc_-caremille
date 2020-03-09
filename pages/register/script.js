import pass from '~/components/login/pass/index.vue'
const defaultRedirect = `/`

export default {
  async asyncData({$axios, query, store}) {
    return {
      query,
      // weixin: store.state.weixin
      weixin: ''
    }
  },
  data() {
    return {
      title: '登录',
      redirect: '',
      showMask: false,
      bind_mobile: true,
    }
  },
  
  components: {pass},
  
  methods: {
    async bindmobile(phone, code){
      let _query = this.query;
      let param = {
        mobile: phone.toString().trim(),
        iden_code: code.toString().trim(),
        device_id: Date.now(),
      }
      
      let resp = await this.$axios.post('focus::/codeLogin', param)
      resp = resp.data
      if(resp.code !== 0) return __tostal(resp.msg || '登录出错，请联系客服。')
      location.href = this.query.redirect || '/'
    },
    hidemodal(){
      location.href = this.redirect
    },
    download(){
      location.href = '//ul.xiaohongchun.com/params?goods=0'
    },
    back(){
      location.href = `/register`
    }
  },
  
  head() {
    return {
      title: this.title
    }
  },
  
  mounted() {
    this.redirect = this.query.redirect || defaultRedirect
  }
};
