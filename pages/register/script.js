import Vue from 'vue';
import {DropdownMenu, DropdownItem} from 'vant';
import 'vant/lib/index.css';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
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
      optionValue: '',
      options: [
        {text: '请选择分销渠道', value: ''},
        {text: '淘宝', value: 'TB'},
        {text: '京东', value: 'JD'},
        {text: '拼多多', value: 'PDD'},
        {text: '其他', value: 'OTHER'}
      ],
    }
  },
  components: {},
  methods: {
    async submit() {
      if (!this.realName) {
        return __tostal('请填写真实姓名')
      }
      if (!this.storeName) {
        return __tostal('请填写店铺名称')
      }
      if (!this.contactAddress) {
        return __tostal('请填写联系地址')
      }
      
      if(!this.optionValue){
        return __tostal('请选择分销渠道')
      }
      let params  ={
        real_name: this.realName,
        shop_name: this.storeName,
        contact_address: this.contactAddress,
        channel: this.optionValue
      }
      let resp = await this.$axios.$post(`/v1/agent/distribution`,params);
      if(resp&&resp.data){ //申请成功
        location.href = '/register/success'
      }else if(resp.msg){
        __tostal(resp.msg)
      }
    }
  },
  mounted() {
  }
};
