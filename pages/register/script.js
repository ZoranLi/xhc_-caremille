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
        access_token: _query.access_token,
        source: _query.source,
        open_id: _query.open_id,
        union_id: _query.union_id,
        nick: _query.nick,
        icon: _query.icon,
        sex: _query.sex,
      }
      
      if(_query.project && _query.wechat_open_id){
        param.project = _query.project
        param.wechat_open_id = _query.wechat_open_id
      }
      
      
      
      let resp = await this.$axios.post('focus::/login_bind_mobile', param)
      resp = resp.data
      
      if(resp.code !== 0) return __tostal(resp.msg || '绑定手机号时出错了，请联系客服。')
      
      //TODO 处理接口返回信息，将用户信息存储在cookie上
      
      location.href = this.query.redirect || '/'
    },
    hidemodal(){
      location.href = this.redirect
    },
    download(){
      location.href = '//ul.xiaohongchun.com/params?goods=0'
    },
    back(){
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
