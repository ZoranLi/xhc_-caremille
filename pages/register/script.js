export default {
  
  async asyncData({$axios, query, store}) {
    return {}
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
      contactAddress: '',
      showChannel: false,
      optionValue:
        {
          text: '请选择分销渠道',
          value: ''
        },
      options: [
        {text: '淘宝', value: 'TB'},
        {text: '京东', value: 'JD'},
        {text: '拼多多', value: 'PDD'},
        {text: '其他', value: 'QT'}
      ],
    }
  },
  components: {},
  methods: {
    select(option) {
      this.optionValue = option;
      this.showChannel = false
    },
    async next() {
      if (!this.realName) {
        return __tostal('请填写真实姓名');
      }
      if (!/^[\u4e00-\u9fa5]+$/.test(this.realName)) {
        return __tostal('请填写正确的姓名');
      }
      if (!this.storeName) {
        return __tostal('请填写店铺名称');
      }
      if (this.storeName.length < 4) {
        return __tostal('店铺名称最小长度为4个字符');
      }
      if (!this.contactAddress) {
        return __tostal('请填写联系地址');
      }
      if (!this.optionValue.value) {
        return __tostal('请选择分销渠道');
      }
      let params = {
        real_name: this.realName,
        shop_name: this.storeName,
        contact_address: this.contactAddress,
        channel: this.optionValue.value
      }
      let resp = await this.$axios.$post(`/v1/agent/distribution`, params);
      if (resp && resp.data) { //申请成功
        location.href = '/register/success'
      } else if (resp.msg) {
        __tostal(resp.msg)
      }
    }
  },
  mounted() {
    let anchorContent = this.$refs['anchorContent'];
    let optionPannel = this.$refs['optionPannel'];
  }
};
