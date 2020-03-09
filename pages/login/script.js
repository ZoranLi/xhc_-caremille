import pass from '~/components/login/pass/index.vue'

const defaultRedirect = `/`

export default {
  async asyncData({$axios, query,req, store}) {
    return {
      query,
      host : req.headers.host
    }
  },
  data() {
    return {
      title: '登录',
      redirect: '',
      bind_mobile: true
    }
  },
  
  components: {pass},
  
  methods: {
    async bindmobile(phone, code) {
      let that = this;
      let _query = this.query;
      let param = {
        mobile: phone.toString().trim(),
        iden_code: code.toString().trim(),
        device_id: Date.now(),
      }
      let resp = await this.$axios.$post('focus::/codeLogin', param)
      resp = resp.data
      if (resp) {
        let auth =
          {'xhc_token': resp['token'],
          'xhc_prefix':resp['prefix'],
          'xhc_hashTimes':resp['hashTimes']};
          Object.keys(auth).forEach(function(key){
            that.$cookies.set(key, auth[key], {
              domain: `${this.host}`,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              httpOnly: false
            });
          });
      } else {
        return __tostal(resp.msg || '登录出错，请联系客服。')
      }
      location.href = this.query.redirect || '/'
    },
    hidemodal() {
      location.href = this.redirect
    },
    back() {
      location.href = `/login`
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
